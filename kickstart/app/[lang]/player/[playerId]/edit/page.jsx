import React from "react";
import PlayerEdit from "../_components/PlayerEdit";
import { dbConnect } from "@/service/mongo";
import { getPlayerById } from "@/queries/players";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionary/dictionaries";

export default async function PlayerEditPage({ params }) {
  const { playerId, lang } = params;
  await dbConnect();
  const wordDb = await getDictionary(lang);
  const playerDetails = await getPlayerById(playerId);

  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full min-h-screen dark:bg-slate-950 flex justify-center items-center">
      <PlayerEdit
        playerDetails={JSON.parse(JSON.stringify(playerDetails))}
        wordDb={wordDb}
      />
    </div>
  );
}
