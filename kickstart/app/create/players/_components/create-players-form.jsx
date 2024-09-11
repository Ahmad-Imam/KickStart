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

import { X } from "lucide-react";

export function PlayersForm() {
  const teams = [
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

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const [teamsList, setTeamsList] = useState([]);
  console.log(teamsList);

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
    };

    console.log(playerData);
    const teams = await addPlayers(playerData);
    // Call the API to create the team
  }

  const fetchTeams = async () => {
    const res = await fetch("/api/teams");
    const data = await res.json();
    setTeamsList(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Card className="mx-auto max-w-lg w-full ">
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
              />
            </div>

            <Label htmlFor="players">Team</Label>

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
                          className="py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleResultClick(item)}
                        >
                          {item.name} - {item.location}
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
                    {savedItems?.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded"
                      >
                        {item.name} - {item.location}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSavedItem(item)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
