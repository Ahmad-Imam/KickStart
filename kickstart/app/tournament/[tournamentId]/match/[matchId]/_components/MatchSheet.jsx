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
import { addGoalToMatch, addCardToMatch } from "@/app/actions";

export default function MatchSheet({ team1, team2, matchDetails, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const teams = [team1, team2];
  console.log(teams);

  const handleSubmit = async () => {
    if (selectedTeam && selectedPlayer) {
      const selectedPlayerObject = selectedTeam.players.find(
        (player) => player.name === selectedPlayer
      );

      const notSelectedTeam = teams.find(
        (team) => team.name !== selectedTeam.name
      );

      console.log("Selected Team:", selectedTeam);
      console.log("Selected Player:", selectedPlayerObject);
      console.log("Not Selected Team:", notSelectedTeam);

      setIsLoading(true);

      if (type === "score") {
        await addGoalToMatch(
          selectedTeam,
          notSelectedTeam,
          selectedPlayerObject,
          matchDetails
        );
      } else if (type === "yellow") {
        console.log("inside yellow card");
        await addCardToMatch(
          selectedTeam,
          selectedPlayerObject,
          matchDetails,
          type
        );
      } else if (type === "red") {
        await addCardToMatch(
          selectedTeam,
          selectedPlayerObject,
          matchDetails,
          type
        );
      }

      console.log("Goal added successfully");

      setIsOpen(false);
      setSelectedTeam(null);
      setSelectedPlayer(null);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (isLoading) {
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //       setIsOpen(false);
  //     }, 2000); // Wait for 2 seconds before closing

  //     return () => clearTimeout(timer);
  //   }
  // }, [isLoading]);

  const handleButtonClick = () => {
    setIsLoading(true);
  };

  // Combining the two teams into an array for easier mapping

  return (
    <div>
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        className="dark:bg-slate-900"
      >
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className=" bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-900"
          >
            {type === "score"
              ? "Add Goal"
              : type === "yellow"
              ? "Add Yellow"
              : "Add Red"}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="sm:max-w-[425px] mx-auto bg-white dark:bg-slate-900"
        >
          <SheetHeader className="mb-6 dark:bg-slate-900">
            <SheetTitle className="text-3xl font-bold">
              {type === "score"
                ? "Add Score"
                : type === "yellow"
                ? "Add Yellow Card"
                : "Add Red Card"}
            </SheetTitle>
            <SheetDescription className="text-lg text-gray-600 dark:text-slate-400">
              Choose the team and player.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-xl font-semibold text-gray-800 dark:text-slate-200">
                Select a Team
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
                  Select a Player
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
                  <SelectContent>
                    {selectedTeam.players.map((player) => (
                      <SelectItem
                        key={player?.name}
                        value={player.name}
                        className="text-lg  dark:bg-slate-900"
                      >
                        {player.name}
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
              {isLoading ? "Updating match ..." : "Confirm changes"}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
