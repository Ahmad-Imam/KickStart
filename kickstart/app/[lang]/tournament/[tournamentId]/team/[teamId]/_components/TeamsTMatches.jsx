import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function TeamsTMatches({ teamsTMatches, wordDb }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamsTMatches?.length > 0 ? (
        teamsTMatches.map((match) => (
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
                  className={"bg-cyan-600 dark:bg-cyan-500 dark:text-gray-50 "}
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  {match?.type}
                </Badge>
                <Badge
                  variant={match?.type === "group" ? "outline" : "destructive"}
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
                href={`/tournament/${match?.tournamentId}/match/${match?.id}`}
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
  );
}
