import MatchDetails from "@/app/[lang]/tournament/[tournamentId]/match/[matchId]/_components/match-details";
import TournamentDetails from "@/app/[lang]/tournament/[tournamentId]/_components/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchById, getMatchesByTournamentId } from "@/queries/matches";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata({ params: { matchId } }) {
  await dbConnect();
  const match = await getMatchById(matchId);
  const tournament = await getTournamentById(match?.tournamentId);
  return {
    title: `${tournament?.name} - ${match?.team1?.name} vs ${match?.team2?.name}`,
    description: match?.status,
  };
}

export default async function MatchPage({ params }) {
  await dbConnect();
  const wordDb = await getDictionary(params.lang);

  const match = await getMatchById(params.matchId);

  const sortedEvents = match.events?.slice().sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeB - dateTimeA;
  });
  const tournament = await getTournamentById(match.tournamentId);

  let isAdmin = false;
  let isModerator = false;
  const session = await auth();

  if (session?.user) {
    const currentUser = await getUserByEmail(session?.user?.email);

    isAdmin = currentUser?.admin?.includes(params.tournamentId.toString());
    isModerator = tournament?.moderators?.includes(currentUser?.id);
  }

  const isMatchConfig = isAdmin || isModerator;

  return (
    <div className="dark:bg-slate-950 min-h-screen w-full">
      <MatchDetails
        matchDetails={JSON.parse(JSON.stringify(match))}
        sortedEvents={sortedEvents}
        isAdmin={isAdmin}
        isMatchConfig={isMatchConfig}
        tournamentStatus={tournament?.status}
        wordDb={wordDb}
      />
    </div>
  );
}
