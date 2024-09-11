"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamsTPlayersDrawer } from "./teamT-players-drawer";

export default function TeamsTPlayers({ playersInfo, teamsTournament }) {
  //   const [playersInfo, setPlayersInfo] = useState([]);

  //   useEffect(() => {
  //     console.log("fetching player info");
  //     const fetchPlayerInfo = async () => {
  //       if (team?.players) {
  //         const playerPromises = team.players.map(async (playerId) => {
  //           const response = await fetch(`/api/players/${playerId.toString()}`); // Adjust the API endpoint based on your project
  //           const playerData = await response.json();
  //           return playerData;
  //         });

  //         const playersData = await Promise.all(playerPromises);
  //         setPlayersInfo(playersData);
  //       }
  //     };

  //     fetchPlayerInfo();
  //   }, [team]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mt-4 mb-4">Players</h2>
        <TeamsTPlayersDrawer
          playersInfo={playersInfo}
          teamsTournament={teamsTournament}
        />
      </div>
      <Card>
        <CardContent className="py-2 px-2">
          <ul className="">
            {playersInfo?.length === 0 ? (
              <div>No players found</div>
            ) : (
              playersInfo?.map((player) => (
                <li
                  key={player.id}
                  className="p-2 hover:bg-slate-800 hover:text-white rounded"
                >
                  <div>{player?.name}</div>
                  {/* <Badge>{player.position}</Badge> */}
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
