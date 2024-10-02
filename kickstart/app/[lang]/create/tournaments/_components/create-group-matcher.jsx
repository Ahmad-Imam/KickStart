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
  wordDb,
}) {
  const teamsPerGroupI = parseInt(teamsPerGroup);

  const [config, setConfig] = useState({
    numberOfGroups,
    teamsPerGroupI,
    teamsQualified,
  });
  const [availableTeams, setAvailableTeams] = useState(teamsTournament);
  const [groups, setGroups] = useState(
    Array.from({ length: config.numberOfGroups }, (_, i) => ({
      name: `Group ${String.fromCharCode(65 + i)}`, // 65 is the ASCII code for 'A'
      teams: [],
    }))
  );

  useEffect(() => {
    setGroupMatch([]);
    const allFilled = groups.every(
      (group) => group.teams.length === config.teamsPerGroup
    );
    setIsAllGroupsFilled(allFilled);
  }, []);

  useEffect(() => {
    const allFilled = groups.every(
      (group) => group.teams.length === config.teamsPerGroupI
    );
    setIsAllGroupsFilled(allFilled);
  }, [groups]);

  const addTeamToGroup = (groupIndex, teamName) => {
    const selectedTeam = availableTeams.find((t) => t.name === teamName);

    if (groups[groupIndex].teams.length < config.teamsPerGroupI) {
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
      .filter((group) => group.teams.length < config.teamsPerGroupI)
      .map((group) => group.name)
      .join(", ");
  };

  return (
    <div className="container">
      <div>{`${wordDb.groups}: ${numberOfGroups}`}</div>
      <div>{`${wordDb.teamsPerGroup}: ${teamsPerGroup}`}</div>
      <h1 className="text-lg font-semibold mb-4">{wordDb.createGroup}:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group, groupIndex) => (
          <Card key={group.name} className="w-full cardFull dark:bg-slate-800">
            <CardHeader className="m-0 text-center py-1 ">
              <CardTitle className="text-lg">{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value) => addTeamToGroup(groupIndex, value)}
                disabled={group.teams.length >= config.teamsPerGroupI}
                className="m-0 p-0 "
              >
                <SelectTrigger className="dark:bg-slate-900">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent className="">
                  {availableTeams.map((team) => (
                    <SelectItem key={team?.id} value={team?.name} className="">
                      {team?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ul className="mt-4 space-y-2">
                {group.teams.map((team, teamIndex) => (
                  <li
                    key={team?.id}
                    className={`flex justify-between items-center p-2 text-sm rounded bg-gray-100 dark:bg-slate-900`}
                  >
                    {team?.name}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        removeTeamFromGroup(groupIndex, team?.name)
                      }
                      className=" p-2"
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
        <Alert
          variant="destructive"
          className="my-4 dark:bg-slate-800 font-semibold dark:text-red-500"
        >
          <AlertDescription>
            {wordDb.rememberToFill}. {wordDb.incompleteGroups}:{" "}
            {getIncompleteGroups()}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
