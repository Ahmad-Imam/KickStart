"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import MatchSheet from "./MatchSheet";
import { editMatchStatus, startTiebreaker } from "@/app/actions";
import Tiebreaker from "./Tiebreaker";
import { set } from "mongoose";

export default function MatchSettings({ team1, team2, matchDetails }) {
  const [matchStarted, setMatchStarted] = useState(
    matchDetails?.status === "live" ? true : false
  );

  const [matchFinished, setMatchFinished] = useState(
    matchDetails?.status === "finished" ? true : false
  );

  const [tiebreaker, setTiebreaker] = useState(
    matchDetails?.tiebreaker ? true : false
  );
  const [tiebreakerEnd, setTiebreakerEnd] = useState(false);

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

  async function handleTiebreaker() {
    setTiebreaker((prev) => !prev);
    if (tiebreaker) {
      console.log("Tiebreaker ended");
      setTiebreakerEnd(true);
    }
    if (!tiebreaker) {
      console.log("Tiebreaker started");
      const tiebreaker = await startTiebreaker(matchDetails);
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

      <Button
        variant="outline"
        // disabled={tiebreakerEnd}
        className=" bg-slate-800 text-white"
        onClick={handleTiebreaker}
      >
        {tiebreaker ? "End Tiebreaker" : "Start Tiebreaker"}
      </Button>

      {tiebreaker && <Tiebreaker matchDetails={matchDetails} />}
    </div>
  );
}
