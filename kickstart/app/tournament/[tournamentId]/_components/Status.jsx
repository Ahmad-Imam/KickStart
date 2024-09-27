"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { editTournamentStatus } from "@/app/actions";

import { useAuth } from "@/app/hooks/useAuth";

export default function Status({ tournamentDetails }) {
  const [tournamentStart, setTournamentStart] = useState(
    tournamentDetails?.status === "live" ? true : false
  );

  const { loggedUser } = useAuth();

  const isAdmin = tournamentDetails?.admin === loggedUser?.id;
  console.log(isAdmin);

  async function handleClick() {
    console.log("Start Tournament");
    setTournamentStart(!tournamentStart);
    if (tournamentStart) {
      await editTournamentStatus(tournamentDetails, "finished");
    } else {
      await editTournamentStatus(tournamentDetails, "live");
    }
    console.log("done");
  }

  return (
    <Card className="dark:bg-slate-900 my-8 cardFull ">
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col  gap-4 items-start">
          <Badge
          // variant={
          //   tournament.status === "upcoming" ? "secondary" : "default"
          // }
          >
            {tournamentDetails?.status}
          </Badge>

          {isAdmin && (
            <button onClick={handleClick} className="customButton">
              {tournamentStart ? "End Tournament" : "Start Tournament"}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
