import SearchPlayers from "@/components/Players/SearchPlayers";
import SearchTournaments from "@/components/Search/SearchTournaments";
import { getPlayers } from "@/queries/players";
import { getAllTournaments } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export default async function PlayersPage() {
  await dbConnect();
  const allTournaments = await getAllTournaments();
  console.log("tournament");

  const allPlayers = await getPlayers();
  // console.log(allPlayers[0]);

  //   console.log(allTournaments);

  return (
    <div className="dark:bg-gray-950">
      <SearchPlayers allPlayers={JSON.parse(JSON.stringify(allPlayers))} />
    </div>
  );
}
