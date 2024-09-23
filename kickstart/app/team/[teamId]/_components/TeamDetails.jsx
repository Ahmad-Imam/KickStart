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
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto cardFull dark:bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">{team.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {team.location}
              </CardDescription>
            </div>
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold bg-slate-200 dark:bg-slate-950">
              {team.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About the Team
              </h3>
              <p className="text-muted-foreground">{team.bio}</p>
            </div>
            <TeamPlayers playersInfo={playersInfo} team={team} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
