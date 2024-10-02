"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addGoalToMatch, addCardToMatch, addMOTMToMatch } from "@/app/actions";
import { RectangleVerticalIcon } from "lucide-react";

export default function MatchSheet({
  team1,
  team2,
  matchDetails,
  type,
  wordDb,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const teams = [team1, team2];

  const handleSubmit = async () => {
    if (selectedTeam && selectedPlayer) {
      const selectedPlayerObject = selectedTeam.players.find(
        (player) => player.name === selectedPlayer
      );

      const notSelectedTeam = teams.find(
        (team) => team.name !== selectedTeam.name
      );

      setIsLoading(true);

      if (type === "score") {
        await addGoalToMatch(
          selectedTeam,
          notSelectedTeam,
          selectedPlayerObject,
          matchDetails
        );
      } else if (type === "yellow") {
        await addCardToMatch(
          selectedTeam,
          selectedPlayerObject,
          matchDetails,
          type
        );

        if (
          selectedTeam.yellow.some(
            (yellow) => yellow.playerId === selectedPlayerObject.id
          )
        ) {
          await addCardToMatch(
            selectedTeam,
            selectedPlayerObject,
            matchDetails,
            "red"
          );
        }
      } else if (type === "red") {
        await addCardToMatch(
          selectedTeam,
          selectedPlayerObject,
          matchDetails,
          type
        );
      } else if (type === "motm") {
        await addMOTMToMatch(selectedTeam, selectedPlayerObject, matchDetails);
      }

      setIsOpen(false);
      setSelectedTeam(null);
      setSelectedPlayer(null);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        className="dark:bg-slate-900 "
      >
        <SheetTrigger asChild>
          <button
            variant="outline"
            className=" disabled:opacity-50 customButton"
            disabled={matchDetails?.motm.length !== 0}
          >
            {type === "score"
              ? `${wordDb.addGoal}`
              : type === "yellow"
              ? `${wordDb.addYellowCard}`
              : type === "red"
              ? `${wordDb.addRedCard}`
              : `${wordDb.addMOTM}`}
          </button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="sm:max-w-[425px] mx-auto bg-white dark:bg-slate-900 rounded-md border-2 border-slate-400"
        >
          <SheetHeader className="mb-6 dark:bg-slate-900">
            <SheetTitle
              className="text-3xl font-bold "
              style={{
                color:
                  type === "yellow"
                    ? "rgb(245 158 11 / var(--tw-bg-opacity))"
                    : type === "red"
                    ? "red"
                    : "default",
              }}
            >
              {type === "score"
                ? "Add Score"
                : type === "yellow"
                ? "Add Yellow Card"
                : type === "red"
                ? "Add Red Card"
                : "Add Man of the match"}
            </SheetTitle>
            <SheetDescription className="text-lg text-gray-600 dark:text-slate-400">
              {wordDb.chooseTeamPlayer}
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-xl font-semibold text-gray-800 dark:text-slate-200">
                {wordDb.selectTeam}
              </Label>
              <RadioGroup
                onValueChange={(value) => {
                  const team = teams.find((team) => team.name === value);
                  setSelectedTeam(team);
                  setSelectedPlayer(null);
                }}
                value={selectedTeam?.name || undefined}
                className="grid grid-cols-2 gap-4 "
              >
                {teams.map((team) => (
                  <Label
                    key={team?.name}
                    className={`flex items-center justify-center p-4 rounded-lg transition-all dark:bg-slate-800 ${
                      selectedTeam?.name === team.name
                        ? "bg-slate-800 text-white shadow-lg dark:bg-slate-600 dark:border-slate-200 border-2"
                        : "bg-white border-2 border-gray-200 hover:border-slate-800 dark:hover:border-slate-600"
                    }`}
                  >
                    <RadioGroupItem
                      value={team.name}
                      id={team.name}
                      className="sr-only"
                    />
                    <span className="text-lg font-medium text-center">
                      {team.name}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {selectedTeam && (
              <div className="space-y-4">
                <Label
                  htmlFor="player-select"
                  className="text-xl font-semibold text-gray-800 dark:text-slate-400"
                >
                  {wordDb.selectPlayer}
                </Label>
                <Select
                  value={selectedPlayer || undefined}
                  onValueChange={setSelectedPlayer}
                >
                  <SelectTrigger
                    id="player-select"
                    className="w-full bg-white border-2 border-gray-200 dark:bg-slate-800"
                  >
                    <SelectValue placeholder="Choose a player" className="" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-950">
                    {selectedTeam.players.map((player) => (
                      <SelectItem
                        key={player?.name}
                        value={player.name}
                        disabled={
                          type !== "motm" &&
                          selectedTeam.red.some(
                            (red) => red.playerId === player.id
                          )
                        }
                        className="text-lg  dark:bg-slate-900 my-1"
                      >
                        <div className="flex">
                          <div>{player.name}</div>
                          {selectedTeam.yellow.some(
                            (yellow) => yellow.playerId === player.id
                          ) && (
                            <div className=" text-amber-600">
                              <RectangleVerticalIcon />
                            </div>
                          )}
                          {selectedTeam.red.some(
                            (red) => red.playerId === player.id
                          ) && (
                            <div className=" text-red-600">
                              <RectangleVerticalIcon />
                            </div>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* <Button
            onClick={handleButtonClick}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Closing..." : "Close After Delay"}
          </Button> */}
            <button
              onClick={handleSubmit}
              disabled={!selectedTeam || !selectedPlayer || isLoading}
              className="customButton w-full text-lg dark:hover:bg-slate-950 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? `${wordDb.updatingMatch}`
                : `${wordDb.confirmChanges}`}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
