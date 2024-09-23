import { getTeamById } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import React from "react";
import TeamDetails from "./_components/TeamDetails";

export async function generateMetadata({ params: { teamId } }) {
  await dbConnect();
  const teamDetails = await getTeamById(teamId);
  return {
    title: `KickStart - ${teamDetails?.name}`,
    description: `${teamDetails?.name} details`,
  };
}

export default async function TeamPage({ params }) {
  const { teamId } = params;
  await dbConnect();
  console.log("here");
  const teamDetails = await getTeamById(teamId);
  console.log("done");
  console.log(teamDetails);
  return (
    <div className="dark:bg-slate-950 min-h-screen flex flex-col justify-center ">
      <TeamDetails team={JSON.parse(JSON.stringify(teamDetails))} />
    </div>
  );
}
