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
import { CalendarIcon, MapPinIcon } from "lucide-react";

import MatchSheet from "@/app/tournament/[tournamentId]/match/[matchId]/_components/MatchSheet";
import { getTeamsTByTeamId } from "@/queries/teams";

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

export default async function MatchDetails({ matchDetails }) {
  const match = sampleMatch; // In a real app, you'd fetch this based on params.id

  const team1 = await getTeamsTByTeamId(matchDetails?.team1.id);
  const team2 = await getTeamsTByTeamId(matchDetails?.team2.id);

  // console.log("team1");
  // console.log(team1);
  // console.log(team2);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/tournament/${matchDetails?.tournamentId}`} passHref>
        <Button variant="outline" className="mb-4">
          Back to Tournament
        </Button>
      </Link>
      <h1 className="text-4xl font-bold mb-6">
        {matchDetails?.team1.name} vs {matchDetails?.team2.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Match Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{matchDetails?.type}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Date</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <CalendarIcon className="mr-2" />
            <span>{new Date(matchDetails?.matchDate).toLocaleString()}</span>
          </CardContent>
        </Card>
        <Card className="drop-shadow-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
            // variant={
            //   tournament.status === "upcoming" ? "secondary" : "default"
            // }
            >
              {matchDetails?.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{matchDetails?.team1.name}</CardTitle>
            <CardDescription>{matchDetails?.team1.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{matchDetails?.team1.bio}</p>
            <div className="flex items-center">
              <MapPinIcon className="mr-2" />
              <span>{matchDetails?.team1.location}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{matchDetails?.team2.name}</CardTitle>
            <CardDescription>{matchDetails?.team2.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{matchDetails?.team2.bio}</p>
            <div className="flex items-center">
              <MapPinIcon className="mr-2" />
              <span>{matchDetails?.team2.location}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Score</h2>
      <Card>
        <CardContent className="text-center py-6">
          <p className="text-3xl font-bold">
            {matchDetails?.team1.name} {matchDetails?.result?.team1} -{" "}
            {matchDetails?.result?.team2} {matchDetails?.team2.name}
          </p>
        </CardContent>
      </Card>

      {/* <div className="grid grid-cols-2 gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Open Bottom Sheet</Button>
          </SheetTrigger>
          <SheetContent className="bg-white" side="bottom">
            <SheetHeader>
              <SheetTitle>Bottom Sheet</SheetTitle>
              <SheetDescription>
                Click the button to close after a delay.
              </SheetDescription>
            </SheetHeader>
            <div className="p-4 pb-8">
              <Button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Closing..." : "Close After Delay"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div> */}

      <MatchSheet
        team1={JSON.parse(JSON.stringify(team1))}
        team2={JSON.parse(JSON.stringify(team2))}
      />

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
