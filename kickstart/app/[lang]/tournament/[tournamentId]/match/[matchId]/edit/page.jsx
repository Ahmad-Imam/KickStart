import MatchDetails from "@/app/[lang]/tournament/[tournamentId]/match/[matchId]/_components/match-details";
import TournamentDetails from "@/app/[lang]/tournament/[tournamentId]/_components/tournament-details";
import { getGroupsByTournamentId } from "@/queries/groups";
import { getMatchById, getMatchesByTournamentId } from "@/queries/matches";
import { getTournamentById } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import React from "react";
import MatchEdit from "../_components/MatchEdit";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionary/dictionaries";

export async function generateMetadata({ params: { matchId } }) {
  await dbConnect();
  const match = await getMatchById(matchId);
  const tournament = await getTournamentById(match?.tournamentId);
  return {
    title: `${tournament?.name} - Edit ${match?.team1?.name} vs ${match?.team2?.name}`,
    description: match?.status,
  };
}

export default async function MatchEditPage({ params }) {
  await dbConnect();

  const wordDb = await getDictionary(params.lang);

  const match = await getMatchById(params.matchId);
  console.log("match");

  let isAdmin = false;
  const session = await auth();
  console.log(session);

  if (session?.user) {
    const currentUser = await getUserByEmail(session?.user?.email);

    isAdmin = currentUser?.admin?.includes(params.tournamentId.toString());

    if (!isAdmin) {
      redirect(`/tournament/${params.tournamentId}/match/${params.matchId}`);
    }
  }

  return (
    <div className="dark:bg-slate-950 min-h-screen flex justify-center items-center">
      {/* <TournamentDetails
        tournamentDetails={tournament}
        matchesDetails={matches}
        groupsDetails={JSON.parse(JSON.stringify(groups))}
      /> */}

      <MatchEdit
        matchDetails={JSON.parse(JSON.stringify(match))}
        wordDb={wordDb}
      />
    </div>
  );
}
