import MatchDetails from "@/app/[lang]/tournament/[tournamentId]/match/[matchId]/_components/match-details";
import TeamsTDetails from "@/app/[lang]/tournament/[tournamentId]/team/[teamId]/_components/TeamsTDetails";
import TournamentDetails from "@/app/[lang]/tournament/[tournamentId]/_components/tournament-details";
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
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { getDictionary } from "@/app/dictionary/dictionaries";

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
  await dbConnect();

  const wordDb = await getDictionary(params.lang);

  const teamsTournament = await getTeamsTournamentById(
    params.teamId,
    params.tournamentId
  );

  const tournament = await getTournamentById(teamsTournament?.tournamentId);

  const topScorers = await getTopScorers(teamsTournament.scorers);
  const yellowCards = await getYellowScorers(teamsTournament?.yellow);
  const redCards = await getRedScorers(teamsTournament?.red);

  let isAdmin = false;
  const session = await auth();

  if (session?.user) {
    const currentUser = await getUserByEmail(session?.user?.email);

    isAdmin = currentUser?.admin.includes(params.tournamentId.toString());
  }

  return (
    <div className="dark:bg-slate-950 min-h-screen w-full">
      <TeamsTDetails
        teamsTournament={JSON.parse(JSON.stringify(teamsTournament))}
        topScorers={JSON.parse(JSON.stringify(topScorers))}
        yellowCards={JSON.parse(JSON.stringify(yellowCards))}
        redCards={JSON.parse(JSON.stringify(redCards))}
        isAdmin={isAdmin}
        tournamentDetails={tournament}
        wordDb={wordDb}
      />
    </div>
  );
}
