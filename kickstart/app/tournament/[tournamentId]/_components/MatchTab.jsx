"use client";

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
import React, { useState } from "react";

export default function MatchTab({ matchesDetails, tournamentDetails }) {
  const [activeTab, setActiveTab] = useState("group");

  const groupMatches = matchesDetails?.filter(
    (match) => match?.type === "group"
  );
  const knockoutMatches = matchesDetails?.filter(
    (match) => match?.type !== "group"
  );

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col"
      >
        <TabsList className=" flex flex-row justify-around gap-6 h-auto max-w-lg">
          <TabsTrigger
            value="group"
            className="px-6 py-2 my-1 "
            style={{
              "--tw-bg-opacity": 1,
              backgroundColor:
                activeTab === "group"
                  ? "rgb(30 41 59 / var(--tw-bg-opacity))"
                  : "white",
              color: activeTab === "group" ? "white" : "black",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            Group
          </TabsTrigger>
          <TabsTrigger
            className="px-6 py-2 my-1 "
            style={{
              "--tw-bg-opacity": 1,
              backgroundColor:
                activeTab === "knockout"
                  ? "rgb(30 41 59 / var(--tw-bg-opacity))"
                  : "white",
              color: activeTab === "knockout" ? "white" : "black",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            value="knockout"
          >
            Knockout
          </TabsTrigger>
          {/* <TabsTrigger
            className="px-6 py-2 my-1 "
            style={{
              "--tw-bg-opacity": 1,
              backgroundColor:
                activeTab === "knockout"
                  ? "rgb(30 41 59 / var(--tw-bg-opacity))"
                  : "white",
              color: activeTab === "knockout" ? "white" : "black",
              cursor: "pointer",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
            value="knockout"
          >
            Knockout
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="group" className="py-4">
          {groupMatches?.length > 0 ? (
            groupMatches.map((match) => (
              <Card
                key={match?.id}
                className="my-3 border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300"
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
                  <Link
                    href={`/tournament/${tournamentDetails?.id}/match/${match?.id}`}
                  >
                    <Button className="mt-4 bg-slate-800 hover:bg-black">
                      View Match Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className=" p-4 border-2 rounded-md shadow-sm border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-700 text-center font-semibold">
                There are no matches available for this tournament.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="knockout" className="py-4">
          {knockoutMatches?.length > 0 ? (
            knockoutMatches.map((match) => (
              <Card
                key={match?.id}
                className="my-3 border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300"
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
                  <Link
                    href={`/tournament/${tournamentDetails?.id}/match/${match?.id}`}
                  >
                    <Button className="mt-4 bg-slate-800 hover:bg-black">
                      View Match Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className=" p-4 border-2 rounded-md shadow-sm border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-700 text-center font-semibold">
                There are no matches available for this tournament.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      {/* <div className="space-y-4">
        {matchesDetails?.length > 0 ? (
          matchesDetails.map((match) => (
            <Card
              key={match?.id}
              className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300"
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
                  variant={match?.type === "group" ? "outline" : "destructive"}
                  className="mx-6 hover:bg-black hover:text-white"
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  {match?.status}
                </Badge>
                <Link
                  href={`/tournament/${tournamentDetails?.id}/match/${match?.id}`}
                >
                  <Button className="mt-4 bg-slate-800 hover:bg-black">
                    View Match Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className=" p-4 border-2 rounded-md shadow-sm border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <p className="text-gray-700 text-center font-semibold">
              There are no matches available for this tournament.
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
}
