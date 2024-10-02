import React from "react";
import PlayerDetails from "./_components/PlayerDetails";
import { getPlayerById } from "@/queries/players";
import { dbConnect } from "@/service/mongo";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata({ params: { playerId } }) {
  await dbConnect();
  const playerDetails = await getPlayerById(playerId);
  return {
    title: `KickStart - ${playerDetails?.name}`,
    description: `${playerDetails?.name} details`,
  };
}

export default async function PlayerPage({ params }) {
  const { playerId, lang } = params;

  await dbConnect();

  const wordDb = await getDictionary(lang);

  const playerDetails = await getPlayerById(playerId);

  return (
    <div className="dark:bg-slate-950">
      <PlayerDetails
        playerDetails={JSON.parse(JSON.stringify(playerDetails))}
        wordDb={wordDb}
      />
    </div>
  );
}
