import SearchTournaments from "@/components/Search/SearchTournaments";
import { getAllTournaments } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export async function generateMetadata() {
  return {
    title: `KickStart - Tournaments`,
    description: `All tournaments`,
  };
}

export default async function TournamentsPage() {
  await dbConnect();
  const allTournaments = await getAllTournaments();
  console.log("tournament");
  //   console.log(allTournaments);

  return (
    <div className="dark:bg-slate-950 w-full min-h-screen flex flex-row justify-center ">
      <SearchTournaments
        allTournaments={JSON.parse(JSON.stringify(allTournaments))}
      />
    </div>
  );
}
