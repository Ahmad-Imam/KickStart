import TournamentDetails from "@/app/tournament/[tournamentId]/_components/tournament-details";
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
  const { tournamentId } = params;
  // console.log(tournamentId);

  await dbConnect();
  const tournament = await getTournamentById(tournamentId);
  const matches = await getMatchesByTournamentId(tournamentId);
  const groups = await getGroupsByTournamentId(tournamentId);

  const topScorers = await getTopScorers(tournament.scorers);
  console.log("topScorers");
  // console.log(topScorers);

  const sortedEvents = tournament.events?.slice().sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeB - dateTimeA;
  });

  // console.log(new Date(tournament.events[0].time));
  // console.log("Sorted Events:", sortedEvents[0]);
  // console.log("Sorted Events:", tournament.events[0].time);
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();

  // console.log("Current Time:", new Date(`${currentDate} ${currentTime}`));
  // console.log(sortedEvents[0]);

  // Use sortedEvents in your component
  // console.log(tournamentId);
  return (
    <>
      <div className="w-full px-6 py-10 h-full">
        <TournamentDetails
          tournamentDetails={JSON.parse(JSON.stringify(tournament))}
          matchesDetails={JSON.parse(JSON.stringify(matches))}
          groupsDetails={JSON.parse(JSON.stringify(groups))}
          topScorers={JSON.parse(JSON.stringify(topScorers))}
          sortedEvents={JSON.parse(JSON.stringify(sortedEvents))}
        />
      </div>
    </>
  );
}
