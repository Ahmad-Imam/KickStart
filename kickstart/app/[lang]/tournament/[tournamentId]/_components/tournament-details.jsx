import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CalendarIcon, MapPinIcon } from "lucide-react";
import TournamentTabsClient from "./TournamentTabsClient";
import Status from "./Status";
import TournamentModerators from "./TournamentModerators";
import { auth } from "@/auth";
import { getAllUsers, getUserByEmail, getUserByIds } from "@/queries/users";

// import MatchTab from "@/app/tournament/[tournamentId]/_components/MatchTab/MatchTab";
// import OverViewTab from "@/app/tournament/[tournamentId]/_components/OverviewTab/OverviewTab";
// import TeamsTab from "@/app/tournament/[tournamentId]/_components/TeamsTab/TeamsTab";
// import GroupsTab from "@/app/tournament/[tournamentId]/_components/GroupsTab/GroupsTab";
// import TournamentTabs from "./TournamentTabs";

//groupmatch - groups  table - teams -  info from teamsTournament table
//matches - matches table

export default async function TournamentDetails({
  tournamentDetails,
  matchesDetails,
  groupsDetails,
  topScorers,
  sortedEvents,
  wordDb,
}) {
  // console.log("group");

  // console.log(matchesDetails);

  let moderatorsList = [];
  let isAdmin = false;
  let allUsersList = [];
  const session = await auth();
  console.log(session);

  if (session?.user) {
    const currentUser = await getUserByEmail(session?.user?.email);

    isAdmin = currentUser?.admin.includes(tournamentDetails?.id.toString());

    const allUsers = await getAllUsers();

    if (isAdmin) {
      allUsersList = allUsers.filter((user) => user?.id !== currentUser?.id);
    } else {
      allUsersList = allUsers;
    }

    console.log("isAdmin");
    console.log(isAdmin);
    // console.log(allUsersList[0]);
    moderatorsList = await getUserByIds(tournamentDetails?.moderators);
    console.log("current user");
    // console.log(currentUser);
  }

  // console.log(session);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">{tournamentDetails?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Status tournamentDetails={tournamentDetails} wordDb={wordDb} />
        <Card className=" dark:bg-slate-900 my-8 cardFull ">
          <CardHeader>
            <CardTitle>{wordDb.date}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <CalendarIcon className="mr-2" />
            <span>
              {new Date(tournamentDetails?.startDate).toLocaleDateString()} -{" "}
              {new Date(tournamentDetails?.endDate).toLocaleDateString()}
            </span>
          </CardContent>
        </Card>
        <Card className=" dark:bg-slate-900 my-8 cardFull ">
          <CardHeader>
            <CardTitle>{wordDb.location}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{tournamentDetails?.location}</span>
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <TournamentModerators
          moderatorsList={moderatorsList}
          allUsersList={allUsersList}
          tournamentDetails={tournamentDetails}
          wordDb={wordDb}
        />
      )}

      <TournamentTabsClient
        tournamentDetails={tournamentDetails}
        matchesDetails={matchesDetails}
        groupsDetails={groupsDetails}
        topScorers={topScorers}
        sortedEvents={sortedEvents}
        wordDb={wordDb}
      />
    </div>
  );
}
