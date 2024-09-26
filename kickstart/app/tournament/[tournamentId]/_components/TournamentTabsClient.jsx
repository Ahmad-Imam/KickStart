"use client";

import { TabsContent } from "@/components/ui/tabs";
import MatchTab from "@/app/tournament/[tournamentId]/_components/MatchTab/MatchTab";
import OverViewTab from "@/app/tournament/[tournamentId]/_components/OverviewTab/OverviewTab";
import TeamsTab from "@/app/tournament/[tournamentId]/_components/TeamsTab/TeamsTab";
import GroupsTab from "@/app/tournament/[tournamentId]/_components/GroupsTab/GroupsTab";
import TournamentTabs from "./TournamentTabs";

export default function TournamentTabsClient({
  tournamentDetails,
  matchesDetails,
  groupsDetails,
  topScorers,
  sortedEvents,
}) {
  return (
    <TournamentTabs>
      <TabsContent value="overview" className="py-4">
        <OverViewTab
          tournamentDetails={tournamentDetails}
          topScorers={topScorers}
          sortedEvents={sortedEvents}
        />
      </TabsContent>

      <TabsContent value="teams" className="py-4">
        <TeamsTab tournamentDetails={tournamentDetails} />
      </TabsContent>

      <TabsContent value="matches" className="py-4">
        <MatchTab
          matchesDetails={matchesDetails}
          tournamentDetails={tournamentDetails}
        />
      </TabsContent>

      <TabsContent value="groups" className="py-4">
        <GroupsTab
          groupsDetails={groupsDetails}
          tournamentDetails={tournamentDetails}
        />
      </TabsContent>
    </TournamentTabs>
  );
}
