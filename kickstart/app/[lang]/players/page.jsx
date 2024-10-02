import { getDictionary } from "@/app/dictionary/dictionaries";
import SearchPlayers from "./_components/SearchPlayers";
import { getPlayers } from "@/queries/players";
import { getAllTournaments } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export async function generateMetadata() {
  return {
    title: `KickStart - Players`,
    description: `All players`,
  };
}

export default async function PlayersPage({ params: { lang } }) {
  await dbConnect();
  const wordDb = await getDictionary(lang);
  const allTournaments = await getAllTournaments();
  const allPlayers = await getPlayers();

  return (
    <div className="dark:bg-slate-950">
      <SearchPlayers
        allPlayers={JSON.parse(JSON.stringify(allPlayers))}
        wordDb={wordDb}
      />
    </div>
  );
}
