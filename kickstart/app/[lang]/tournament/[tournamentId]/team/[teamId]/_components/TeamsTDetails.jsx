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

import TeamsTPlayers from "./TeamsTPlayers";
import { getAllPlayersByIds } from "@/queries/players";
import { dbConnect } from "@/service/mongo";
import { Separator } from "@/components/ui/separator";
import TeamsTTabs from "./TeamsTTabs";
import { TabsContent } from "@/components/ui/tabs";
import { getTeamsTMatches } from "@/queries/teamsTournament";
import TeamsTMatches from "./TeamsTMatches";

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

export default async function TeamsTDetails({
  teamsTournament,
  topScorers,
  yellowCards,
  redCards,
  isAdmin,
  tournamentDetails,
  wordDb,
}) {
  await dbConnect();
  const playersInfo = await getAllPlayersByIds(teamsTournament.players);

  const teamsTMatches = await getTeamsTMatches(
    teamsTournament.tournamentId,
    teamsTournament.teamId
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-min">
        <Link
          href={`/tournament/${teamsTournament?.tournamentId}`}
          passHref
          className=""
        >
          <button variant="outline" className="mb-4 customButton ">
            {wordDb.backToTournament}
          </button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-6">{teamsTournament?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="dark:bg-slate-900 cardFull ">
          <CardHeader>
            <CardTitle>{wordDb.location}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{teamsTournament?.location}</span>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 flex flex-row justify-between items-center p-4 shadow-sm  cardFull  ">
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">{wordDb.played}</div>
            <div className="font-semibold">{teamsTournament?.matchPlayed}</div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">{wordDb.won}</div>
            <div className="font-semibold">{teamsTournament?.matchWon}</div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">{wordDb.draw}</div>
            <div className="font-semibold">{teamsTournament?.matchDraw}</div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <div className="font-semibold text-lg">{wordDb.lost}</div>
            <div className="font-semibold">{teamsTournament?.matchLost}</div>
          </div>
        </Card>
      </div>
      <TeamsTPlayers
        playersInfo={JSON.parse(JSON.stringify(playersInfo))}
        teamsTournament={teamsTournament}
        isAdmin={isAdmin}
        tournamentDetails={tournamentDetails}
        wordDb={wordDb}
      />

      <TeamsTTabs wordDb={wordDb}>
        <TabsContent value="overview" className="py-4">
          <Card className="dark:bg-slate-900 mb-6 cardFull ">
            <CardHeader>
              <CardTitle>{wordDb.teamTopScorers}: </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topScorers?.length === 0 ? (
                  <li className="flex items-center justify-between p-2 hover:bg-slate-800 hover:text-white rounded">
                    {wordDb.noScorers}
                  </li>
                ) : (
                  topScorers?.map((scorer, index) => (
                    <Link href={`/player/${scorer.id}`} key={index}>
                      <li className="flex items-center justify-between p-2 px-4 dark:bg-slate-800 dark:hover:bg-slate-700 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3">
                        <span>{scorer?.name}</span>
                        <Badge
                          variant="secondary"
                          className="flex items-center"
                        >
                          <TrophyIcon size={22} className="mr-1 h-4 w-4" />
                          <div className="md:text-lg">{scorer?.score}</div>
                        </Badge>
                      </li>
                      {/* <Separator className="" /> */}
                    </Link>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900 mb-6 cardFull ">
            <CardHeader>
              <CardTitle>{wordDb.teamTopPerformances}: </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {teamsTournament?.motm?.length === 0 ? (
                  <li className="flex items-center justify-between p-2 hover:bg-slate-800 hover:text-white rounded">
                    No Performances yet
                  </li>
                ) : (
                  teamsTournament?.motm?.map((motm, index) => (
                    <Link
                      key={index}
                      href={`/tournament/${motm?.matchDetails?.tournamentId}/match/${motm?.matchDetails?.id}`}
                    >
                      <li className="flex items-center justify-between p-2 px-4 dark:bg-slate-800 dark:hover:bg-slate-700 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3">
                        <span>{motm?.player?.name}</span>
                        <div>Man of the match</div>

                        <div>
                          {motm?.matchDetails?.team1?.name} vs{" "}
                          {motm?.matchDetails?.team2?.name}
                        </div>
                      </li>
                      {/* <Separator className="" /> */}
                    </Link>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="dark:bg-slate-900 my-4 cardFull ">
              <CardHeader>
                <CardTitle>{wordDb.yellowCards}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {yellowCards.length > 0 ? (
                    yellowCards.map((player) => (
                      <Link href={`/player/${player.id}`} key={player.id}>
                        <li
                          key={player.id}
                          className="flex items-center justify-between p-2 px-4 dark:bg-slate-800 dark:hover:bg-slate-700 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3"
                        >
                          <span>{player.name}</span>
                          <Badge
                            variant="secondary"
                            className="flex items-center"
                          >
                            <AlertTriangleIcon
                              size={22}
                              className="mr-1 h-4 w-4"
                            />
                            <div className="md:text-lg">{player.yellow}</div>
                          </Badge>
                        </li>
                      </Link>
                    ))
                  ) : (
                    <p>{wordDb.noYellowCards}</p>
                  )}
                </ul>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-900 my-4 cardFull ">
              <CardHeader>
                <CardTitle>{wordDb.redCards}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {redCards.length > 0 ? (
                    redCards.map((player) => (
                      <Link href={`/player/${player.id}`} key={player.id}>
                        <li
                          key={player.id}
                          className="flex items-center justify-between p-2 px-4 dark:bg-slate-800 dark:hover:bg-slate-700 border-1 rounded-md last:border-b-0 cursor-pointer hover:bg-slate-200 bg-slate-100 my-3"
                        >
                          <span>{player.name}</span>
                          <Badge
                            variant="secondary"
                            className="flex items-center"
                          >
                            <AlertTriangleIcon
                              size={22}
                              className="mr-1 h-4 w-4"
                            />

                            <div className="md:text-lg">{player.red}</div>
                          </Badge>
                        </li>
                      </Link>
                    ))
                  ) : (
                    <p>{wordDb.noRedCards}</p>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="py-4">
          <TeamsTMatches teamsTMatches={teamsTMatches} wordDb={wordDb} />
        </TabsContent>
      </TeamsTTabs>
    </div>
  );
}
