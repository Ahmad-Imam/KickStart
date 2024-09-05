"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toast } from "@radix-ui/react-toast";
import { MapIcon, MapPin, X } from "lucide-react";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateTeamsTournament({
  groupsNum,
  teamsPerGroup,
  setTeamsTournament,
}) {
  const [teamsTList, setTeamsTList] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = teamsTList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300); // Simulate a slight delay

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (item) => {
    console.log(item);
    console.log(savedItems.some((savedItem) => savedItem.id === item.id));
    if (savedItems.length === groupsNum * teamsPerGroup) {
      toast.error(
        "You have reached the maximum number of teams for the tournament"
      );
      return;
    }
    if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
      console.log("added");
      setSavedItems((prevSavedItems) => [...prevSavedItems, item]);
      setTeamsTournament((prevSavedItems) => [...prevSavedItems, item]);
      setResults((prevResults) =>
        prevResults.filter((result) => result.id !== item.id)
      );
    } else {
      toast.info("Team already added");
    }
  };

  const removeSavedItem = (item) => {
    setSavedItems((prev) => prev.filter((i) => i !== item));
    setTeamsTournament((prev) => prev.filter((i) => i !== item));
    setResults((prevResults) => [...prevResults, item]);
  };

  const fetchPlayers = async () => {
    const res = await fetch("/api/teams");
    const data = await res.json();
    setTeamsTList(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <>
      <div>{`Groups: ${groupsNum}`}</div>
      <div>{`Teams in a group: ${teamsPerGroup}`}</div>

      <div className="w-full max-w-lg mx-auto space-y-4 py-4">
        <div className="text-md font-semibold p-0 m-0">Find Teams:</div>
        <Input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
          disabled={savedItems.length === groupsNum * teamsPerGroup}
        />
        {query.trim() !== "" && (
          <ScrollArea className="h-[200px] w-full rounded-md border">
            {results?.length > 0 ? (
              <ul className="p-4">
                {results?.map((item, index) => (
                  <li
                    key={index}
                    type="button"
                    className="py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 rounded-sm p-2"
                    onClick={() => handleResultClick(item)}
                  >
                    <div className="flex flex-row justify-start items-center gap-2">
                      {item?.name}
                      <MapPin className="ml-8" /> {item?.location}
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
      </div>
      {savedItems?.length > 0 && (
        <div className="mt-4 w-full  rounded-md border-2">
          <h3 className="font-semibold mb-2 p-2">In the tournament:</h3>
          <ul className="flex flex-wrap gap-2 w-full p-2">
            {savedItems?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded text-[13px] md:text-sm"
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
    </>
  );
}
