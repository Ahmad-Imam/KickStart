"use client";
import { DateTimePicker } from "@/app/create/tournaments/_components/date-time-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

export default function MatchDate({ matchDetails }) {
  const [editButton, setEditButton] = useState(false);

  const [startDate, setStartDate] = useState(new Date(matchDetails?.matchDate));

  async function handleClick(e) {
    e.preventDefault();
    setEditButton(!editButton);
  }

  return (
    <div>
      <Card className="dark:bg-slate-900 cardFull ">
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl flex flex-row justify-between items-center">
            <div>Date</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-max">
          <div className="flex items-center">
            <CalendarIcon className="mr-2" />
            <span>{new Date(matchDetails?.matchDate).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
