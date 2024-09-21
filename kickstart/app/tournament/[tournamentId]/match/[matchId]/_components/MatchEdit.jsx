"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTeams, addTeamsN, editMatchData } from "@/app/actions";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { set } from "mongoose";
import { DateTimePicker } from "@/app/create/tournaments/_components/date-time-picker";

export default function MatchEdit({ matchDetails }) {
  const [matchDate, setMatchDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [location, setLocation] = useState(matchDetails?.location || "");

  console.log("saved");
  // console.log(Array.isArray(savedItems));
  // console.log(savedItems);
  console.log(location);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const location = formData.get("location");

    const matchData = {
      location,
      matchDate: matchDate.toString(),
      // players: savedItems.map((item) => item.id),
    };

    console.log(matchData);

    const matchUpdated = await editMatchData(matchData, matchDetails);

    console.log("matchUpdated");
    // Call the API to create the team
    // console.log(teamData);
  }

  return (
    <Card className="mx-auto max-w-lg w-full dark:bg-slate-900 cardFull border-2 border-slate-200 dark:border-slate-800  hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your teams</CardTitle>
        <CardDescription>Enter your team information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Field 1"
                required
                className="dark:bg-slate-800"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Date</Label>
              <DateTimePicker value={matchDate} onChange={setMatchDate} />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
