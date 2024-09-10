"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, MapPinIcon, UserIcon, TrophyIcon } from "lucide-react";

const sampleTournament = {
  id: "t1",
  name: "World Cup 2024",
  bio: "The biggest football tournament in the world",
  location: "United States",
  startDate: "Tue Sep 10 2024 00:00:00 GMT+0300 (Eastern European Summer Time)",
  endDate: "Tue Sep 10 2024 00:00:00 GMT+0300 (Eastern European Summer Time)",
  status: "upcoming",
  organizer: "FIFA",
  groupsNum: 8,
  teamsPerGroup: 4,
  teamsQPerGroup: 2,
  teamsTournament: [
    {
      id: "team1",
      name: "Brazil",
      bio: "5-time champions",
      location: "South America",
    },
    {
      id: "team2",
      name: "Germany",
      bio: "4-time champions",
      location: "Europe",
    },
    {
      id: "team3",
      name: "Argentina",
      bio: "3-time champions",
      location: "South America",
    },
    {
      id: "team4",
      name: "France",
      bio: "2-time champions",
      location: "Europe",
    },
  ],
  matches: [
    {
      id: "match1",
      team1: { name: "Brazil" },
      team2: { name: "Germany" },
      matchDate: "2024-06-14T18:00:00.000Z",
      type: "group",
      status: "scheduled",
    },
    {
      id: "match2",
      team1: { name: "Argentina" },
      team2: { name: "France" },
      matchDate: "2024-06-15T15:00:00.000Z",
      type: "group",
      status: "scheduled",
    },
  ],
  groupMatch: [
    {
      name: "Group A",
      teams: [
        {
          id: "team1",
          name: "Brazil",
          played: 3,
          won: 2,
          drawn: 1,
          lost: 0,
          goalsFor: 7,
          goalsAgainst: 2,
          goalDifference: 5,
          points: 7,
        },
        {
          id: "team2",
          name: "Germany",
          played: 3,
          won: 2,
          drawn: 0,
          lost: 1,
          goalsFor: 6,
          goalsAgainst: 3,
          goalDifference: 3,
          points: 6,
        },
        {
          id: "team5",
          name: "Spain",
          played: 3,
          won: 1,
          drawn: 1,
          lost: 1,
          goalsFor: 4,
          goalsAgainst: 4,
          goalDifference: 0,
          points: 4,
        },
        {
          id: "team6",
          name: "Japan",
          played: 3,
          won: 0,
          drawn: 0,
          lost: 3,
          goalsFor: 1,
          goalsAgainst: 9,
          goalDifference: -8,
          points: 0,
        },
      ],
    },
    {
      name: "Group B",
      teams: [
        {
          id: "team3",
          name: "Argentina",
          played: 3,
          won: 3,
          drawn: 0,
          lost: 0,
          goalsFor: 9,
          goalsAgainst: 1,
          goalDifference: 8,
          points: 9,
        },
        {
          id: "team4",
          name: "France",
          played: 3,
          won: 2,
          drawn: 0,
          lost: 1,
          goalsFor: 5,
          goalsAgainst: 3,
          goalDifference: 2,
          points: 6,
        },
        {
          id: "team7",
          name: "England",
          played: 3,
          won: 1,
          drawn: 0,
          lost: 2,
          goalsFor: 3,
          goalsAgainst: 5,
          goalDifference: -2,
          points: 3,
        },
        {
          id: "team8",
          name: "Netherlands",
          played: 3,
          won: 0,
          drawn: 0,
          lost: 3,
          goalsFor: 2,
          goalsAgainst: 10,
          goalDifference: -8,
          points: 0,
        },
      ],
    },
  ],
  quarterMatch: [
    { team1: { qName: "A1" }, team2: { qName: "B2" } },
    { team1: { qName: "B1" }, team2: { qName: "A2" } },
  ],
  semiMatch: [],
  isThirdPlace: true,
  scorers: [
    { name: "Neymar (Brazil)", goals: 5 },
    { name: "Kane (England)", goals: 4 },
    { name: "Mbappe (France)", goals: 3 },
  ],
};

//groupmatch - groups  table - teams -  info from teamsTournament table
//matches - matches table

