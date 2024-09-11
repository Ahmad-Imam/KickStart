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
import { cn } from "@/lib/utils";
import { deleteAddPlayersFromPrevCurrentTeam } from "@/app/actions";

export default function TeamsTPlayersForm({
  playersInfo,
  setOpen,
  teamsTournament,
}) {
  const [playerList, setPlayerList] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState(playersInfo ?? []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = playerList.filter((item) =>
        item?.name.toLowerCase().includes(query.toLowerCase())
      );
      // console.log("filtered");
      // console.log(filtered);
      // console.log(playerList);
      setResults(filtered);
    }, 300); // Simulate a slight delay

    return () => clearTimeout(timeoutId);
  }, [query, playerList]);

  const handleResultClick = (item) => {
    // console.log(item);
    // console.log(savedItems.some((savedItem) => savedItem.id === item.id));

    if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
      console.log("added");
      setSavedItems((prevSavedItems) => [...prevSavedItems, item]);

      setResults((prevResults) =>
        prevResults.filter((result) => result.id !== item.id)
      );
    } else {
      toast.info("Team already added");
    }
  };

  console.log("saved");
  console.log(savedItems);
  const removeSavedItem = (item) => {
    console.log(item);

    //filter saved items by the item object to remove
    // setSavedItems((prev) =>
    //   prev.filter((item) =>
    //     item?.name.toLowerCase().includes(query.toLowerCase())
    //   )
    // );

    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));

    // setSavedItems([]);

    // setSavedItems((prev) => prev.filter((i) => i !== item));

    setResults((prevResults) => [...prevResults, item]);
  };

  const fetchPlayers = async () => {
    const res = await fetch("/api/players");
    const data = await res.json();
    setPlayerList(data);
    setLoading(false);
    // console.log(data);
  };

  useEffect(() => {
    setLoading(true);
    // setTeamsTournament(savedItems);
    fetchPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");

    const newPlayers = savedItems.filter(
      (item) => !playersInfo.some((player) => player.id === item.id)
    );
    const removedPlayers = playersInfo.filter(
      (player) => !savedItems.some((item) => item.id === player.id)
    );

    console.log(newPlayers);
    console.log(removedPlayers);

    const test = await deleteAddPlayersFromPrevCurrentTeam(
      newPlayers,
      teamsTournament
    );

    console.log("test");
    console.log(test);

    setOpen(false);
  };

  return (
    <div className="mx-4 flex flex-col items-center ">
      {!loading ? (
        <div className="w-full max-w-lg mx-auto space-y-4 py-4">
          <div className="text-md font-semibold p-0 m-0">Find Players:</div>
          <Input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            // disabled={savedItems.length === groupsNum * teamsPerGroup}
          />
          {query.trim() !== "" && savedItems.length !== 0 && (
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
                      <div className="flex flex-row justify-between items-center gap-2 text-sm">
                        <div>{`${item?.name} # ${item?.jersey}`}</div>
                        <div>Team: {item?.team?.name}</div>
                        <div className="flex flex-row items-center gap-1">
                          <MapPin className="ml-8" /> {item?.country}
                        </div>
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
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          <div>Loading Teams</div>
        </div>
      )}
      {playersInfo?.length > 0 && (
        <div className="mt-4 w-full  rounded-md border-2">
          <h3 className="font-semibold mb-2 p-2">Current Squad:</h3>
          <ul className="flex flex-wrap gap-2 w-full p-2">
            {playersInfo?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded text-[13px] md:text-sm"
              >
                {`${item?.name} # ${item?.jersey}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {savedItems?.length > 0 && (
        <div className="mt-4 w-full  rounded-md border-2">
          <h3 className="font-semibold mb-2 p-2">New Squad:</h3>
          <ul className="flex flex-wrap gap-2 w-full p-2">
            {savedItems?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded text-[13px] md:text-sm"
              >
                {`${item?.name} # ${item?.jersey}`}
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
      <Button
        variant="outline"
        className="w-1/2 my-4 bg-slate-800 text-white"
        onClick={handleSubmit}
      >
        Save Squad
      </Button>
    </div>
  );
}
