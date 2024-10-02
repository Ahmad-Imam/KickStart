import { getPlayers } from "@/queries/players";
import { getTeamInfo } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { playerId } = params;

    return NextResponse.json({ message: "Hello World" + playerId });
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
