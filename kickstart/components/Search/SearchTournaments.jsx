"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CalendarRangeIcon,
  MapPinIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";

import Link from "next/link";
import { removeTournament } from "@/app/actions";
import { useAuth } from "@/app/[lang]/hooks/useAuth";

export default function SearchTournaments({ allTournaments, wordDb }) {
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

  async function handleDelete(e, tournamentId) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete button clicked");

    await removeTournament(tournamentId);
    console.log("removed");
  }

  const { loggedUser } = useAuth();

  return (
    <div className="container pt-6">
      <div className="mb-6 ">
        <Input
          type="text"
          placeholder={`${wordDb.searchTournaments}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  dark:bg-slate-900 "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="cardFull dark:bg-slate-900">
            <CardHeader>
              <CardTitle>{wordDb.tournamentStatus}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">{wordDb.all}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upcoming" id="upcoming" />
                  <Label htmlFor="upcoming">{wordDb.upcoming}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="live" id="live" />
                  <Label htmlFor="live">{wordDb.live}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="finished" id="finished" />
                  <Label htmlFor="finished">{wordDb.finished}</Label>
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
                    <CardTitle className="flex justify-between">
                      <div>{tournament.name}</div>
                      {loggedUser?.superAdmin && (
                        <button
                          onClick={(e) => {
                            handleDelete(e, tournament.id);
                          }}
                          className="hover:bg-slate-400"
                        >
                          <Trash2Icon className="w-5 h-5" />
                        </button>
                      )}
                    </CardTitle>
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
            <p className="text-center mt-4">No tournaments found</p>
          )}
        </div>
      </div>
    </div>
  );
}
