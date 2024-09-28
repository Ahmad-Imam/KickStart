import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamsTPlayersDrawer } from "./TeamsTPlayersDrawer";
import { capitalizeFirstLetter } from "@/utils/data-util";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";

export default function TeamsTPlayers({
  playersInfo,
  teamsTournament,
  isAdmin,
  tournamentDetails,
  wordDb,
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mt-4 mb-4">{wordDb.players}</h2>
        {isAdmin && tournamentDetails?.status === "upcoming" && (
          <div>
            <TeamsTPlayersDrawer
              playersInfo={playersInfo}
              teamsTournament={teamsTournament}
              wordDb={wordDb}
            />
          </div>
        )}
      </div>
      <Card className="dark:bg-slate-900 cardFull ">
        <CardContent className="py-2 px-2">
          <ul className="">
            {playersInfo?.length === 0 ? (
              <div>{wordDb.noPlayers}</div>
            ) : (
              playersInfo
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
    </>
  );
}
