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
import {
  deleteFromPrevAddPlayersToCurrentTeamTeamsT,
  deletePlayersFromCurrentTeamTeamsT,
} from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter, truncateLongString } from "@/utils/data-util";

export default function TeamsTPlayersForm({
  playersInfo,
  setOpen,
  teamsTournament,
  wordDb,
}) {
  const [playerList, setPlayerList] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState(playersInfo ?? []);

  const [loading, setLoading] = useState(false);

  const [squadChangeLoading, setSquadChangeLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = playerList.filter((item) =>
        item?.name.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, playerList]);

  const handleResultClick = (item) => {
    if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
      setSavedItems((prevSavedItems) => [...prevSavedItems, item]);

      setResults((prevResults) =>
        prevResults.filter((result) => result.id !== item.id)
      );
    } else {
      toast.info("Player already in the squad");
    }
  };

  const removeSavedItem = (item) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));

    setResults((prevResults) => [...prevResults, item]);
  };

  const fetchPlayers = async () => {
    const res = await fetch("/api/players", { cache: "no-store" });
    const data = await res.json();

    setPlayerList(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    // setTeamsTournament(savedItems);
    fetchPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSquadChangeLoading(true);
    const newPlayers = savedItems.filter(
      (item) => !playersInfo.some((player) => player.id === item.id)
    );
    const removedPlayers = playersInfo.filter(
      (player) => !savedItems.some((item) => item.id === player.id)
    );

    if (newPlayers.length > 0) {
      const test = await deleteFromPrevAddPlayersToCurrentTeamTeamsT(
        newPlayers,
        teamsTournament
      );
    }
    if (removedPlayers.length > 0) {
      const test = await deletePlayersFromCurrentTeamTeamsT(
        removedPlayers,
        teamsTournament
      );
    }

    setSquadChangeLoading(false);

    toast.success("New Squad is saved successfully");

    setOpen(false);
  };

  return (
    <div className="mx-4 flex flex-col items-center ">
      {!loading ? (
        <div className="w-full max-w-lg mx-auto space-y-4 py-4">
          <div className="text-md font-semibold p-0 m-0">
            {wordDb.findPlayers}:
          </div>
          <Input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full dark:bg-slate-900"
            // disabled={savedItems.length === groupsNum * teamsPerGroup}
          />
          {query.trim() !== "" && (
            <ScrollArea className="h-[200px] w-full rounded-md border">
              {results?.length > 0 ? (
                <ul className="p-4">
                  {results?.map((player, index) => (
                    <li
                      key={index}
                      type="button"
                      className=" dark:bg-slate-800 dark:hover:bg-slate-600 p-2 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3"
                      onClick={() => handleResultClick(player)}
                    >
                      <div className="flex flex-row justify-between text-start items-center gap-2 text-sm">
                        <div>{`${truncateLongString(player?.name, 10)}
                             
                            #${player?.jersey}`}</div>
                        <div>{`(${player?.team?.name})`}</div>
                        <div className="flex flex-row items-center gap-1">
                          <MapPin className="ml-8" /> {player?.country}
                        </div>
                        <Badge>{capitalizeFirstLetter(player?.position)}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4 text-center text-muted-foreground">
                  {wordDb.noResults}
                </p>
              )}
            </ScrollArea>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-black dark:border-white"></div>
          <div>{wordDb.loadingTeams}</div>
        </div>
      )}

      <div className="mt-4 w-full  rounded-md border-2">
        <h3 className="font-semibold mb-2 p-2">{wordDb.currentSquad}:</h3>
        {playersInfo?.length > 0 ? (
          <ul className="flex flex-wrap gap-2 w-full p-2">
            {playersInfo?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center  dark:bg-slate-800 dark:hover:bg-slate-600 p-2 rounded text-[13px] md:text-sm hover:bg-slate-200 bg-slate-100 "
              >
                {`${item?.name} # ${item?.jersey}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-center text-muted-foreground">
            {wordDb.noPlayersSquad}
          </p>
        )}
      </div>

      {savedItems?.length > 0 && (
        <div className="mt-4 w-full  rounded-md border-2">
          <h3 className="font-semibold mb-2 p-2">{wordDb.newSquad}:</h3>
          <ul className="flex flex-wrap gap-2 w-full p-2">
            {savedItems?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center hover:bg-slate-200 bg-slate-100 p-2 dark:bg-slate-800 dark:hover:bg-slate-600 rounded text-[13px] md:text-sm"
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

      {squadChangeLoading ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          <div>{wordDb.saving}</div>
        </div>
      ) : (
        <button
          variant="outline"
          className="w-1/2 my-4 customButton"
          onClick={handleSubmit}
        >
          {wordDb.saveSquad}
        </button>
      )}
    </div>
  );
}
