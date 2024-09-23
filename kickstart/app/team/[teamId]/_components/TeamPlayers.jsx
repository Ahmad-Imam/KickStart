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
import {
  MapPinIcon,
  TrophyIcon,
  AlertTriangleIcon,
  MapPin,
  Info,
  Users,
  Shield,
} from "lucide-react";
import { TeamsPlayersDrawer } from "./TeamPlayersDrawer";
import Link from "next/link";

export default function TeamPlayers({ playersInfo, team }) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Player List
          </h3>
          <TeamsPlayersDrawer playersInfo={playersInfo} team={team} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playersInfo.map((player) => (
            <Link key={player.id} href={`/player/${player.id}`}>
              <Card className="cardFull dark:bg-slate-800">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 text-secondary-foreground rounded-full flex items-center justify-center font-semibold bg-slate-200 dark:bg-slate-900">
                      {player.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold">{player.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {player.position}
                      </p>
                    </div>
                  </div>
                  <Badge>
                    <Shield className="w-3 h-3 mr-1" />
                    {player.position.slice(0, 3).toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* <Card className="dark:bg-slate-900 cardFull ">
        <CardContent className="py-2 px-2">
          <ul className="">
            {playersInfo?.length === 0 ? (
              <div>No players found</div>
            ) : (
              playersInfo
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((player) => (
                  <Link key={player.id} href={`/player/${player.id}`}>
                    <li className="flex flex-row gap-2 justify-between items-center dark:bg-slate-800 dark:hover:bg-slate-700 p-3 border-1 rounded-md my-4 mx-1 last:border-b-0 cursor-pointer hover:bg-gray-200 ">
                      <div>{`${capitalizeFirstLetter(player?.name)} #${
                        player?.jersey
                      }`}</div>
                      <div>{`(${capitalizeFirstLetter(
                        player?.nickName
                      )})`}</div>
                      <div className="flex justify-center items-center gap-2">
                        <MapPinIcon /> {capitalizeFirstLetter(player?.country)}
                      </div>
                      <Badge>{capitalizeFirstLetter(player?.position)}</Badge>


                    </li>
                  </Link>
                ))
            )}
          </ul>
        </CardContent>
      </Card> */}
    </>
  );
}
