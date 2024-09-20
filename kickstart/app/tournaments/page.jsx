import SearchTournament from "@/components/Search/SearchTournament";
import { getAllTournaments } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";

export default async function TournamentsPage() {
  await dbConnect();
  const allTournaments = await getAllTournaments();
  console.log("tournament");
  //   console.log(allTournaments);

  return (
    <div className="dark:bg-gray-950">
      <SearchTournament
        allTournaments={JSON.parse(JSON.stringify(allTournaments))}
      />
    </div>
  );
}
