import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPinIcon, TrophyIcon, AlertTriangleIcon } from "lucide-react";

import { dbConnect } from "@/service/mongo";
import { Separator } from "@/components/ui/separator";

import { TabsContent } from "@/components/ui/tabs";

import TeamPlayers from "./TeamPlayers";
import { replaceMongoIdInArray } from "@/utils/data-util";

export default async function TeamDetails({ team }) {
  // In a real app, you'd fetch this based on params.i
  await dbConnect();
  const playersInfoPlayer = team.players;

  const playersInfo = replaceMongoIdInArray(team.players);

  console.log("playersInfo query");
  console.log(playersInfo);
  console.log("yeloooooooooooooooooooooooo");

  // console.log(team?.id);
  // console.log(team?.yellow);
  // console.log(team?.red);

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold mb-6">{team?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="dark:bg-slate-900 cardFull ">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{team?.location}</span>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 cardFull ">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{team?.bio}</span>
          </CardContent>
        </Card>
      </div>
      <TeamPlayers
        playersInfo={JSON.parse(JSON.stringify(playersInfo))}
        team={team}
      />
    </div>
  );
}
