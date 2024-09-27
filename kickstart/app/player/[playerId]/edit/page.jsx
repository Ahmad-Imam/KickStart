import React from "react";
import PlayerEdit from "../_components/PlayerEdit";
import { dbConnect } from "@/service/mongo";
import { getPlayerById } from "@/queries/players";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PlayerEditPage({ params }) {
  const { playerId } = params;
  await dbConnect();

  const playerDetails = await getPlayerById(playerId);
  //   console.log(playerDetails);

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full min-h-screen dark:bg-slate-950 flex justify-center items-center">
      <PlayerEdit playerDetails={JSON.parse(JSON.stringify(playerDetails))} />
    </div>
  );
}
