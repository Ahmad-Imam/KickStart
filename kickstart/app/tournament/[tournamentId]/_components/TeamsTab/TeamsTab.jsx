import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TeamsTab({ tournamentDetails }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournamentDetails?.teamsTournament.map((team) => (
          <Card
            key={team?.id}
            className="my-8 cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>{team.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{team.bio}</p>
              <Link
                href={`/tournament/${tournamentDetails?.id}/team/${team.id}`}
                passHref
              >
                <div className="w-40 text-white p-2 rounded-md text-sm text-center bg-slate-800 hover:bg-black dark:hover:bg-slate-900">
                  View Team Details
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
