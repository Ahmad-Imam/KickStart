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
import { Separator } from "../ui/separator";
import MatchTab from "@/app/tournament/[tournamentId]/_components/MatchTab";

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
          <Card className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Tournament Overview</CardTitle>
              <CardDescription>{tournamentDetails?.bio}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-slate-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300  ">
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
                    {topScorers.slice(0, 3)?.map((scorer, index) => (
                      <div key={index}>
                        <li className="flex items-center justify-between p-2 hover:bg-slate-800 hover:text-white rounded">
                          <span>{scorer?.name}</span>
                          <Badge
                            variant="secondary"
                            className="flex items-center"
                          >
                            <TrophyIcon className="mr-1 h-4 w-4" />
                            {scorer?.score}
                          </Badge>
                        </li>
                        <Separator className="" />
                      </div>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold mt-8 mb-4">Live Updates</h2>
              {sortedEvents?.length > 0 && (
                <Card>
                  <CardContent className="p-0 m-0">
                    <ul className="p-0 m-0">
                      {sortedEvents?.map((event, index) => (
                        <div
                          key={index}
                          className="py-2 px-1 m-2  rounded-md border-1 hover:bg-slate-800 hover:text-white group"
                        >
                          <Link
                            href={`/tournament/${tournamentDetails.id}/match/${event.matchId}`}
                          >
                            <li className="flex items-center">
                              <Badge
                                variant="outline"
                                className="mx-2 group-hover:bg-slate-800 group-hover:text-white text-nowrap "
                              >
                                {event.time}
                              </Badge>

                              {event.type === "kickoff" ? (
                                <BadgeCheckIcon
                                  size={20}
                                  className="mr-2 text-blue-600 group-hover:text-blue-400"
                                />
                              ) : event.type === "goal" ? (
                                <PartyPopperIcon
                                  size={20}
                                  className="mr-2 text-green-600 group-hover:text-green-400"
                                />
                              ) : event.type === "yellow" ? (
                                <TriangleAlertIcon
                                  size={20}
                                  className="mr-2 text-yellow-600 group-hover:text-yellow-400"
                                />
                              ) : event.type === "red" ? (
                                <TriangleAlertIcon
                                  size={20}
                                  className="mr-2 text-red-600 group-hover:text-red-400"
                                />
                              ) : event.type === "fulltime" ? (
                                <BadgeXIcon
                                  size={20}
                                  className="mr-2 text-red-600 group-hover:text-red-400"
                                />
                              ) : (
                                <div></div>
                              )}

                              <span className="font-semibold mr-2 px-1">
                                {event.type.toUpperCase()}:
                              </span>
                              <span>
                                {/* {event.description || `${event.player} (${event.team})`} */}
                                {event.description}
                              </span>
                            </li>
                          </Link>
                        </div>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
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
                  <Link
                    href={`/tournament/${tournamentDetails?.id}/team/${team.id}`}
                    passHref
                  >
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
          <MatchTab
            matchesDetails={matchesDetails}
            tournamentDetails={tournamentDetails}
          />
        </TabsContent>
        <TabsContent value="groups" className="py-4">
          {groupsDetails?.length > 0 ? (
            <div className="space-y-8">
              {groupsDetails
                .slice() // Create a shallow copy to avoid mutating the original array
                .map((group) => {
                  return {
                    ...group,
                    teams: group.teams
                      .slice() // Create a shallow copy of the teams array
                      .sort((a, b) => {
                        if (a.points !== b.points) {
                          return b.points - a.points; // Sort by points in descending order
                        }
                        if (
                          a.goalsFor - a.goalsAgainst !==
                          b.goalsFor - b.goalsAgainst
                        ) {
                          return (
                            b.goalsFor -
                            b.goalsAgainst -
                            (a.goalsFor - a.goalsAgainst)
                          ); // Sort by goal difference in descending order
                        }
                        if (a.goalsFor !== b.goalsFor) {
                          return b.goalsFor - a.goalsFor; // Sort by goals for in descending order
                        }
                        return a.name.localeCompare(b.name); // Sort by name in ascending order if all else is equal
                      }),
                  };
                })
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((group) => (
                  <Card
                    key={group?.id}
                    className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader>
                      <CardTitle>{group?.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="text-center">
                            <TableHead className="w-[100px]">
                              Position
                            </TableHead>
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
                            <TableRow
                              key={team?._id}
                              className="text-center"
                              style={{
                                background:
                                  index + 1 <= group.teamsQPerGroup
                                    ? "rgb(30 41 59 / 1)"
                                    : "white",
                                color:
                                  index + 1 <= group.teamsQPerGroup
                                    ? "white"
                                    : "black",
                                cursor: "pointer",
                              }}
                            >
                              <TableCell className="font-bold">
                                {index + 1}
                              </TableCell>
                              <TableCell className="w-auto p-0">
                                <Link
                                  href={`/tournament/${tournamentDetails?.id}/team/${team?.teamId}`}
                                  className="hover:underline text-xs "
                                >
                                  {team?.name}
                                </Link>
                              </TableCell>
                              <TableCell className="text-right">
                                {team?.matchPlayed}
                              </TableCell>
                              <TableCell className="text-right">
                                {team?.matchWon}
                              </TableCell>
                              <TableCell className="text-right">
                                {team?.matchDraw}
                              </TableCell>
                              <TableCell className="text-right">
                                {team?.matchLost}
                              </TableCell>
                              <TableCell className="text-right">
                                {team?.goalsFor}
                              </TableCell>
                              <TableCell className="text-right">
                                {team?.goalsAgainst}
                              </TableCell>
                              <TableCell className="text-right">
                                {team?.goalsFor - team?.goalsAgainst}
                              </TableCell>
                              <TableCell className="text-right font-bold">
                                {team?.points}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className=" p-4 border-2 rounded-md shadow-sm border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-700 text-center font-semibold">
                There are no groups available for this tournament.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
