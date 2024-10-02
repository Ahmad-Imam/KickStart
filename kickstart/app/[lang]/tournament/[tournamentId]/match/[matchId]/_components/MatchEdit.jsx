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
import { editMatchData } from "@/app/actions";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { set } from "mongoose";
import { DateTimePicker } from "@/app/[lang]/create/tournaments/_components/date-time-picker";
import { useRouter } from "next/navigation";

export default function MatchEdit({ matchDetails, wordDb }) {
  const [matchDate, setMatchDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [location, setLocation] = useState(matchDetails?.location || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const location = formData.get("location");

    const matchData = {
      location,
      matchDate: matchDate.toString(),
    };

    const matchUpdated = await editMatchData(matchData, matchDetails);
    router.push(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
    setLoading(false);
  }

  return (
    <Card className="mx-auto max-w-lg w-full dark:bg-slate-900 cardFull ">
      <CardHeader>
        <CardTitle className="text-2xl">{wordDb.editMatch}</CardTitle>
        <CardDescription>{wordDb.enterMatchInformation}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-xl py-3">
          {matchDetails?.team1?.name} vs {""}
          {matchDetails?.team2?.name}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">{wordDb.location}</Label>
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
              <Label htmlFor="bio">{wordDb.date}</Label>
              <DateTimePicker value={matchDate} onChange={setMatchDate} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full customButton dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? `${wordDb.saving}` : `${wordDb.submit}`}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
