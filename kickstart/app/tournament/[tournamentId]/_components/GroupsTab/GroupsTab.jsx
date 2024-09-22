import React from "react";

// import Link from "next/link";
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
import Link from "next/link";

export default function GroupsTab({ groupsDetails, tournamentDetails }) {
  return (
    <>
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
              <Card key={group?.id} className="dark:bg-slate-900 cardFull ">
                <CardHeader>
                  <CardTitle>{group?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="text-center">
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
        <Card className="p-4 my-3 cardFull ">
          <p className="text-center font-semibold">
            There are no groups available for this tournament.
          </p>
        </Card>
      )}
    </>
  );
}
