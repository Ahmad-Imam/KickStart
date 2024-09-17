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
            key={team.id}
            className="border-2 border-slate-200 hover:shadow-lg transition-shadow duration-300"
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
                <Button className="bg-slate-800 hover:bg-black">
                  View Team Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
