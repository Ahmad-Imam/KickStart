import TournamentDetails from "@/components/Tournament/tournament-details";
import React from "react";

export default function TournamentPage({ params }) {
  const { tournamentId } = params;

  console.log(tournamentId);
  return (
    <>
      <TournamentDetails />
    </>
  );
}
