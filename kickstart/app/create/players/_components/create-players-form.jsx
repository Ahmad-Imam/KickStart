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
import { addPlayers, addTeams } from "@/app/actions";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MapPinIcon, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { set } from "mongoose";
import { capitalizeFirstLetter } from "@/utils/data-util";

export function PlayersForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const [teamsList, setTeamsList] = useState([]);
  console.log(teamsList);

  const [loadingTeam, setLoadingTeam] = useState(false);

  const positions = ["goalkeeper", "defender", "midfielder", "striker"];

  const [selectedPosition, setSelectedPosition] = useState(positions[2]);
  console.log(selectedPosition);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = teamsList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300); // Simulate a slight delay

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (item) => {
    if (!savedItems.includes(item) && savedItems.length < 1) {
      setSavedItems((prev) => [...prev, item]);
    }
  };

  const removeSavedItem = (item) => {
    setSavedItems((prev) => prev.filter((i) => i !== item));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const nickName = formData.get("nickName");
    const country = formData.get("country");
    const jersey = formData.get("jersey");
    const team = savedItems[0]?.id;
    const playerData = {
      name,
      nickName,
      country,
      jersey,
      team,
      position: selectedPosition,
    };

    console.log(playerData);
    const teams = await addPlayers(playerData);
    // Call the API to create the team
  }

  const fetchTeams = async () => {
    try {
      setLoadingTeam(true);

      const res = await fetch("/api/teams");
      const data = await res.json();
      setTeamsList(data);
      setLoadingTeam(false);
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Card className="dark:bg-slate-800 mx-auto max-w-xl w-full cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300 ">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your player</CardTitle>
        <CardDescription>Enter your player information</CardDescription>
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
                placeholder="Lionel Messi"
                required
                className="dark:bg-slate-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nickName">NickName</Label>
              <Input
                id="nickName"
                name="nickName"
                type="text"
                placeholder="Goat"
                required
                className="dark:bg-slate-900"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                placeholder="Argentina"
                required
                className="dark:bg-slate-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jersey">Jersey Number</Label>
              <Input
                id="jersey"
                name="jersey"
                type="text"
                placeholder="10"
                required
                className="dark:bg-slate-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <RadioGroup
                defaultValue={selectedPosition}
                onValueChange={(value) => {
                  setSelectedPosition(value);
                }}
              >
                {
                  // Loop through the positions array and render a radio group item for each position
                  positions.map((position) => (
                    <div className="flex items-center space-x-2" key={position}>
                      <RadioGroupItem value={position} id={position} />
                      <Label htmlFor={position}>
                        {capitalizeFirstLetter(position)}
                      </Label>
                    </div>
                  ))
                }
              </RadioGroup>
            </div>

            <Label htmlFor="players">Team</Label>

            {loadingTeam ? (
              <div className="flex flex-col justify-center items-center h-32 gap-2">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
                <div>Loading Teams</div>
              </div>
            ) : (
              <div className="w-full max-w-lg mx-auto space-y-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="dark:bg-slate-900"
                />
                {query.trim() !== "" && savedItems.length < 1 && (
                  <ScrollArea className="h-[200px] w-full rounded-md border">
                    {results?.length > 0 ? (
                      <ul className="p-4">
                        {results?.map((item, index) => (
                          <li
                            key={index}
                            className="mb-2 flex flex-row gap-2 justify-between items-center dark:bg-slate-900 dark:hover:bg-slate-600 p-3 border-1 rounded-md my-1 last:border-b-0 cursor-pointer hover:bg-gray-200 bg-gray-100"
                            onClick={() => handleResultClick(item)}
                          >
                            {item.name}
                            <div className="flex flex-row items-center">
                              <MapPinIcon />
                              {item.location}
                            </div>
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

                {savedItems?.length > 0 && (
                  <div className="mt-4 ">
                    {/* <h3 className="font-semibold mb-2">Saved Items:</h3> */}
                    <ul className="flex flex-wrap gap-2 w-full max-w-lg">
                      {savedItems?.map((team, index) => (
                        <li
                          key={index}
                          className="dark:bg-slate-900 flex justify-between items-center bg-gray-100 p-2 rounded"
                        >
                          {`${capitalizeFirstLetter(team?.name).slice(0, 10)}
                             ${team?.name.length > 10 ? "..." : ""}`}{" "}
                          <button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSavedItem(team)}
                            className="p-3  hover:bg-gray-200 dark:hover:bg-slate-800 rounded-md"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white p-2 rounded-md text-sm text-center bg-slate-900 hover:bg-black dark:hover:bg-slate-950"
            >
              Submit
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
