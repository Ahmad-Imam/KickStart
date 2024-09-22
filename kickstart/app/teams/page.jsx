import React from "react";
import SearchTeams from "./_components/SearchTeams";
import { getTeams } from "@/queries/teams";
import { dbConnect } from "@/service/mongo";

export default async function TeamsPage() {
  await dbConnect();

  const allTeams = await getTeams();

  return (
    <div className="dark:bg-slate-950">
      <SearchTeams allTeams={JSON.parse(JSON.stringify(allTeams))} />
    </div>
  );
}
