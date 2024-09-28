import React from "react";
import SearchTeams from "./_components/SearchTeams";
import { getTeams } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata({}) {
  return {
    title: `KickStart - Teams`,
    description: "All teams",
  };
}

export default async function TeamsPage({ params: { lang } }) {
  await dbConnect();

  const wordDb = await getDictionary(lang);
  const allTeams = await getTeams();

  return (
    <div className="dark:bg-slate-950">
      <SearchTeams
        allTeams={JSON.parse(JSON.stringify(allTeams))}
        wordDb={wordDb}
      />
    </div>
  );
}
