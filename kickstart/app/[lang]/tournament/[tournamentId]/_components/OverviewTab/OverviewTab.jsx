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
  wordDb,
}) {
  if (typeof window !== "undefined") {
    console.log("Rendering OverViewTab on the client");
  } else {
    console.log("Rendering OverViewTab on the server");
  }

  return (
    <>
      <Card className="dark:bg-slate-900 my-8 cardFull ">
        <CardHeader>
          <CardTitle className="">{wordDb.tournamentOverview}</CardTitle>
          <CardDescription>{tournamentDetails?.bio}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="dark:bg-slate-950  cardFull p-6 rounded-lg  ">
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

          <Card className="dark:bg-slate-950  my-8 cardFull ">
            <CardHeader>
              <CardTitle>{wordDb.tournamentTopScorers}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topScorers?.length === 0 ? (
                  <li className="flex items-center justify-between p-2 hover:bg-slate-800 hover:text-white rounded">
                    {wordDb.noScorers}
                  </li>
                ) : (
                  topScorers.slice(0, 5)?.map((scorer, index) => (
                    <div key={index}>
                      <li className="flex items-center justify-between p-2 hover:bg-slate-800 hover:text-white rounded">
                        <span>{scorer?.name}</span>
                        <Badge
                          variant="secondary"
                          className="flex items-center"
                        >
                          <TrophyIcon className="mr-1 h-4 w-4" />
                          {scorer?.score}
                        </Badge>
                      </li>
                      <Separator className="" />
                    </div>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-950 my-8 cardFull ">
            <CardHeader>
              <CardTitle>{wordDb.liveUpdates}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 m-0">
              {sortedEvents?.length > 0 ? (
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
                            className="mr-2 group-hover:bg-slate-800 group-hover:text-white text-nowrap text-xs md:text-md"
                          >
                            {event.time}
                          </Badge>

                          {event.type === "kickoff" ? (
                            <BadgeCheckIcon
                              size={20}
                              className="mr-2 dark:text-blue-400 text-blue-600 group-hover:text-blue-400"
                            />
                          ) : event.type === "goal" ? (
                            <PartyPopperIcon
                              size={20}
                              className="mr-2 dark:text-green-400 text-green-600 group-hover:text-green-400"
                            />
                          ) : event.type === "yellow" ? (
                            <TriangleAlertIcon
                              size={20}
                              className="mr-2 dark:text-yellow-400 text-yellow-600 group-hover:text-yellow-400"
                            />
                          ) : event.type === "red" ? (
                            <TriangleAlertIcon
                              size={20}
                              className="mr-2 dark:text-red-400 text-red-600 group-hover:text-red-400"
                            />
                          ) : event.type === "fulltime" ? (
                            <BadgeXIcon
                              size={20}
                              className="mr-2 text-red-600 group-hover:text-red-400"
                            />
                          ) : event.type === "motm" ? (
                            <PartyPopperIcon
                              size={20}
                              className="mr-2 dark:text-green-400 text-green-600 group-hover:text-green-400"
                            />
                          ) : (
                            <div></div>
                          )}
                          <span className="font-semibold mr-2 text-xs md:text-sm lg:text-md">
                            {event.type.toUpperCase()}:
                          </span>
                          <span className="mx-2 text-xs md:text-sm lg:text-md">
                            {/* {event.description || `${event.player} (${event.team})`} */}
                            {event.description}
                          </span>
                        </li>
                      </Link>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </ul>
              ) : (
                <div className="text-center p-4">
                  <p className="">{wordDb.noEvents}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}
