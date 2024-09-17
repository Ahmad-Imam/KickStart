"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import MatchSheet from "./MatchSheet";
import { editMatchStatus, endTiebreaker, startTiebreaker } from "@/app/actions";
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

  const [loading, setLoading] = useState(false);
  const [loadingTie, setLoadingTie] = useState(false);

  // console.log(matchDetails);

  async function handleClick() {
    setLoading(true);
    if (!matchStarted) {
      await editMatchStatus(matchDetails, "live");
      setLoading(false);
      setMatchStarted((prev) => !prev);
    } else {
      await editMatchStatus(matchDetails, "finished");
      setMatchStarted((prev) => !prev);
      setMatchFinished(true);
      setLoading(false);
    }
  }

  async function handleTiebreaker() {
    setTiebreaker((prev) => !prev);
    setLoadingTie(true);
    if (tiebreaker) {
      console.log("Tiebreaker ended");
      setTiebreakerEnd(true);
      const tiebreakerEnd = await endTiebreaker(matchDetails);
      setLoadingTie(false);
    }
    if (!tiebreaker) {
      console.log("Tiebreaker started");
      const tiebreaker = await startTiebreaker(matchDetails);
      setLoadingTie(false);
    }
  }

  return (
    <div>
      <div className="py-4 flex flex-row justify-around items-start w-full">
        <Button
          variant="outline"
          // disabled={matchFinished}
          className=" bg-slate-800 text-white"
          onClick={handleClick}
        >
          {loading
            ? "Updating match ..."
            : matchStarted
            ? "End Match"
            : "Start Match"}
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
          {loadingTie
            ? "Updating match ..."
            : tiebreaker
            ? "End Tiebreaker"
            : "Start Tiebreaker"}
        </Button>
      </div>
      {tiebreaker && <Tiebreaker matchDetails={matchDetails} />}
    </div>
  );
}
