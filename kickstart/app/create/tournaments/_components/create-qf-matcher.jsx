"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

export default function SFMatcher({ teamsQ }) {
  const [teams] = useState(teamsQ);

  const [matches, setMatches] = useState([
    { team1: null, team2: null },
    { team1: null, team2: null },
    { team1: null, team2: null },
    { team1: null, team2: null },
  ]);

  const handleTeamSelect = (matchIndex, teamKey, selectedTeam) => {
    setMatches((prevMatches) => {
      const newMatches = [...prevMatches];
      newMatches[matchIndex] = {
        ...newMatches[matchIndex],
        [teamKey]: selectedTeam,
      };
      return newMatches;
    });
  };

  const getAvailableTeams = (matchIndex, teamKey) => {
    const selectedTeams = matches
      .flatMap((match) => [match.team1, match.team2])
      .filter(Boolean);
    const availableTeams = teams.filter(
      (team) => !selectedTeams.includes(team)
    );

    // Include the currently selected team for this slot
    const currentTeam = matches[matchIndex][teamKey];
    if (currentTeam && !availableTeams.includes(currentTeam)) {
      availableTeams.push(currentTeam);
    }

    return availableTeams;
  };

  const isAllTeamsSelected = matches.every(
    (match) => match.team1 && match.team2
  );

  return (
    <div className="">
      <h1 className="text-xl font-bold text-center py-2">Quarter Final</h1>
      {matches.map((match, index) => (
        <Card
          key={index}
          className="h-auto max-w-md m-0 p-0 mb-4 hover:shadow-lg hover:scale-105 transition-transform duration-200"
        >
          <CardHeader className="h-auto m-0 p-0 shadow-md bg-slate-50">
            <CardTitle className="text-sm text-center py-1 font-bold">
              QF{index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center m-0 py-2 max-w-sm">
            <div className="flex justify-between items-center space-x-2">
              <Select
                value={match.team1 || ""}
                onValueChange={(value) =>
                  handleTeamSelect(index, "team1", value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select Team 1" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTeams(index, "team1").map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleTeamSelect(index, "team1", null)}
                disabled={!match.team1}
                className="h-3 w-3 md:h-5 md:w-5"
              >
                <X />
                <span className="sr-only">Clear selection</span>
              </Button>
            </div>
            <div className="flex justify-center px-1">
              {/* <span className="text-sm md:text-md font-bold">vs</span> */}
            </div>
            <div className="flex justify-between items-center space-x-2">
              <Select
                value={match.team2 || ""}
                onValueChange={(value) =>
                  handleTeamSelect(index, "team2", value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select Team 2" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTeams(index, "team2").map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleTeamSelect(index, "team2", null)}
                disabled={!match.team2}
                className="h-3 w-3 md:h-5 md:w-5"
              >
                <X className="" />
                <span className="sr-only">Clear selection</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {isAllTeamsSelected && (
        <p className="text-center text-sm text-muted-foreground">
          All teams have been selected. Clear a selection.
        </p>
      )}
    </div>
  );
}
