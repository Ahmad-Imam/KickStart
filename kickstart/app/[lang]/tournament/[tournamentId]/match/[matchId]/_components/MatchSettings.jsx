"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import MatchSheet from "./MatchSheet";
import { editMatchStatus, endTiebreaker, startTiebreaker } from "@/app/actions";
import Tiebreaker from "./Tiebreaker";
import { set } from "mongoose";

export default function MatchSettings({
  team1,
  team2,
  matchDetails,
  isMatchConfig,
  tournamentStatus,
  wordDb,
}) {
  console.log(tournamentStatus);

  const [matchStarted, setMatchStarted] = useState(
    tournamentStatus === "live" && matchDetails?.status === "live"
      ? true
      : false
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

  console.log(matchDetails?.result?.team1 !== matchDetails?.result?.team2);

  return (
    <div>
      {isMatchConfig && (
        <div className="py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center items-center w-full">
          <button
            disabled={
              loading ||
              (matchStarted &&
                matchDetails?.type !== "group" &&
                matchDetails?.result?.team1 === matchDetails?.result?.team2) ||
              matchFinished ||
              (matchStarted && matchDetails?.motm.length === 0)
            }
            className=" customButton m-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClick}
          >
            {loading
              ? `${wordDb.updatingMatch} ...`
              : matchStarted
              ? `${wordDb.endMatch}`
              : `${wordDb.startMatch}`}
          </button>

          {matchStarted && (
            <MatchSheet
              team1={JSON.parse(JSON.stringify(team1))}
              team2={JSON.parse(JSON.stringify(team2))}
              matchDetails={matchDetails}
              type="score"
              wordDb={wordDb}
            />
          )}

          {matchStarted && (
            <MatchSheet
              team1={JSON.parse(JSON.stringify(team1))}
              team2={JSON.parse(JSON.stringify(team2))}
              matchDetails={matchDetails}
              type="yellow"
              wordDb={wordDb}
            />
          )}

          {matchStarted && (
            <MatchSheet
              team1={JSON.parse(JSON.stringify(team1))}
              team2={JSON.parse(JSON.stringify(team2))}
              matchDetails={matchDetails}
              type="red"
              wordDb={wordDb}
            />
          )}

          {matchStarted && (
            <MatchSheet
              team1={JSON.parse(JSON.stringify(team1))}
              team2={JSON.parse(JSON.stringify(team2))}
              matchDetails={matchDetails}
              type="motm"
              wordDb={wordDb}
            />
          )}

          <button
            disabled={
              !matchStarted ||
              matchDetails?.type === "group" ||
              matchDetails?.result?.team1 !== matchDetails?.result?.team2 ||
              tiebreakerEnd
            }
            className=" customButton disabled:opacity-50 m-2 disabled:cursor-not-allowed"
            onClick={handleTiebreaker}
          >
            {loadingTie
              ? `${wordDb.updatingMatch} ...`
              : `${wordDb.tieBreaker}`
              ? `${wordDb.endTieBreaker}`
              : `${wordDb.startTieBreaker}`}
          </button>
        </div>
      )}

      <Tiebreaker
        tiebreaker={tiebreaker}
        matchDetails={matchDetails}
        isMatchConfig={isMatchConfig}
        wordDb={wordDb}
      />
    </div>
  );
}
