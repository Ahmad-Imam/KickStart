import React from "react";
import PlayerEdit from "../_components/PlayerEdit";
import { dbConnect } from "@/service/mongo";
import { getPlayerById } from "@/queries/players";

export default async function PlayerEditPage({ params }) {
  const { playerId } = params;
  await dbConnect();

  const playerDetails = await getPlayerById(playerId);
  //   console.log(playerDetails);

  return (
    <div className="w-full min-h-screen dark:bg-slate-950 flex justify-center items-center">
      <PlayerEdit playerDetails={JSON.parse(JSON.stringify(playerDetails))} />
    </div>
  );
}
