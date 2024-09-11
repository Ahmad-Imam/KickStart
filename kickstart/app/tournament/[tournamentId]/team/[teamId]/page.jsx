import MatchDetails from "@/components/Tournament/match-details";
import TeamDetails from "@/app/tournament/[tournamentId]/team/[teamId]/_components/teamsT-details";
import TournamentDetails from "@/components/Tournament/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchById, getMatchesByTournamentId } from "@/queries/matches";
import { getTeamsTournamentById } from "@/queries/teamsTournament";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export default async function TeamsTPage({ params }) {
  // const { tournamentId } = params;
  console.log(params);

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

  // const match = await getMatchById(params.matchId);
  // console.log(match);

  // console.log(tournamentId);

  const teamsTournament = await getTeamsTournamentById(params.teamId);
  // console.log(teamsTournament);

  return (
    <>
      {/* <TournamentDetails
        tournamentDetails={tournament}
        matchesDetails={matches}
        groupsDetails={JSON.parse(JSON.stringify(groups))}
      /> */}

      <TeamDetails
        teamsTournament={JSON.parse(JSON.stringify(teamsTournament))}
      />
    </>
  );
}
