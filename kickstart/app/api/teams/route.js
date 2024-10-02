import { getTeamById, getTeams } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await dbConnect();

    const teams = await getTeams();

    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.error(error);
  }
};
