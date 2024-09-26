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

// import MatchTab from "@/app/tournament/[tournamentId]/_components/MatchTab/MatchTab";
// import OverViewTab from "@/app/tournament/[tournamentId]/_components/OverviewTab/OverviewTab";
// import TeamsTab from "@/app/tournament/[tournamentId]/_components/TeamsTab/TeamsTab";
// import GroupsTab from "@/app/tournament/[tournamentId]/_components/GroupsTab/GroupsTab";
// import TournamentTabs from "./TournamentTabs";

//groupmatch - groups  table - teams -  info from teamsTournament table
//matches - matches table

export default function TournamentDetails({
  tournamentDetails,
  matchesDetails,
  groupsDetails,
  topScorers,
  sortedEvents,
}) {
  // console.log("group");

  // console.log(matchesDetails);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">{tournamentDetails?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Status tournamentDetails={tournamentDetails} />
        <Card className=" dark:bg-slate-900 my-8 cardFull ">
          <CardHeader>
            <CardTitle>Date</CardTitle>
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
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <MapPinIcon className="mr-2" />
            <span>{tournamentDetails?.location}</span>
          </CardContent>
        </Card>
      </div>

      <TournamentTabsClient
        tournamentDetails={tournamentDetails}
        matchesDetails={matchesDetails}
        groupsDetails={groupsDetails}
        topScorers={topScorers}
        sortedEvents={sortedEvents}
      />
    </div>
  );
}
