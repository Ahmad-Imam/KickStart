import React from "react";
import PlayerDetails from "./_components/PlayerDetails";
import { getPlayerById } from "@/queries/players";
import { dbConnect } from "@/service/mongo";

export async function generateMetadata({ params: { playerId } }) {
  await dbConnect();
  const playerDetails = await getPlayerById(playerId);
  return {
    title: `KickStart - ${playerDetails?.name}`,
    description: `${playerDetails?.name} details`,
  };
}

export default async function PlayerPage({ params }) {
  const { playerId } = params;

  await dbConnect();
  const playerDetails = await getPlayerById(playerId);

  // console.log(playerDetails);
  // console.log(playerDetails);

  return (
    <div className="dark:bg-slate-950">
      <PlayerDetails
        playerDetails={JSON.parse(JSON.stringify(playerDetails))}
      />
    </div>
  );
}
