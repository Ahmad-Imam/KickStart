"use client";

import { useEffect, useState } from "react";
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

export default function SFMatcher({ teamsQ, setQuarterMatch, wordDb }) {
  const [teams] = useState(teamsQ);

  const [matches, setMatches] = useState(() => {
    const initialMatches = teamsQ.reduce((acc, team, index) => {
      if (index % 2 === 0) {
        acc.push({
          team1: { qName: team },
          team2: teamsQ[index + 1] ? { qName: teamsQ[index + 1] } : null,
        });
      }
      return acc;
    }, []);
    return initialMatches;
  });

  useEffect(() => {
    setQuarterMatch(() => {
      const initialMatches = teamsQ.reduce((acc, team, index) => {
        if (index % 2 === 0) {
          acc.push({
            team1: { qName: team },
            team2: teamsQ[index + 1] ? { qName: teamsQ[index + 1] } : null,
          });
        }
        return acc;
      }, []);
      return initialMatches;
    });
  }, []);

  const handleTeamSelect = (matchIndex, teamKey, selectedTeamName) => {
    const selectedTeam = { qName: selectedTeamName };

    setMatches((prevMatches) => {
      const newMatches = [...prevMatches];
      newMatches[matchIndex] = {
        ...newMatches[matchIndex],
        [teamKey]: selectedTeam,
      };
      return newMatches;
    });

    setQuarterMatch((prevMatches) => {
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
      .filter((team) => team && team.qName) // Filter out null and undefined teams
      .map((team) => team.qName);

    const availableTeams = teams.filter(
      (team) => !selectedTeams.includes(team)
    );

    // Include the currently selected team for this slot
    const currentTeam = matches[matchIndex][teamKey];
    if (currentTeam && !availableTeams.includes(currentTeam.qName)) {
      availableTeams.push(currentTeam.qName);
    }

    return availableTeams;
  };

  const isAllTeamsSelected = matches.every(
    (match) => match.team1?.qName && match.team2?.qName
  );

  return (
    <div className="">
      <h1 className="text-xl font-bold text-center py-2">
        {wordDb.quarterFinals}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {matches.map((match, index) => (
          <Card
            key={index}
            className="h-auto max-w-md m-0 p-0 mb-4 hover:shadow-lg hover:scale-105 transition-transform duration-200 dark:bg-slate-800"
          >
            <CardHeader className="h-auto m-0 p-0 shadow-md bg-slate-50 dark:bg-slate-900">
              <CardTitle className="text-sm text-center py-1 font-bold">
                QF{index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="m-0 py-2 max-w-sm">
              <div className="flex justify-between items-center space-x-2 py-3">
                <Select
                  value={match?.team1?.qName || ""}
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
                  disabled={!match.team1?.qName}
                  className="h-5 w-5"
                  type="button"
                >
                  <X />
                  <span className="sr-only">Clear selection</span>
                </Button>
              </div>
              <div className="flex justify-center px-1">
                {/* <span className="text-sm md:text-md font-bold">vs</span> */}
              </div>
              <div className="flex justify-between items-center space-x-2 pb-2">
                <Select
                  value={match.team2?.qName || ""}
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
                  disabled={!match.team2?.qName}
                  className="h-5 w-5"
                  type="button"
                >
                  <X className="" />
                  <span className="sr-only">Clear selection</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {isAllTeamsSelected && (
        <p className="text-center text-sm text-muted-foreground">
          {wordDb.allTeamsSelected}
        </p>
      )}
    </div>
  );
}
