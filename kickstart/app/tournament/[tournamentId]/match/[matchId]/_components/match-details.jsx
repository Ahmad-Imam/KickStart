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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  TrophyIcon,
  GoalIcon,
  Goal,
  PartyPopper,
  PartyPopperIcon,
  TriangleAlertIcon,
  PlayIcon,
  BadgeCheckIcon,
  BadgeXIcon,
} from "lucide-react";

import MatchSheet from "@/app/tournament/[tournamentId]/match/[matchId]/_components/MatchSheet";
import { getTeamsTByTeamId } from "@/queries/teams";
import MatchSettings from "@/app/tournament/[tournamentId]/match/[matchId]/_components/MatchSettings";
import { replaceMongoIdInObject } from "@/utils/data-util";

const sampleMatch = {
  _id: { $oid: "66e03cfd8a3204743253932e" },
  type: "group",
  team1: {
    id: "66da0d88c3ad3ec6dafeacba",
    name: "Arsenal",
    bio: "London is red",
    location: "London",
    players: [],
    __v: 0,
  },
  team2: {
    id: "66da0d9ac3ad3ec6dafeacbc",
    name: "Manchester United",
    bio: "Man is red",
    location: "Manchester",
    players: [],
    __v: 0,
  },
  tournamentId: "66e03cfc8a3204743253931c",
  matchDate: "Tue Sep 10 2024 00:00:00 GMT+0300 (Eastern European Summer Time)",
  status: "pending",
  __v: 0,
  score: { team1: 0, team2: 0 },
  events: [
    { type: "kickoff", time: "00:00", description: "Match started" },
    {
      type: "yellowCard",
      time: "23:15",
      team: "Arsenal",
      player: "Bukayo Saka",
    },
    {
      type: "goal",
      time: "45:00",
      team: "Manchester United",
      player: "Marcus Rashford",
    },
    { type: "redCard", time: "78:30", team: "Arsenal", player: "Granit Xhaka" },
  ],
};

