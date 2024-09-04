import { getTeamById, getTeams } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    // const { id } = await req.json();

    await dbConnect();

    const teams = await getTeams();
    console.log(teams);
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.error(error);
  }
};
