import { getPlayers } from "@/queries/players";
import { getTeamInfo } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await dbConnect();

    const players = await getPlayers();
    console.log(players);
    return NextResponse.json(players);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
};
