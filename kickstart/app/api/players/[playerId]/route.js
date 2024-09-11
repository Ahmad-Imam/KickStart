import { getPlayers } from "@/queries/players";
import { getTeamInfo } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    console.log("api");
    // await dbConnect();

    //get the id of the player from the request url

    // const { params } = context;

    console.log(params);
    const { playerId } = params;

    console.log(playerId.toString());

    // const playerId = req.query.playerId;
    // console.log(playerId);
    // console.log

    // const players = await getPlayers();
    // console.log(players);
    return NextResponse.json({ message: "Hello World" + playerId });
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
