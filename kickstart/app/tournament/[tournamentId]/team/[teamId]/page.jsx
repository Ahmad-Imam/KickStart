import MatchDetails from "@/app/tournament/[tournamentId]/match/[matchId]/_components/match-details";
import TeamDetails from "@/app/tournament/[tournamentId]/team/[teamId]/_components/teamsT-details";
import TournamentDetails from "@/app/tournament/[tournamentId]/_components/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchById, getMatchesByTournamentId } from "@/queries/matches";
import { getTeamsTournamentById } from "@/queries/teamsTournament";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";
import { getTopScorers } from "@/queries/players";

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

  const teamsTournament = await getTeamsTournamentById(
    params.teamId,
    params.tournamentId
  );

  console.log(params.teamId);
  console.log(params.tournamentId);

  const topScorers = await getTopScorers(teamsTournament.scorers);
  console.log(topScorers);
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
        topScorers={JSON.parse(JSON.stringify(topScorers))}
      />
    </>
  );
}
