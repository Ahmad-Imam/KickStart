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

export default function MatchSheet({ team1, team2 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (selectedTeam && selectedPlayer) {
      const selectedPlayerObject = selectedTeam.players.find(
        (player) => player.name === selectedPlayer
      );

      console.log("Selected Team:", selectedTeam);
      console.log("Selected Player:", selectedPlayerObject);
      setIsOpen(false);
      setSelectedTeam(null);
      setSelectedPlayer(null);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 2000); // Wait for 2 seconds before closing

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleButtonClick = () => {
    setIsLoading(true);
  };

  // Combining the two teams into an array for easier mapping
  const teams = [team1, team2];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600"
        >
          Select Team & Player
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="sm:max-w-[425px] mx-auto bg-gradient-to-b from-gray-50 to-white"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Team & Player Selection
          </SheetTitle>
          <SheetDescription className="text-lg text-gray-600">
            Choose your favorite team and player.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-xl font-semibold text-gray-800">
              Select a Team
            </Label>
            <RadioGroup
              onValueChange={(value) => {
                const team = teams.find((team) => team.name === value);
                setSelectedTeam(team);
                setSelectedPlayer(null);
              }}
              value={selectedTeam?.name || undefined}
              className="grid grid-cols-2 gap-4"
            >
              {teams.map((team) => (
                <Label
                  key={team.name}
                  className={`flex items-center justify-center p-4 rounded-lg transition-all ${
                    selectedTeam?.name === team.name
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-white border-2 border-gray-200 hover:border-blue-300"
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
                className="text-xl font-semibold text-gray-800"
              >
                Select a Player
              </Label>
              <Select
                value={selectedPlayer || undefined}
                onValueChange={setSelectedPlayer}
              >
                <SelectTrigger
                  id="player-select"
                  className="w-full bg-white border-2 border-gray-200 hover:border-blue-300"
                >
                  <SelectValue placeholder="Choose a player" />
                </SelectTrigger>
                <SelectContent>
                  {selectedTeam.players.map((player) => (
                    <SelectItem
                      key={player.id}
                      value={player.name}
                      className="text-lg"
                    >
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button
            onClick={handleButtonClick}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Closing..." : "Close After Delay"}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedTeam || !selectedPlayer}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg py-6 rounded-lg transition-all hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Selection
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
