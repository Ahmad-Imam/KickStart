"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import MatchSheet from "./MatchSheet";
import { editMatchStatus } from "@/app/actions";

export default function MatchSettings({ team1, team2, matchDetails }) {
  const [matchStarted, setMatchStarted] = useState(
    matchDetails?.status === "live" ? true : false
  );

  const [matchFinished, setMatchFinished] = useState(
    matchDetails?.status === "finished" ? true : false
  );

  // console.log(matchDetails);

  async function handleClick() {
    if (!matchStarted) {
      await editMatchStatus(matchDetails, "live");

      setMatchStarted((prev) => !prev);
    } else {
      await editMatchStatus(matchDetails, "finished");
      setMatchStarted((prev) => !prev);
      setMatchFinished(true);
    }
  }

  return (
    <div className="py-4">
      <Button
        variant="outline"
        // disabled={matchFinished}
        className=" bg-slate-800 text-white"
        onClick={handleClick}
      >
        {matchStarted ? "End Match" : "Start Match"}
      </Button>

      {matchStarted && (
        <MatchSheet
          team1={JSON.parse(JSON.stringify(team1))}
          team2={JSON.parse(JSON.stringify(team2))}
          matchDetails={matchDetails}
        />
      )}
    </div>
  );
}
