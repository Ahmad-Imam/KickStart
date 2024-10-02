import TournamentDetails from "@/app/[lang]/tournament/[tournamentId]/_components/tournament-details";
import { getDictionary } from "@/app/dictionary/dictionaries";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchesByTournamentId } from "@/queries/matches";
import { getAllPlayersByIds, getTopScorers } from "@/queries/players";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export async function generateMetadata({ params: { tournamentId } }) {
  await dbConnect();
  const tournament = await getTournamentById(tournamentId);
  return {
    title: `KickStart - ${tournament?.name}`,
    description: tournament?.status,
  };
}

export default async function TournamentPage({ params }) {
  const { tournamentId, lang } = params;

  const wordDb = await getDictionary(lang);
  await dbConnect();
  const tournament = await getTournamentById(tournamentId);
  const matches = await getMatchesByTournamentId(tournamentId);
  const groups = await getGroupsByTournamentId(tournamentId);

  const topScorers = await getTopScorers(tournament.scorers);

  const sortedEvents = tournament.events?.slice().sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeB - dateTimeA;
  });

  return (
    <>
      <div className="w-full px-6 py-10 min-h-screen dark:bg-slate-950">
        <TournamentDetails
          tournamentDetails={JSON.parse(JSON.stringify(tournament))}
          matchesDetails={JSON.parse(JSON.stringify(matches))}
          groupsDetails={JSON.parse(JSON.stringify(groups))}
          topScorers={JSON.parse(JSON.stringify(topScorers))}
          sortedEvents={JSON.parse(JSON.stringify(sortedEvents))}
          wordDb={wordDb}
        />
      </div>
    </>
  );
}
