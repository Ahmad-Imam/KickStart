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

export default async function TeamDetails({ teamsTournament }) {
  const team = sampleTeam; // In a real app, you'd fetch this based on params.id

  await dbConnect();
  const playersInfo = await getAllPlayersByIds(teamsTournament.players);
  // console.log("playersInfo query");
  // console.log(playersInfo);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/tournament/${teamsTournament?.tournamentId}`} passHref>
        <Button variant="outline" className="mb-4">
          Back to Tournament
        </Button>
      </Link>
      <h1 className="text-4xl font-bold mb-6">{teamsTournament?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{teamsTournament?.location}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tournament ID</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{teamsTournament.tournamentId}</Badge>
          </CardContent>
        </Card>
      </div>

      <TeamsTPlayers
        playersInfo={JSON.parse(JSON.stringify(playersInfo))}
        teamsTournament={teamsTournament}
      />

      <h2 className="text-2xl font-bold mt-8 mb-4">Top Scorers</h2>
      <Card>
        <CardContent>
          <ul className="space-y-2">
            {team.scorer.players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
              >
                <span>{player.name}</span>
                <Badge variant="secondary" className="flex items-center">
                  <TrophyIcon className="mr-1 h-4 w-4" />
                  {player.goals}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Yellow Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {team.yellow.players.map((player) => (
                <li
                  key={player.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                >
                  <span>{player.name}</span>
                  <Badge variant="warning" className="flex items-center">
                    <AlertTriangleIcon className="mr-1 h-4 w-4" />
                    {player.count}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Red Cards</CardTitle>
          </CardHeader>
          <CardContent>
            {team.red.players.length > 0 ? (
              <ul className="space-y-2">
                {team.red.players.map((player) => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                  >
                    <span>{player.name}</span>
                    <Badge variant="destructive" className="flex items-center">
                      <AlertTriangleIcon className="mr-1 h-4 w-4" />
                      {player.count}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No red cards</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
