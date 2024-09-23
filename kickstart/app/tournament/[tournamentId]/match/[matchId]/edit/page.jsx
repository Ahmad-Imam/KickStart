import MatchDetails from "@/app/tournament/[tournamentId]/match/[matchId]/_components/match-details";
import TournamentDetails from "@/app/tournament/[tournamentId]/_components/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchById, getMatchesByTournamentId } from "@/queries/matches";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";
import MatchEdit from "../_components/MatchEdit";

export async function generateMetadata({ params: { matchId } }) {
  await dbConnect();
  const match = await getMatchById(matchId);
  const tournament = await getTournamentById(match?.tournamentId);
  return {
    title: `${tournament?.name} - Edit ${match?.team1?.name} vs ${match?.team2?.name}`,
    description: match?.status,
  };
}

export default async function MatchEditPage({ params }) {
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
    <div className="dark:bg-slate-950 h-screen flex justify-center items-center">
      {/* <TournamentDetails
        tournamentDetails={tournament}
        matchesDetails={matches}
        groupsDetails={JSON.parse(JSON.stringify(groups))}
      /> */}

      <MatchEdit matchDetails={JSON.parse(JSON.stringify(match))} />
    </div>
  );
}
