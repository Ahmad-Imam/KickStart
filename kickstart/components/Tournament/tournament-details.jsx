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
import { CalendarIcon, MapPinIcon } from "lucide-react";

import MatchTab from "@/app/tournament/[tournamentId]/_components/MatchTab";
import OverViewTab from "@/app/tournament/[tournamentId]/_components/OverViewTab";
import TeamsTab from "@/app/tournament/[tournamentId]/_components/TeamsTab";
import GroupsTab from "@/app/tournament/[tournamentId]/_components/GroupsTab";

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
  topScorers,
  sortedEvents,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const tournament = sampleTournament; // In a real app, you'd fetch this based on params.id
  // console.log("group");

  // console.log(matchesDetails);

  return (
    <div className="container mx-auto px-4 py-6">
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
          <OverViewTab
            tournamentDetails={tournamentDetails}
            topScorers={topScorers}
            sortedEvents={sortedEvents}
          />
        </TabsContent>
        <TabsContent value="teams" className="py-4">
          <TeamsTab tournamentDetails={tournamentDetails} />
        </TabsContent>
        <TabsContent value="matches" className="py-4">
          <MatchTab
            matchesDetails={matchesDetails}
            tournamentDetails={tournamentDetails}
          />
        </TabsContent>
        <TabsContent value="groups" className="py-4">
          <GroupsTab
            groupsDetails={groupsDetails}
            tournamentDetails={tournamentDetails}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
