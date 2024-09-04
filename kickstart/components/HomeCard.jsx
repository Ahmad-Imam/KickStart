"use client";
import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

const tournamentNotifications = [
  {
    title: "Select tournament type",
    description: "Many tournament types are available",
  },
  {
    title: "Add teams and players",
    description: "Customize teams and players to your liking",
  },
  {
    title: "Update scores in the match",
    description: "Update goals, cards and other match details",
  },
];

const teamsNotifications = [
  {
    title: "Create teams",
    description: "Teams are available for all tournaments",
  },
  {
    title: "Add players",
    description: "add players from player lists or create new ones",
  },
  {
    title: "Update teams in the tournament",
    description: "Teams can be updated in the tournament",
  },
];

const playersNotifications = [
  {
    title: "Create players",
    description: "Players are available for all tournaments",
  },
  {
    title: "Add players to teams",
    description: "add players to team lists or create new ones",
  },
  {
    title: "View player stats in the team",
    description: "Player stats will be updated in the tournament",
  },
];

export default function CardDemo({ className, ...props }) {
  const { type } = props;

  const headerText =
    type === "tournament"
      ? "Tournaments"
      : type === "team"
      ? "Teams"
      : "Players";

  const notifications =
    type === "tournament"
      ? tournamentNotifications
      : type === "team"
      ? teamsNotifications
      : playersNotifications;

  console.log(type);
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Create your {headerText}</CardTitle>
        <CardDescription>
          {/* {`Create your ${headerText} by entering information`} */}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={
            type === "tournament"
              ? "/create/tournaments"
              : type === "team"
              ? "/create/teams"
              : "/create/players"
          }
          className="w-full"
        >
          <Button className="w-full">Create</Button>
          {/* <Check className="mr-2 h-4 w-4" /> */}
        </Link>
      </CardFooter>
    </Card>
  );
}
