import { getTeamById } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import React from "react";
import TeamDetails from "./_components/TeamDetails";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata({ params: { teamId } }) {
  await dbConnect();
  const teamDetails = await getTeamById(teamId);
  return {
    title: `KickStart - ${teamDetails?.name}`,
    description: `${teamDetails?.name} details`,
  };
}

export default async function TeamPage({ params }) {
  const { teamId, lang } = params;

  await dbConnect();

  const wordDb = await getDictionary(lang);

  const teamDetails = await getTeamById(teamId);

  return (
    <div className="dark:bg-slate-950 min-h-screen flex flex-col justify-center ">
      <TeamDetails
        team={JSON.parse(JSON.stringify(teamDetails))}
        wordDb={wordDb}
      />
    </div>
  );
}
