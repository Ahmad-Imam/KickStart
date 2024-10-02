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
  addNewModeratorsToCurrentTournament,
  deleteFromPrevAddPlayersToCurrentTeamTeamsT,
  deletePlayersFromCurrentTeamTeamsT,
  deletePrevModeratorsFromCurrentTournament,
} from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter, truncateLongString } from "@/utils/data-util";
import Image from "next/image";

export default function TournamentModeratorsForm({
  moderatorsList,
  setOpen,
  allUsersList,
  tournamentDetails,
  wordDb,
}) {
  const [playerList, setPlayerList] = useState(allUsersList ?? []);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState(moderatorsList ?? []);

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
    }, 300); // Simulate a slight delay

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSquadChangeLoading(true);
    const newPlayers = savedItems.filter(
      (item) => !moderatorsList.some((player) => player.id === item.id)
    );
    const removedPlayers = moderatorsList.filter(
      (player) => !savedItems.some((item) => item.id === player.id)
    );

    if (newPlayers.length > 0) {
      await addNewModeratorsToCurrentTournament(newPlayers, tournamentDetails);
    }
    if (removedPlayers.length > 0) {
      await deletePrevModeratorsFromCurrentTournament(
        removedPlayers,
        tournamentDetails
      );
    }

    setSquadChangeLoading(false);

    toast.success("Moderators List is saved successfully");

    setOpen(false);
  };

  return (
    <div className="mx-4 flex flex-col items-center ">
      <div className="w-full max-w-lg mx-auto space-y-4 py-4">
        <div className="text-md font-semibold p-0 m-0">{wordDb.findUsers}:</div>
        <Input
          type="search"
          placeholder={wordDb.searchUsers}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full dark:bg-slate-900"
          // disabled={savedItems.length === groupsNum * teamsPerGroup}
        />
        {query.trim() !== "" && (
          <ScrollArea className="h-[200px] w-full rounded-md border">
            {results?.length > 0 ? (
              <ul className="p-4">
                {results?.map((user, index) => (
                  <li
                    key={index}
                    type="button"
                    className=" dark:bg-slate-800 dark:hover:bg-slate-600 p-2 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3"
                    onClick={() => handleResultClick(user)}
                  >
                    <div className="flex flex-row justify-between text-start items-center gap-2 text-sm">
                      <div>{`${truncateLongString(user?.name, 15)}`}</div>
                      <div>{`(${truncateLongString(user?.email, 15)})`}</div>

                      <Image
                        className="rounded-full "
                        src={user?.image}
                        width={35}
                        height={35}
                        alt="user"
                      />

                      {/* <Badge>{capitalizeFirstLetter(player?.position)}</Badge> */}
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

      <div className="mt-4 w-full  rounded-md border-2">
        <h3 className="font-semibold mb-2 p-2">{wordDb.currentModerators}:</h3>
        {moderatorsList?.length > 0 ? (
          <ul className="flex flex-wrap gap-2 w-full p-2">
            {moderatorsList?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center  dark:bg-slate-800 dark:hover:bg-slate-600 p-2 rounded text-[13px] md:text-sm hover:bg-slate-200 bg-slate-100 "
              >
                {`${item?.name}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-center text-muted-foreground">
            {wordDb.noModeratorsTournament}
          </p>
        )}
      </div>

      <div className="mt-4 w-full  rounded-md border-2">
        <h3 className="font-semibold mb-2 p-2">{wordDb.newModeratorsList}:</h3>
        {savedItems?.length > 0 ? (
          <ul className="flex flex-wrap gap-2 w-full p-2">
            {savedItems?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center hover:bg-slate-200 bg-slate-100 p-2 dark:bg-slate-800 dark:hover:bg-slate-600 rounded text-[13px] md:text-sm"
              >
                {`${item?.name}`}
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="ml-2"
                  onClick={() => removeSavedItem(item)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-center text-muted-foreground">
            {wordDb.noModeratorsTournament}
          </p>
        )}
      </div>

      {squadChangeLoading ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-700"></div>
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