export default async function MatchDetails({
  matchDetails,
  sortedEvents,
  isMatchConfig,
  isAdmin,
}) {
  const match = sampleMatch; // In a real app, you'd fetch this based on params.id

  let team1;
  let team2;
  //todo check for all match types

  console.log("in teamid");
  team1 = await getTeamsTByTeamId(
    matchDetails?.team1?.teamId,
    matchDetails?.tournamentId
  );
  team2 = await getTeamsTByTeamId(
    matchDetails?.team2?.teamId,
    matchDetails?.tournamentId
  );

  console.log("team2");

  console.log(matchDetails?.tournamentId);
  // console.log(matchDetails?.team1);
  // console.log(matchDetails?.team2);
  // console.log(matchDetails?.team1);
  // console.log(team1);
  // console.log(match?.status);

  return (
    <div className="container mx-auto px-4 py-8  h-full">
      <div className="flex flex-row justify-between">
        <div className="w-min">
          <Link
            href={`/tournament/${matchDetails?.tournamentId}`}
            className=""
            passHref
          >
            <div className="customButton my-4 ">Back to Tournament</div>
          </Link>
        </div>
        {isAdmin && (
          <div>
            <Link
              href={`/tournament/${matchDetails?.tournamentId}/match/${matchDetails?.id}/edit`}
              className=""
              passHref
            >
              <div className="customButton my-4 ">Edit Match</div>
            </Link>
          </div>
        )}
      </div>
      <h1 className="text-2xl lg:text-4xl font-bold my-6">
        {matchDetails?.team1?.name || matchDetails?.qName?.team1} vs{" "}
        {matchDetails?.team2?.name || matchDetails?.qName?.team2}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 nlg:grid-cols-4 gap-6 mb-8 items-start ">
        <Card className="dark:bg-slate-900 cardFull ">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl">Match Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className={
                match?.type === "quarter"
                  ? "bg-cyan-900 dark:bg-cyan-400 dark:text-gray-50"
                  : match?.type === "semi"
                  ? "bg-amber-500 dark:bg-amber-400 dark:text-gray-50"
                  : "bg-indigo-700 dark:bg-indigo-400 dark:text-gray-50"
              }
            >
              {matchDetails?.type}
            </Badge>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 cardFull ">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl flex flex-row justify-between items-center">
              <div>Date</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="w-max">
            <div className="flex items-center">
              <CalendarIcon className="mr-2" />
              <span>{new Date(matchDetails?.matchDate).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        <Card className=" dark:bg-slate-900 cardFull ">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
            // variant={
            //   tournament.status === "upcoming" ? "secondary" : "default"
            // }
            >
              {matchDetails?.location?.toUpperCase()}
            </Badge>
          </CardContent>
        </Card>

        <Card className=" dark:bg-slate-900 cardFull ">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              // variant={
              //   tournament.status === "upcoming" ? "secondary" : "default"
              // }

              className={
                matchDetails?.status === "live"
                  ? "bg-red-800 dark:bg-red-600 hover:bg-black hover:text-white dark:text-gray-50"
                  : "bg-slate-800 dark:bg-blue-400 text-white hover:bg-black hover:text-white dark:text-gray-50"
              }
            >
              {matchDetails?.status.toUpperCase()}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {matchDetails?.team1?.name && matchDetails?.team2?.name && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href={`/tournament/${matchDetails?.tournamentId}/team/${matchDetails?.team1?.teamId}`}
            >
              <Card className="dark:bg-slate-900 cardFull ">
                <CardHeader>
                  <CardTitle className="text-xl lg:text-2xl">
                    {matchDetails?.team1.name}
                  </CardTitle>
                  <CardDescription>
                    {matchDetails?.team1.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{matchDetails?.team1.bio}</p>
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2" />
                    <span>{matchDetails?.team1.location}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link
              href={`/tournament/${matchDetails?.tournamentId}/team/${matchDetails?.team2?.teamId}`}
            >
              <Card className="dark:bg-slate-900 cardFull ">
                <CardHeader>
                  <CardTitle className="text-xl lg:text-2xl">
                    {matchDetails?.team2.name}
                  </CardTitle>
                  <CardDescription>
                    {matchDetails?.team2.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{matchDetails?.team2.bio}</p>
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2" />
                    <span>{matchDetails?.team2.location}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Score</h2>
          <Card className="dark:bg-slate-900 cardFull my-4 ">
            <CardContent className="text-center py-6">
              <p className="text-xl lg:text-2xl font-bold">
                {matchDetails?.team1?.name} {matchDetails?.result?.team1} -{" "}
                {matchDetails?.result?.team2} {matchDetails?.team2?.name}
              </p>
            </CardContent>
          </Card>

          <MatchSettings
            team1={JSON.parse(JSON.stringify(team1))}
            team2={JSON.parse(JSON.stringify(team2))}
            matchDetails={matchDetails}
            isMatchConfig={isMatchConfig}
          />

          {/* <h2 className="text-2xl font-bold mt-8 mb-4">Match Events</h2> */}

          <div className="pb-6">
            <Card className="dark:bg-slate-900 cardFull ">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">
                  Match Events
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 m-0">
                {sortedEvents?.length > 0 ? (
                  <ul className="p-0 m-0">
                    {sortedEvents?.map((event, index) => (
                      <div
                        key={index}
                        className="py-2 px-1 m-2  rounded-md border-1 hover:bg-slate-800 hover:text-white group"
                      >
                        <li className="flex items-center">
                          <Badge
                            variant="outline"
                            className="mr-2 group-hover:bg-slate-800 group-hover:text-white text-nowrap"
                          >
                            {event.time}
                          </Badge>

                          {event.type === "kickoff" ? (
                            <BadgeCheckIcon
                              size={20}
                              className="mr-2 dark:text-blue-400 text-blue-600 group-hover:text-blue-400"
                            />
                          ) : event.type === "goal" ? (
                            <PartyPopperIcon
                              size={20}
                              className="mr-2 dark:text-green-400 text-green-600 group-hover:text-green-400"
                            />
                          ) : event.type === "yellow" ? (
                            <TriangleAlertIcon
                              size={20}
                              className="mr-2 dark:text-yellow-400 text-yellow-600 group-hover:text-yellow-400"
                            />
                          ) : event.type === "red" ? (
                            <TriangleAlertIcon
                              size={20}
                              className="mr-2 dark:text-red-400 text-red-600 group-hover:text-red-400"
                            />
                          ) : event.type === "fulltime" ? (
                            <BadgeXIcon
                              size={20}
                              className="mr-2 text-red-600 group-hover:text-red-400"
                            />
                          ) : event.type === "motm" ? (
                            <PartyPopperIcon
                              size={20}
                              className="mr-2 dark:text-green-400 text-green-600 group-hover:text-green-400"
                            />
                          ) : (
                            <div></div>
                          )}
                          <span className="font-semibold mr-2">
                            {event.type.toUpperCase()}:
                          </span>
                          <span className="mx-2 ">
                            {/* {event.description || `${event.player} (${event.team})`} */}
                            {event.description}
                          </span>
                        </li>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center p-4">
                    <p className="">No events recorded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
