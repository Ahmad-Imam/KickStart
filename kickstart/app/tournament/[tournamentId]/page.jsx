import TournamentDetails from "@/components/Tournament/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchesByTournamentId } from "@/queries/matches";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export default async function TournamentPage({ params }) {
  const { tournamentId } = params;
  // console.log(tournamentId);

  await dbConnect();
  const tournament = await getTournamentById(tournamentId);
  const matches = await getMatchesByTournamentId(tournamentId);
  const groups = await getGroupsByTournamentId(tournamentId);

  if (tournament) {
    // console.log("Tournament found");
    // console.log(tournament);
    // console.log(typeof groups);
    // console.log(groups);
  }

  // console.log(tournamentId);
  return (
    <>
      <div className="w-full px-6 py-10">
        <TournamentDetails
          tournamentDetails={tournament}
          matchesDetails={matches}
          groupsDetails={JSON.parse(JSON.stringify(groups))}
        />
      </div>
    </>
  );
}
