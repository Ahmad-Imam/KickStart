import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertOctagonIcon,
  AlertTriangleIcon,
  BadgeDollarSign,
  EclipseIcon,
  Edit2,
  Edit2Icon,
  FlagIcon,
  PinIcon,
  ShirtIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { truncateLongString } from "@/utils/data-util";
import Link from "next/link";

export default function PlayerDetails({ playerDetails }) {
  function PlayerStat({ icon, label, value }) {
    return (
      <div className="flex items-start space-x-3">
        <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    );
  }

  function PerformanceStat({ label, value, icon }) {
    return (
      <Card className="dark:bg-slate-950 cardFull">
        <CardContent className="flex flex-col items-center justify-center p-4">
          <div className="text-3xl font-bold mb-1">{value}</div>
          <div className="text-sm text-muted-foreground flex items-center">
            {icon && <span className="mr-1">{icon}</span>}
            {label}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="dark:bg-slate-900 w-full max-w-4xl cardFull">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold flex items-center justify-center gap-2">
            {truncateLongString(playerDetails.name, 25)}
            <Link href={`/player/${playerDetails.id}/edit`}>
              <Edit2Icon className="w-6 h-6" />
            </Link>
          </CardTitle>
          <div className="text-lg mt-2 text-center">
            {playerDetails.nickName.toUpperCase()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <PlayerStat
                icon={<FlagIcon />}
                label="Country"
                value={playerDetails?.country.toUpperCase()}
              />
              <PlayerStat
                icon={<ShirtIcon />}
                label="Jersey"
                value={playerDetails?.jersey}
              />
              <PlayerStat
                icon={<UsersIcon />}
                label="Current Team"
                value={playerDetails?.team?.name || "N/A"}
              />
              <PlayerStat
                icon={<TrophyIcon />}
                label="Current Tournament"
                value={playerDetails?.tournament?.name || "N/A"}
              />
              <PlayerStat
                icon={<PinIcon />}
                label="Position"
                value={
                  playerDetails.position.charAt(0).toUpperCase() +
                  playerDetails.position.slice(1)
                }
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">
                {" "}
                Career Performance
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <PerformanceStat
                  label="Goals"
                  value={playerDetails?.goals || 0}
                  icon={<EclipseIcon className="text-green-500" />}
                />
                <PerformanceStat
                  label="Yellow Cards"
                  value={playerDetails?.yellow || 0}
                  icon={<AlertTriangleIcon className="text-yellow-500" />}
                />
                <PerformanceStat
                  label="Red Cards"
                  value={playerDetails.red || 0}
                  icon={<AlertOctagonIcon className="text-red-500" />}
                />
                <PerformanceStat
                  label="Man Of The Match"
                  value={playerDetails?.motm || 0}
                  icon={<TrophyIcon className="text-yellow-400" />}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
