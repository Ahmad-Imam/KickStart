"use client";
import React, { useContext, useState } from "react";
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
import { set } from "mongoose";
import { AuthContext } from "@/app/contexts";

export default function Status({ tournamentDetails }) {
  const [tournamentStart, setTournamentStart] = useState(
    tournamentDetails?.status === "live" ? true : false
  );

  const { loggedUser } = useContext(AuthContext);

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

          <button
            onClick={handleClick}
            className="customButton"
            style={{ display: isAdmin ? "block" : "none" }}
          >
            {tournamentStart ? "End Tournament" : "Start Tournament"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
