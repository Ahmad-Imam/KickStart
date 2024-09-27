import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { capitalizeFirstLetter } from "@/utils/data-util";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";
import { TournamentModeratorsDrawer } from "./TournamentModeratorsDrawer";

export default function TournamentModerators({ isAdmin, moderatorsList }) {
  return (
    <div className="my-6">
      <div
        className="items-center justify-between"
        style={{
          display: isAdmin ? "flex" : "none",
        }}
      >
        <h2 className="text-2xl font-bold mt-4 mb-4">Moderators</h2>
        <TournamentModeratorsDrawer moderatorsList={moderatorsList} />
      </div>
      <Card className="dark:bg-slate-900 cardFull ">
        <CardContent className="py-2 px-2">
          <ul className="">
            {moderatorsList?.length === 0 ? (
              <div className="p-2">No moderators</div>
            ) : (
              moderatorsList
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((player) => (
                  <Link key={player.id} href={`/player/${player.id}`}>
                    <li className="flex flex-row gap-2 justify-between items-center dark:bg-slate-800 dark:hover:bg-slate-700 p-3 border-1 rounded-md my-4 mx-1 last:border-b-0 cursor-pointer hover:bg-gray-200 ">
                      <div>{`${capitalizeFirstLetter(player?.name)} #${
                        player?.jersey
                      }`}</div>

                      <div className="flex justify-center items-center gap-2">
                        <MapPinIcon /> {capitalizeFirstLetter(player?.country)}
                      </div>
                      <Badge>{capitalizeFirstLetter(player?.position)}</Badge>

                      {/* <Badge>{player.position}</Badge> */}
                    </li>
                  </Link>
                ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
