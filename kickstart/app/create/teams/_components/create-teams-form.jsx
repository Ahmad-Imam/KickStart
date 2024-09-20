"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTeams, editPlayerTeam } from "@/app/actions";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPinIcon, X } from "lucide-react";
import { set } from "mongoose";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/utils/data-util";
import { Badge } from "@/components/ui/badge";
import { ca } from "date-fns/locale";

export function TeamsForm() {
  const [playersList, setPlayersList] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const [loadingPlayer, setLoadingPlayer] = useState(false);

  console.log("saved");
  console.log(Array.isArray(savedItems));
  console.log(savedItems);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = playersList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300); // Simulate a slight delay

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (item) => {
    console.log(item);
    console.log(savedItems.some((savedItem) => savedItem.id === item.id));
    if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
      console.log("added");
      setSavedItems((prevSavedItems) => [...prevSavedItems, item]);
    }
  };

  const removeSavedItem = (item) => {
    setSavedItems((prev) => prev.filter((i) => i !== item));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const bio = formData.get("bio");
    const location = formData.get("location");
    const playersInTeam = savedItems.map((item) => item.id);

    const teamData = {
      name,
      bio,
      location,
      players: savedItems.map((item) => item.id),
    };

    // console.log(teamData);
    const teams = await addTeams(teamData);
    console.log("teamData");
    console.log(teams);

    if (playersInTeam.length > 0) {
      console.log("players");
      const playersUpdated = await editPlayerTeam(playersInTeam, teams.id);
      console.log("playersUpdated");
      console.log(playersUpdated);
    }
    // Call the API to create the team
  }

  const fetchPlayers = async () => {
    try {
      setLoadingPlayer(true);
      const res = await fetch("/api/players");
      const data = await res.json();
      setPlayersList(data);
      setLoadingPlayer(false);
    } catch (error) {
      console.log(error);
    }

    // console.log(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <Card className="dark:bg-slate-800 mx-auto max-w-xl w-full cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300 ">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your team</CardTitle>
        <CardDescription>Enter your team information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Chelsea FC"
                required
                className="dark:bg-slate-900 border-slate-400"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                type="text"
                placeholder="London is Blue"
                required
                className="dark:bg-slate-900  border-slate-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="London"
                required
                className="dark:bg-slate-900  border-slate-400"
              />
            </div>

            <Label htmlFor="players">Players</Label>

            {loadingPlayer ? (
              <div className="flex flex-col justify-center items-center h-32 gap-2">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
                <div>Loading Players</div>
              </div>
            ) : (
              <div className="w-full mx-auto space-y-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className=" dark:bg-slate-900  border-slate-400"
                />
                {query.trim() !== "" && (
                  <ScrollArea className="h-[200px] w-full rounded-md border ">
                    {results?.length > 0 ? (
                      <ul className="p-4">
                        {results?.map((player, index) => (
                          <li
                            key={index}
                            type="button"
                            className="flex flex-row gap-2 justify-between items-center dark:bg-slate-900 dark:hover:bg-slate-600 px-2 py-2 border-1 rounded-md my-1 last:border-b-0 cursor-pointer hover:bg-gray-200 bg-gray-100 mb-2"
                            onClick={() => handleResultClick(player)}
                          >
                            <div className="">{`${capitalizeFirstLetter(
                              player?.name
                            ).slice(0, 10)}
                             ${player?.name.length > 10 ? "..." : ""}
                            #${player?.jersey}`}</div>
                            <div>{`(${capitalizeFirstLetter(
                              player?.team?.name
                            )})`}</div>
                            <div className="flex justify-center items-center gap-2">
                              <MapPinIcon />{" "}
                              {capitalizeFirstLetter(player?.country)}
                            </div>
                            <Badge>
                              {capitalizeFirstLetter(player?.position)}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="p-4 text-center text-muted-foreground">
                        No results found
                      </p>
                    )}
                  </ScrollArea>
                )}
              </div>
            )}

            {savedItems?.length > 0 && (
              <div className="mt-4 ">
                <h3 className="font-semibold mb-2">Squad:</h3>
                <ul className="flex flex-wrap gap-3 w-full max-w-lg">
                  {savedItems?.map((player, index) => (
                    <li
                      key={index}
                      className="dark:bg-slate-900 flex justify-between items-center gap-2 bg-gray-100 p-2 px-2 rounded"
                    >
                      {`${capitalizeFirstLetter(player?.name).slice(0, 10)}
                             ${player?.name.length > 10 ? "..." : ""}`}
                      <button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removeSavedItem(player)}
                        className="p-3  hover:bg-gray-200 dark:hover:bg-slate-800 rounded-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="w-full customButton bg-slate-900 hover:bg-black dark:hover:bg-slate-950"
            >
              Submit
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
