"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarRangeIcon, MapPinIcon, UserIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { truncateLongString } from "@/utils/data-util";

export default function SearchTeams({ allTeams }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTeams = allTeams.filter((team) => {
    const nameMatch = team.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return nameMatch;
  });

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-6 ">
        <Input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  dark:bg-slate-900"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.map((team) => (
              <Link key={team.id} href={`/team/${team.id}`}>
                <Card className="dark:bg-slate-900 flex flex-col cardFull ">
                  <CardHeader>
                    <CardTitle>{truncateLongString(team.name, 10)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2">
                      <div className="flex items-center  ">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {team.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {filteredTeams.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
