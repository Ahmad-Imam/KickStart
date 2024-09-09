import React, { useEffect, useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function GroupMatcher({
  numberOfGroups,
  teamsPerGroup,
  teamsQualified,
  isAllGroupsFilled,
  setIsAllGroupsFilled,
  setGroupMatch,
  teamsTournament,
}) {
  const [config, setConfig] = useState({
    numberOfGroups,
    teamsPerGroup,
    teamsQualified,
  });
  // console.log(config.numberOfGroups);
  const [availableTeams, setAvailableTeams] = useState(teamsTournament);

  const [groups, setGroups] = useState(
    Array.from({ length: config.numberOfGroups }, (_, i) => ({
      name: `Group ${String.fromCharCode(65 + i)}`, // 65 is the ASCII code for 'A'
      teams: [],
    }))
  );

  // console.log("groups");
  // console.log(teamsTournament);
  // console.log(groups);

  useEffect(() => {
    setGroupMatch([]);
    const allFilled = groups.every(
      (group) => group.teams.length === config.teamsPerGroup
    );
    setIsAllGroupsFilled(allFilled);
  }, []);

  useEffect(() => {
    const allFilled = groups.every(
      (group) => group.teams.length === config.teamsPerGroup
    );
    // console.log("allFilled");
    // console.log(allFilled);
    setIsAllGroupsFilled(allFilled);
  }, [groups, config.teamsPerGroup]);

  const addTeamToGroup = (groupIndex, teamName) => {
    // console.log("team");
    // console.log(teamName);
    const selectedTeam = availableTeams.find((t) => t.name === teamName);
    // console.log("selectedTeam");
    // console.log(selectedTeam);
    if (groups[groupIndex].teams.length < config.teamsPerGroup) {
      setGroups(
        groups.map((group, i) =>
          i === groupIndex
            ? { ...group, teams: [...group.teams, selectedTeam] }
            : group
        )
      );
      setGroupMatch(
        groups.map((group, i) =>
          i === groupIndex
            ? { ...group, teams: [...group.teams, selectedTeam] }
            : group
        )
      );
      setAvailableTeams(availableTeams.filter((t) => t.name !== teamName));
    }
  };

  const removeTeamFromGroup = (groupIndex, teamName) => {
    const selectedTeam = teamsTournament.find((t) => t.name === teamName);
    // console.log("selectedTeamremvoe");
    // console.log(selectedTeam);

    setGroups(
      groups.map((group, i) =>
        i === groupIndex
          ? { ...group, teams: group.teams.filter((t) => t.name !== teamName) }
          : group
      )
    );
    setGroupMatch(
      groups.map((group, i) =>
        i === groupIndex
          ? { ...group, teams: group.teams.filter((t) => t.name !== teamName) }
          : group
      )
    );

    setAvailableTeams([...availableTeams, selectedTeam]);
  };

  const getIncompleteGroups = () => {
    return groups
      .filter((group) => group.teams.length < config.teamsPerGroup)
      .map((group) => group.name)
      .join(", ");
  };

  return (
    <div className="container">
      <div>{`Groups: ${numberOfGroups}`}</div>
      <div>{`Teams in a group: ${teamsPerGroup}`}</div>
      <h1 className="text-lg font-semibold mb-4">Create Group:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {groups.map((group, groupIndex) => (
          <Card key={group.name} className="w-full">
            <CardHeader className="m-0 text-center py-1 ">
              <CardTitle className="text-lg">{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value) => addTeamToGroup(groupIndex, value)}
                disabled={group.teams.length >= config.teamsPerGroup}
                className="m-0 p-0"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeams.map((team) => (
                    <SelectItem key={team?.id} value={team?.name}>
                      {team?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ul className="mt-4 space-y-2">
                {group.teams.map((team, teamIndex) => (
                  <li
                    key={team?.id}
                    className={`flex justify-between items-center p-2 text-sm rounded ${
                      teamIndex < config.teamsQualified
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {team?.name}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        removeTeamFromGroup(groupIndex, team?.name)
                      }
                      className="h-3 w-3 md:h-5 md:w-5"
                    >
                      <X className="" />
                      <span className="sr-only">Clear selection</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      {!isAllGroupsFilled && (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>
            Please fill all groups before proceeding. Incomplete groups:{" "}
            {getIncompleteGroups()}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
