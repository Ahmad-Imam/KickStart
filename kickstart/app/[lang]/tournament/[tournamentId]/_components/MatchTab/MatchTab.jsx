import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

import SingleElimination from "@/app/[lang]/create/tournaments/_components/brackets/tournament-brackets";
import MatchTabs from "./MatchTabs";

export default function MatchTab({
  matchesDetails,
  tournamentDetails,
  wordDb,
}) {
  const order = ["live", "upcoming", "finished"];

  const groupMatches = matchesDetails
    ?.filter((match) => match?.type === "group")
    .sort((a, b) => {
      return order.indexOf(a.status) - order.indexOf(b.status);
    });
  const knockoutMatches = matchesDetails
    ?.filter((match) => match?.type !== "group")
    .sort((a, b) => {
      return order.indexOf(a.status) - order.indexOf(b.status);
    });

  const quarterMatches = matchesDetails?.filter(
    (match) => match?.type === "quarter"
  );

  const semiMatches = matchesDetails?.filter((match) => match?.type === "semi");
  const finalMatch = matchesDetails?.filter((match) => match?.type === "final");

  const transformData = (quarterData, semiData, finalData) => {
    const rounds = [];
    const roundSize = 4; // Assuming each round has 4 matches

    let firstRoundMatches = [];

    if (quarterData?.length !== 0) {
      firstRoundMatches = quarterData.map((match, index) => ({
        id: index + 1,
        date: new Date().toDateString(),
        teams: [
          {
            id: index * 2 + 1,
            name: match?.team1?.name || match?.qName?.team1,
            score: match?.result?.team1,
          },
          {
            id: index * 2 + 2,
            name: match?.team2?.name || match?.qName?.team2,
            score: match?.result?.team2,
          },
        ],
      }));
      rounds.push({
        title: `Quarter Final`,
        seeds: firstRoundMatches,
      });
    } else if (semiData?.length !== 0) {
      firstRoundMatches = semiData.map((match, index) => ({
        id: index + 1,
        date: new Date().toDateString(),
        teams: [
          {
            id: index * 2 + 1,
            name: match?.team1?.name || match?.qName?.team1,
            score: match?.result?.team1,
          },
          {
            id: index * 2 + 2,
            name: match?.team2?.name || match?.qName?.team2,
            score: match?.result?.team2,
          },
        ],
      }));
      rounds.push({
        title: `Semi Final`,
        seeds: firstRoundMatches,
      });
    }

    // Generate subsequent rounds
    let currentRound = firstRoundMatches;
    let roundNumber = 2;

    while (currentRound.length > 1) {
      const nextRoundMatches = [];
      let winner1; // Assume team1 is the winner
      let winner2;
      for (let i = 0; i < currentRound.length; i += 2) {
        if (currentRound[i].teams[0].score > currentRound[i].teams[1].score) {
          winner1 = currentRound[i].teams[0];
        } else if (
          currentRound[i].teams[0].score < currentRound[i].teams[1].score
        ) {
          winner1 = currentRound[i].teams[1];
        } else {
          winner1 = currentRound[i].teams[0];
        }
        if (
          currentRound[i + 1].teams[0].score >
          currentRound[i + 1].teams[1].score
        ) {
          winner2 = currentRound[i + 1].teams[0];
        } else if (
          currentRound[i + 1].teams[0].score <
          currentRound[i + 1].teams[1].score
        ) {
          winner2 = currentRound[i + 1].teams[1];
        } else {
          winner2 = currentRound[i + 1].teams[0];
        }

        nextRoundMatches.push({
          id: i / 2 + 1,
          // date: new Date().toDateString(),
          teams: [
            { id: winner1?.id, name: winner1?.name, score: winner1?.score },
            { id: winner2?.id, name: winner2?.name, score: winner2?.score },
          ],
        });
      }

      if (quarterData.length === 4 && roundNumber === 2) {
        rounds.push({
          title: `Semi Final`,
          seeds: semiData.map((match, index) => ({
            id: index + 1,
            date: new Date().toDateString(),
            teams: [
              {
                id: index * 2 + 1,
                name: match?.team1?.name || match?.qName?.team1,
                score: match?.result?.team1,
              },
              {
                id: index * 2 + 2,
                name: match?.team2?.name || match?.qName?.team2,
                score: match?.result?.team2,
              },
            ],
          })),
        });
      } else if (finalData && roundNumber === 3) {
        rounds.push({
          title: `Final`,
          seeds: finalData.map((match, index) => ({
            id: index + 1,
            date: new Date().toDateString(),
            teams: [
              {
                id: index * 2 + 1,
                name: match?.team1?.name || match?.qName?.team1,
                score: match?.result?.team1,
              },
              {
                id: index * 2 + 2,
                name: match?.team2?.name || match?.qName?.team2,
                score: match?.result?.team2,
              },
            ],
          })),
        });
      } else if (quarterData.length === 0 && roundNumber === 2) {
        rounds.push({
          title: `Final`,
          seeds: finalData.map((match, index) => ({
            id: index + 1,
            date: new Date().toDateString(),
            teams: [
              {
                id: index * 2 + 1,
                name: match?.team1?.name || match?.qName?.team1,
                score: match?.result?.team1,
              },
              {
                id: index * 2 + 2,
                name: match?.team2?.name || match?.qName?.team2,
                score: match?.result?.team2,
              },
            ],
          })),
        });
      } else {
        rounds.push({
          title: `Finals`,
          seeds: nextRoundMatches,
        });
      }
      currentRound = nextRoundMatches;
      roundNumber++;
    }

    return rounds;
  };

  return (
    <div className="space-y-4 ">
      <MatchTabs wordDb={wordDb}>
        <TabsContent value="group" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupMatches?.length > 0 ? (
              groupMatches.map((match) => (
                <Card
                  key={match?.id}
                  className="flex flex-col justify-between dark:bg-slate-900 my-3 cardFull "
                >
                  <CardHeader>
                    {match?.type === "group" ? (
                      <CardTitle>
                        {`${match?.team1?.name} (${match?.result?.team1}) `} vs{" "}
                        {`${match?.team2?.name} (${match?.result?.team2}) `}
                      </CardTitle>
                    ) : (
                      <CardTitle>
                        {`${
                          match?.team1?.name.toUpperCase() ||
                          match?.qName?.team1.toUpperCase()
                        } (${match?.result?.team1}) `}
                        vs{" "}
                        {`${
                          match?.team2?.name.toUpperCase() ||
                          match?.qName?.team2.toUpperCase()
                        } (${match?.result?.team2})`}
                      </CardTitle>
                    )}
                    <CardDescription>
                      {new Date(match?.matchDate).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className=" ">
                    <div className="pt-2">
                      <Badge
                        className={
                          "bg-cyan-600 dark:bg-cyan-500 dark:text-gray-50 "
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
                        className={
                          match?.status === "live"
                            ? "bg-red-800 dark:bg-red-600 dark:text-gray-50"
                            : "bg-slate-800 dark:bg-blue-500 text-white dark:text-gray-50"
                        }
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          marginLeft: 10,
                        }}
                      >
                        {match?.status}
                      </Badge>
                    </div>
                    <Link
                      href={`/tournament/${tournamentDetails?.id}/match/${match?.id}`}
                    >
                      <div className="mt-4 w-40 customButton">
                        {wordDb.viewMatchDetails}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="dark:bg-slate-950 p-4 my-3 cardFull ">
                <p className="text-center font-semibold">
                  {wordDb.noGroupMatches}
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="knockout" className="py-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {knockoutMatches?.length > 0 ? (
              knockoutMatches.map((match) => (
                <Card
                  key={match?.id}
                  className="flex flex-col justify-between dark:bg-slate-900 my-3 cardFull "
                >
                  <CardHeader>
                    {match?.type === "group" ? (
                      <CardTitle>
                        {`${match?.team1?.name} (${match?.result?.team1}) `} vs{" "}
                        {`${match?.team2?.name} (${match?.result?.team2}) `}
                      </CardTitle>
                    ) : (
                      <CardTitle>
                        {`${
                          match?.team1?.name.toUpperCase() ||
                          match?.qName?.team1.toUpperCase()
                        } (${match?.result?.team1}) `}
                        vs{" "}
                        {`${
                          match?.team2?.name.toUpperCase() ||
                          match?.qName?.team2.toUpperCase()
                        } (${match?.result?.team2})`}
                      </CardTitle>
                    )}
                    <CardDescription>
                      {new Date(match?.matchDate).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="pt-2">
                      <Badge
                        className={
                          match?.type === "quarter"
                            ? "bg-cyan-900 dark:bg-cyan-500 dark:text-gray-50"
                            : match?.type === "semi"
                            ? "bg-amber-500 dark:bg-amber-400 dark:text-gray-50"
                            : "bg-indigo-700 dark:bg-indigo-400 dark:text-gray-50"
                        }
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                      >
                        {match?.type}
                      </Badge>
                      <Badge
                        // variant={
                        //   match?.type === "quarter" ? "outline" : "secondary"
                        // }
                        className={
                          match?.status === "live"
                            ? "bg-red-800 dark:bg-red-600 hover:bg-black hover:text-white dark:text-gray-50"
                            : "bg-slate-800 dark:bg-blue-500 text-white hover:bg-black hover:text-white dark:text-gray-50"
                        }
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      >
                        {match?.status}
                      </Badge>
                    </div>
                    <Link
                      href={`/tournament/${tournamentDetails?.id}/match/${match?.id}`}
                    >
                      <div className="mt-4 w-40 customButton">
                        {wordDb.viewMatchDetails}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="dark:bg-slate-950 p-4 my-3 cardFull ">
                <p className="text-center font-semibold">{wordDb.noMatches}</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bracket" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tournamentDetails?.quarterMatch.length !== 0 &&
              tournamentDetails?.semiMatch.length === 0 && (
                <div className="py-6">
                  <SingleElimination
                    transformedRounds={transformData(
                      quarterMatches,
                      semiMatches,
                      finalMatch
                    )}
                  />
                </div>
              )}
            {tournamentDetails?.quarterMatch.length === 0 &&
              tournamentDetails?.semiMatch.length > 0 && (
                <div className="py-6">
                  <SingleElimination
                    transformedRounds={transformData(
                      quarterMatches,
                      semiMatches,
                      finalMatch
                    )}
                  />
                </div>
              )}
            {tournamentDetails?.quarterMatch.length === 0 &&
              tournamentDetails?.semiMatch.length === 0 && (
                <Card className="dark:bg-slate-950 p-4 my-3 cardFull ">
                  <p className="text-center font-semibold">
                    {wordDb.noBracketMatches}
                  </p>
                </Card>
              )}
          </div>

          <div className=" text-center font-medium pt-10 ">
            {wordDb.bracketKnockout}
          </div>
        </TabsContent>
      </MatchTabs>
    </div>
  );
}
