"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarRangeIcon, MapPinIcon, UserIcon } from "lucide-react";

import Link from "next/link";

// Sample data
const tournaments = [
  { id: 1, name: "John Doe", tournament: "Chess Masters", status: "upcoming" },
  {
    id: 2,
    name: "Jane Smith",
    tournament: "Poker Championship",
    status: "live",
  },
  { id: 3, name: "Bob Johnson", tournament: "Tennis Open", status: "finished" },
  {
    id: 4,
    name: "Alice Brown",
    tournament: "Golf Classic",
    status: "upcoming",
  },
  {
    id: 5,
    name: "Charlie Davis",
    tournament: "Basketball Tournament",
    status: "live",
  },
  {
    id: 6,
    name: "Eva Wilson",
    tournament: "Swimming Championship",
    status: "finished",
  },
  { id: 7, name: "Frank Miller", tournament: "Soccer Cup", status: "upcoming" },
  { id: 8, name: "Grace Lee", tournament: "Badminton Masters", status: "live" },
  {
    id: 9,
    name: "Henry Taylor",
    tournament: "Table Tennis Open",
    status: "finished",
  },
  {
    id: 10,
    name: "Ivy Clark",
    tournament: "Volleyball League",
    status: "upcoming",
  },
];

export default function SearchTournaments({ allTournaments }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTournaments = allTournaments.filter((tournament) => {
    const nameMatch = tournament.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "all" || tournament.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="container pt-6">
      <div className="mb-6 ">
        <Input
          type="text"
          placeholder="Search names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  dark:bg-slate-900 "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="cardFull dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Tournament Status</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upcoming" id="upcoming" />
                  <Label htmlFor="upcoming">Upcoming</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="live" />
                  <Label htmlFor="live">Live</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="finished" id="finished" />
                  <Label htmlFor="finished">Finished</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTournaments.map((tournament) => (
              <Link key={tournament.id} href={`/tournament/${tournament.id}`}>
                <Card className="flex flex-col cardFull  dark:bg-slate-900">
                  <CardHeader>
                    <CardTitle>{tournament.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {tournament.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarRangeIcon className="w-4 h-4 mr-2" />
                        {new Date(
                          tournament?.startDate
                        ).toLocaleDateString()}{" "}
                        {" - "}
                        {new Date(tournament?.endDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <UserIcon className="w-4 h-4 mr-2" />
                        {tournament.organizer}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span
                        className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          tournament.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : tournament.status === "live"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tournament.status.charAt(0).toUpperCase() +
                          tournament.status.slice(1)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {filteredTournaments.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
