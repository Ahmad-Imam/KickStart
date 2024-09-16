import MatchDetails from "@/components/Tournament/match-details";
import TournamentDetails from "@/components/Tournament/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchById, getMatchesByTournamentId } from "@/queries/matches";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export default async function MatchPage({ params }) {
  // const { tournamentId } = params;
  // console.log(params);

  await dbConnect();
  // const tournament = await getTournamentById(tournamentId);
  // const matches = await getMatchesByTournamentId(tournamentId);
  // const groups = await getGroupsByTournamentId(tournamentId);

  // if (tournament) {
  //   console.log("Tournament found");
  //   // console.log(tournament);
  //   console.log(typeof groups);
  //   console.log(groups);
  // }

  const match = await getMatchById(params.matchId);
  console.log("match");
  // console.log(match);

  // console.log(tournamentId);
  return (
    <>
      {/* <TournamentDetails
        tournamentDetails={tournament}
        matchesDetails={matches}
        groupsDetails={JSON.parse(JSON.stringify(groups))}
      /> */}

      <MatchDetails matchDetails={JSON.parse(JSON.stringify(match))} />
    </>
  );
}
