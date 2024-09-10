"use client";

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
import { CalendarIcon, MapPinIcon } from "lucide-react";

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

export default function MatchDetails({ params }) {
  const match = sampleMatch; // In a real app, you'd fetch this based on params.id

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/tournament/${match.tournamentId}`} passHref>
        <Button variant="outline" className="mb-4">
          Back to Tournament
        </Button>
      </Link>
      <h1 className="text-4xl font-bold mb-6">
        {match.team1.name} vs {match.team2.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Match Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{match.type}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Date</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <CalendarIcon className="mr-2" />
            <span>{new Date(match.matchDate).toLocaleString()}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={match.status === "pending" ? "secondary" : "default"}
            >
              {match.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{match.team1.name}</CardTitle>
            <CardDescription>{match.team1.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{match.team1.bio}</p>
            <div className="flex items-center">
              <MapPinIcon className="mr-2" />
              <span>{match.team1.location}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{match.team2.name}</CardTitle>
            <CardDescription>{match.team2.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{match.team2.bio}</p>
            <div className="flex items-center">
              <MapPinIcon className="mr-2" />
              <span>{match.team2.location}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Score</h2>
      <Card>
        <CardContent className="text-center py-6">
          <p className="text-3xl font-bold">
            {match.team1.name} {match.score.team1} - {match.score.team2}{" "}
            {match.team2.name}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Match Events</h2>
      <Card>
        <CardContent>
          <ul className="divide-y">
            {match.events.map((event, index) => (
              <li key={index} className="py-2 flex items-center">
                <Badge variant="outline" className="mr-2">
                  {event.time}
                </Badge>
                <span className="font-semibold mr-2">{event.type}:</span>
                <span>
                  {event.description || `${event.player} (${event.team})`}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
