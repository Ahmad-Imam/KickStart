import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
  PartyPopperIcon,
  TriangleAlertIcon,
  BadgeCheckIcon,
  BadgeXIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function OverViewTab({
  tournamentDetails,
  topScorers,
  sortedEvents,
}) {
  return (
    <>
      <Card className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Tournament Overview</CardTitle>
          <CardDescription>{tournamentDetails?.bio}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-slate-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300  ">
            <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
              <strong>Organizer:</strong> {tournamentDetails?.organizer}
            </p>
            <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
              <strong>Number of Groups:</strong> {tournamentDetails?.groupsNum}
            </p>
            <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
              <strong>Teams per Group:</strong>{" "}
              {tournamentDetails?.teamsPerGroup}
            </p>
            <p className="hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
              <strong>Teams Qualifying per Group:</strong>{" "}
              {tournamentDetails?.teamsQPerGroup}
            </p>
          </div>

          <Card className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300 my-8">
            <CardHeader>
              <CardTitle>Tournament Top Scorers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topScorers.slice(0, 5)?.map((scorer, index) => (
                  <div key={index}>
                    <li className="flex items-center justify-between p-2 hover:bg-slate-800 hover:text-white rounded">
                      <span>{scorer?.name}</span>
                      <Badge variant="secondary" className="flex items-center">
                        <TrophyIcon className="mr-1 h-4 w-4" />
                        {scorer?.score}
                      </Badge>
                    </li>
                    <Separator className="" />
                  </div>
                ))}
              </ul>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Live Updates</h2>
          {sortedEvents?.length > 0 && (
            <Card>
              <CardContent className="p-0 m-0">
                <ul className="p-0 m-0">
                  {sortedEvents?.map((event, index) => (
                    <div
                      key={index}
                      className="py-2 px-1 m-2  rounded-md border-1 hover:bg-slate-800 hover:text-white group"
                    >
                      <Link
                        href={`/tournament/${tournamentDetails.id}/match/${event.matchId}`}
                      >
                        <li className="flex items-center">
                          <Badge
                            variant="outline"
                            className="mx-2 group-hover:bg-slate-800 group-hover:text-white text-nowrap "
                          >
                            {event.time}
                          </Badge>

                          {event.type === "kickoff" ? (
                            <BadgeCheckIcon
                              size={20}
                              className="mr-2 text-blue-600 group-hover:text-blue-400"
                            />
                          ) : event.type === "goal" ? (
                            <PartyPopperIcon
                              size={20}
                              className="mr-2 text-green-600 group-hover:text-green-400"
                            />
                          ) : event.type === "yellow" ? (
                            <TriangleAlertIcon
                              size={20}
                              className="mr-2 text-yellow-600 group-hover:text-yellow-400"
                            />
                          ) : event.type === "red" ? (
                            <TriangleAlertIcon
                              size={20}
                              className="mr-2 text-red-600 group-hover:text-red-400"
                            />
                          ) : event.type === "fulltime" ? (
                            <BadgeXIcon
                              size={20}
                              className="mr-2 text-red-600 group-hover:text-red-400"
                            />
                          ) : (
                            <div></div>
                          )}

                          <span className="font-semibold mr-2 px-1">
                            {event.type.toUpperCase()}:
                          </span>
                          <span>
                            {/* {event.description || `${event.player} (${event.team})`} */}
                            {event.description}
                          </span>
                        </li>
                      </Link>
                    </div>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </>
  );
}
