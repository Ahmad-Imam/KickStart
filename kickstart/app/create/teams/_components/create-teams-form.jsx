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
import { X } from "lucide-react";
import { set } from "mongoose";
import { toast } from "sonner";

export function TeamsForm() {
  const fruits = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
  ];

  const [playersList, setPlayersList] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
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
    const res = await fetch("/api/players");
    const data = await res.json();
    setPlayersList(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <Card className="mx-auto max-w-lg w-full ">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your teams</CardTitle>
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
              />
            </div>

            <Label htmlFor="players">Players</Label>

            <div className="w-full max-w-lg mx-auto space-y-4">
              <Input
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
              />
              {query.trim() !== "" && (
                <ScrollArea className="h-[200px] w-full rounded-md border">
                  {results?.length > 0 ? (
                    <ul className="p-4">
                      {results?.map((item, index) => (
                        <li
                          key={index}
                          type="button"
                          className="py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleResultClick(item)}
                        >
                          {item?.name} #{item?.jersey} {`(${item?.nickName})`}
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

            {savedItems?.length > 0 && (
              <div className="mt-4 ">
                <h3 className="font-semibold mb-2">Squad:</h3>
                <ul className="flex flex-wrap gap-2 w-full max-w-lg">
                  {savedItems?.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded"
                    >
                      {item?.name}
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removeSavedItem(item)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
