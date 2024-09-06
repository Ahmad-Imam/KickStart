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

export default function SFMatcher({ teamsQ, setSemiMatch }) {
  console.log("sf");
  console.log(teamsQ);
  const [teams] = useState(teamsQ);

  const [matches, setMatches] = useState(() => {
    const initialMatches = teamsQ.reduce((acc, team, index) => {
      if (index % 2 === 0) {
        acc.push({
          team1: { name: team },
          team2: teamsQ[index + 1] ? { name: teamsQ[index + 1] } : null,
        });
      }
      return acc;
    }, []);
    return initialMatches;
  });

  useEffect(() => {
    setSemiMatch(() => {
      const initialMatches = teamsQ.reduce((acc, team, index) => {
        if (index % 2 === 0) {
          acc.push({
            team1: { name: team },
            team2: teamsQ[index + 1] ? { name: teamsQ[index + 1] } : null,
          });
        }
        return acc;
      }, []);
      return initialMatches;
    });
  }, []);

  const handleTeamSelect = (matchIndex, teamKey, selectedTeamName) => {
    const selectedTeam = { name: selectedTeamName };

    setMatches((prevMatches) => {
      const newMatches = [...prevMatches];
      newMatches[matchIndex] = {
        ...newMatches[matchIndex],
        [teamKey]: selectedTeam,
      };
      return newMatches;
    });

    setSemiMatch((prevMatches) => {
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
      .filter((team) => team && team.name) // Filter out null and undefined teams
      .map((team) => team.name);

    console.log("selectedTeams");
    console.log(selectedTeams);
    console.log(teams);

    const availableTeams = teams.filter(
      (team) => !selectedTeams.includes(team)
    );

    console.log("availableTeams");
    console.log(availableTeams);

    // Include the currently selected team for this slot
    const currentTeam = matches[matchIndex][teamKey];
    if (currentTeam && !availableTeams.includes(currentTeam.name)) {
      availableTeams.push(currentTeam.name);
    }

    return availableTeams;
  };

  const isAllTeamsSelected = matches.every(
    (match) => match.team1?.name && match.team2?.name
  );

  return (
    <div className="">
      <h1 className="text-xl font-bold text-center py-2">Semi Final</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match, index) => (
          <Card
            key={index}
            className="h-auto max-w-md m-0 p-0 mb-4 hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <CardHeader className="h-auto m-0 p-0 shadow-md bg-slate-50">
              <CardTitle className="text-sm text-center py-1 font-bold">
                SF{index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="m-0 py-2 max-w-sm">
              <div className="flex justify-between items-center space-x-2 py-3">
                <Select
                  value={match?.team1?.name || ""}
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
                  disabled={!match.team1?.name}
                  className="h-5 w-5"
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
                  value={match.team2?.name || ""}
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
                  className="h-5 w-5"
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
          All teams have been selected. Clear a selection.
        </p>
      )}
    </div>
  );
}
