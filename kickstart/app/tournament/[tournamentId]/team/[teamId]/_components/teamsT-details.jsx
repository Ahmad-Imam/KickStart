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

import TeamsTPlayers from "./teamsT-players";
import { getAllPlayersByIds } from "@/queries/players";
import { dbConnect } from "@/service/mongo";
import { Separator } from "@/components/ui/separator";

const sampleTeam = {
  _id: { $oid: "66df7347926d7338e1d73065" },
  name: "FC Bayern",
  location: "Berlin",
  tournamentId: { $oid: "66df7346926d7338e1d7305b" },
  players: [
    { id: "p1", name: "Manuel Neuer", position: "Goalkeeper" },
    { id: "p2", name: "Joshua Kimmich", position: "Midfielder" },
    { id: "p3", name: "Thomas Müller", position: "Forward" },
  ],
  scorer: {
    players: [
      { id: "p3", name: "Thomas Müller", goals: 3 },
      { id: "p2", name: "Joshua Kimmich", goals: 1 },
    ],
  },
  yellow: {
    players: [{ id: "p2", name: "Joshua Kimmich", count: 2 }],
  },
  red: {
    players: [],
  },
  __v: 0,
};

export default async function TeamDetails({
  teamsTournament,
  topScorers,
  yellowCards,
  redCards,
}) {
  // In a real app, you'd fetch this based on params.i
  await dbConnect();
  const playersInfo = await getAllPlayersByIds(teamsTournament.players);
  // console.log("playersInfo query");
  // console.log(playersInfo);
  console.log("yeloooooooooooooooooooooooo");
  console.log(teamsTournament?.id);
  console.log(teamsTournament?.yellow);
  console.log(teamsTournament?.red);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-min">
        <Link
          href={`/tournament/${teamsTournament?.tournamentId}`}
          passHref
          className=""
        >
          <button variant="outline" className="mb-4 customButton ">
            Back to Tournament
          </button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-6">{teamsTournament?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="dark:bg-slate-900 cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{teamsTournament?.location}</span>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 flex flex-row justify-between items-center p-4 shadow-sm  cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300 ">
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">Played</div>
            <div className="font-semibold">{teamsTournament?.matchPlayed}</div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">Won</div>
            <div className="font-semibold">{teamsTournament?.matchWon}</div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">Draw</div>
            <div className="font-semibold">{teamsTournament?.matchDraw}</div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">Lost</div>
            <div className="font-semibold">{teamsTournament?.matchLost}</div>
          </div>
        </Card>
      </div>
      <TeamsTPlayers
        playersInfo={JSON.parse(JSON.stringify(playersInfo))}
        teamsTournament={teamsTournament}
      />

      <Card className="dark:bg-slate-900 my-8 cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Team Top Scorers: </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {topScorers?.length === 0 ? (
              <li className="flex items-center justify-between p-2 hover:bg-slate-800 hover:text-white rounded">
                No scorers yet
              </li>
            ) : (
              topScorers.slice(0, 5)?.map((scorer, index) => (
                <div key={index}>
                  <li className="flex items-center justify-between p-2 px-4 dark:bg-slate-800 dark:hover:bg-slate-700 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3">
                    <span>{scorer?.name}</span>
                    <Badge variant="secondary" className="flex items-center">
                      <TrophyIcon size={22} className="mr-1 h-4 w-4" />
                      <div className="md:text-lg">{scorer?.score}</div>
                    </Badge>
                  </li>
                  {/* <Separator className="" /> */}
                </div>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dark:bg-slate-900 my-8 cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Yellow Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {yellowCards.length > 0 ? (
                yellowCards.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between p-2 px-4 dark:bg-slate-800 dark:hover:bg-slate-700 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3"
                  >
                    <span>{player.name}</span>
                    <Badge variant="secondary" className="flex items-center">
                      <AlertTriangleIcon size={22} className="mr-1 h-4 w-4" />
                      <div className="md:text-lg">{player.yellow}</div>
                    </Badge>
                  </li>
                ))
              ) : (
                <p>No yellow cards</p>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-900 my-8 cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Red Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {redCards.length > 0 ? (
                redCards.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between p-2 px-4 dark:bg-slate-800 dark:hover:bg-slate-700 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3"
                  >
                    <span>{player.name}</span>
                    <Badge variant="secondary" className="flex items-center">
                      <AlertTriangleIcon size={22} className="mr-1 h-4 w-4" />

                      <div className="md:text-lg">{player.red}</div>
                    </Badge>
                  </li>
                ))
              ) : (
                <p>No red cards</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
