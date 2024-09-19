import MatchDetails from "@/app/tournament/[tournamentId]/match/[matchId]/_components/match-details";
import TeamDetails from "@/app/tournament/[tournamentId]/team/[teamId]/_components/teamsT-details";
import TournamentDetails from "@/app/tournament/[tournamentId]/_components/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchById, getMatchesByTournamentId } from "@/queries/matches";
import { getTeamsTournamentById } from "@/queries/teamsTournament";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";
import {
  getRedScorers,
  getTopScorers,
  getYellowScorers,
} from "@/queries/players";

export async function generateMetadata({ params }) {
  await dbConnect();
  const teamsTournament = await getTeamsTournamentById(
    params.teamId,
    params.tournamentId
  );
  const tournament = await getTournamentById(teamsTournament?.tournamentId);
  return {
    title: `${tournament?.name} - ${teamsTournament?.name}`,
    description: teamsTournament?.bio,
  };
}

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
  // console.log(topScorers);
  // console.log(teamsTournament);
  const yellowCards = await getYellowScorers(teamsTournament?.yellow);
  const redCards = await getRedScorers(teamsTournament?.red);
  console.log("yellow");
  console.log(teamsTournament?.yellow);
  console.log(yellowCards);
  console.log(redCards);

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
        yellowCards={JSON.parse(JSON.stringify(yellowCards))}
        redCards={JSON.parse(JSON.stringify(redCards))}
      />
    </>
  );
}