export default function TournamentDetails({
  tournamentDetails,
  matchesDetails,
  groupsDetails,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const tournament = sampleTournament; // In a real app, you'd fetch this based on params.id
  console.log("group");

  console.log(groupsDetails);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{tournamentDetails?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              {tournamentDetails?.status}
            </Badge>
          </CardContent>
        </Card>
        <Card className="drop-shadow-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Date</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <CalendarIcon className="mr-2" />
            <span>
              {new Date(tournamentDetails?.startDate).toLocaleDateString()} -{" "}
              {new Date(tournamentDetails?.endDate).toLocaleDateString()}
            </span>
          </CardContent>
        </Card>
        <Card className="drop-shadow-sm hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{tournamentDetails?.location}</span>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 gap-2 px-2 h-auto py-2 ">
          <TabsTrigger
            value="overview"
            style={{
              "--tw-bg-opacity": 1,
              backgroundColor:
                activeTab === "overview"
                  ? "rgb(30 41 59 / var(--tw-bg-opacity))"
                  : "white",
              color: activeTab === "overview" ? "white" : "black",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            style={{
              "--tw-bg-opacity": 1,
              backgroundColor:
                activeTab === "teams"
                  ? "rgb(30 41 59 / var(--tw-bg-opacity))"
                  : "white",
              color: activeTab === "teams" ? "white" : "black",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            value="teams"
          >
            Teams
          </TabsTrigger>
          <TabsTrigger
            style={{
              "--tw-bg-opacity": 1,
              backgroundColor:
                activeTab === "matches"
                  ? "rgb(30 41 59 / var(--tw-bg-opacity))"
                  : "white",
              color: activeTab === "matches" ? "white" : "black",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            value="matches"
          >
            Matches
          </TabsTrigger>
          <TabsTrigger
            style={{
              "--tw-bg-opacity": 1,
              backgroundColor:
                activeTab === "groups"
                  ? "rgb(30 41 59 / var(--tw-bg-opacity))"
                  : "white",
              color: activeTab === "groups" ? "white" : "black",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            value="groups"
          >
            Groups
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="py-4">
          <Card className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Tournament Overview</CardTitle>
              <CardDescription>{tournamentDetails?.bio}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-slate-200 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  ">
                <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
                  <strong>Organizer:</strong> {tournamentDetails?.organizer}
                </p>
                <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
                  <strong>Number of Groups:</strong>{" "}
                  {tournamentDetails?.groupsNum}
                </p>
                <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
                  <strong>Teams per Group:</strong>{" "}
                  {tournamentDetails?.teamsPerGroup}
                </p>
                <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
                  <strong>Teams Qualifying per Group:</strong>{" "}
                  {tournamentDetails?.teamsQPerGroup}
                </p>
              </div>

              <Card className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300 my-8">
                <CardHeader>
                  <CardTitle>Tournament Top Scorers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tournament.scorers.map((scorer, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                      >
                        <span>{scorer.name}</span>
                        <Badge
                          variant="secondary"
                          className="flex items-center"
                        >
                          <TrophyIcon className="mr-1 h-4 w-4" />
                          {scorer.goals}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teams" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tournamentDetails?.teamsTournament.map((team) => (
              <Card
                key={team.id}
                className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>{team.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{team.bio}</p>
                  <Link href={`/team/${team.id}`} passHref>
                    <Button className="bg-slate-800 hover:bg-black">
                      View Team Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="matches" className="py-4">
          <div className="space-y-4">
            {matchesDetails.map((match) => (
              <Card
                key={match?.id}
                className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  {match?.type === "group" ? (
                    <CardTitle>
                      {match?.team1?.name} vs {match?.team2?.name}
                    </CardTitle>
                  ) : (
                    <CardTitle>
                      {match?.qName?.team1.toUpperCase()} vs{" "}
                      {match?.qName?.team2.toUpperCase()}
                    </CardTitle>
                  )}
                  <CardDescription>
                    {new Date(match?.matchDate).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    className={
                      match?.type === "group" ? "bg-blue-900" : "bg-amber-500"
                    }
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {match?.type}
                  </Badge>
                  <Badge
                    variant={
                      match?.type === "group" ? "outline" : "destructive"
                    }
                    className="mx-6 hover:bg-black hover:text-white"
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    {match?.status}
                  </Badge>
                  <Link href={`/match/${match?.id}`} passHref>
                    <Button className="mt-4 bg-slate-800 hover:bg-black">
                      View Match Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="groups" className="py-4">
          <div className="space-y-8">
            {tournament.groupMatch.map((group) => (
              <Card
                key={group.name}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Position</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-right">Played</TableHead>
                        <TableHead className="text-right">Won</TableHead>
                        <TableHead className="text-right">Drawn</TableHead>
                        <TableHead className="text-right">Lost</TableHead>
                        <TableHead className="text-right">GF</TableHead>
                        <TableHead className="text-right">GA</TableHead>
                        <TableHead className="text-right">GD</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.teams.map((team, index) => (
                        <TableRow key={team.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/team/${team.id}`}
                              className="hover:underline"
                            >
                              {team.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">
                            {team.played}
                          </TableCell>
                          <TableCell className="text-right">
                            {team.won}
                          </TableCell>
                          <TableCell className="text-right">
                            {team.drawn}
                          </TableCell>
                          <TableCell className="text-right">
                            {team.lost}
                          </TableCell>
                          <TableCell className="text-right">
                            {team.goalsFor}
                          </TableCell>
                          <TableCell className="text-right">
                            {team.goalsAgainst}
                          </TableCell>
                          <TableCell className="text-right">
                            {team.goalDifference}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {team.points}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
