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

export default async function TournamentDetails({
  tournamentDetails,
  matchesDetails,
  groupsDetails,
  topScorers,
  sortedEvents,
  wordDb,
}) {
  let moderatorsList = [];
  let isAdmin = false;
  let allUsersList = [];
  const session = await auth();

  if (session?.user) {
    const currentUser = await getUserByEmail(session?.user?.email);

    isAdmin = currentUser?.admin.includes(tournamentDetails?.id.toString());

    const allUsers = await getAllUsers();

    if (isAdmin) {
      allUsersList = allUsers.filter((user) => user?.id !== currentUser?.id);
    } else {
      allUsersList = allUsers;
    }

    moderatorsList = await getUserByIds(tournamentDetails?.moderators);
  }

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
