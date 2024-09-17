"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Trophy, CheckCircle2, XCircle } from "lucide-react";
import { editTiebreaker } from "@/app/actions";

export default function Tiebreaker({ matchDetails }) {
  const [match, setMatch] = useState({
    id: "1",
    teamA: {
      id: "A",
      name: "Team A",
      players: [
        { id: "A1", name: "Player A1", goals: 0 },
        { id: "A2", name: "Player A2", goals: 0 },
      ],
    },
    teamB: {
      id: "B",
      name: "Team B",
      players: [
        { id: "B1", name: "Player B1", goals: 0 },
        { id: "B2", name: "Player B2", goals: 0 },
      ],
    },
    tiebreaker: null,
  });

  const totalGoals = (team) =>
    team.players.reduce((sum, player) => sum + player.goals, 0);

  const initializeTiebreaker = () => {
    setMatch((prev) => ({
      ...prev,
      tiebreaker: {
        teamA: Array(10).fill("pending"),
        teamB: Array(10).fill("pending"),
      },
    }));
  };

  const updateTiebreakerAttempt = (teamId, index, result) => {
    setMatch((prev) => ({
      ...prev,
      tiebreaker: {
        ...prev.tiebreaker,
        [teamId === "A" ? "teamA" : "teamB"]: prev.tiebreaker[
          teamId === "A" ? "teamA" : "teamB"
        ].map((attempt, i) => (i === index ? result : attempt)),
      },
    }));
  };

  const renderTiebreakerAttempts = (attempts) => {
    return attempts.map((attempt, index) => (
      <div
        key={index}
        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center"
      >
        {attempt === "scored" && (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        )}
        {attempt === "missed" && <XCircle className="w-6 h-6 text-red-500" />}
      </div>
    ));
  };

  async function handleClick(teamId, index, result) {
    console.log("clicked");
    console.log(teamId);
    console.log(index);
    console.log(result);
    const newTiebreaker = await editTiebreaker(
      matchDetails,
      teamId,
      index,
      result
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 mb-6">
        {match.tiebreaker && (
          <div className="text-center text-sm text-muted-foreground mb-4">
            Tiebreaker in progress
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={initializeTiebreaker}>
                <Trophy className="mr-2 h-4 w-4" />
                Tiebreaker
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tiebreaker</DialogTitle>
              </DialogHeader>
              {match.tiebreaker && (
                <div className="mt-4">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">{match.teamA.name}</h3>
                    <div className="flex space-x-2">
                      {renderTiebreakerAttempts(match.tiebreaker.teamA)}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleClick(
                            "A",
                            match.tiebreaker.teamA.findIndex(
                              (a) => a === "pending"
                            ),
                            "scored"
                          )
                        }
                      >
                        Score
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleClick(
                            "A",
                            match.tiebreaker.teamA.findIndex(
                              (a) => a === "pending"
                            ),
                            "missed"
                          )
                        }
                      >
                        Miss
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{match.teamB.name}</h3>
                    <div className="flex space-x-2">
                      {renderTiebreakerAttempts(match.tiebreaker.teamB)}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleClick(
                            "B",
                            match.tiebreaker.teamB.findIndex(
                              (a) => a === "pending"
                            ),
                            "scored"
                          )
                        }
                      >
                        Score
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleClick(
                            "B",
                            match.tiebreaker.teamB.findIndex(
                              (a) => a === "pending"
                            ),
                            "missed"
                          )
                        }
                      >
                        Miss
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="sm:max-w-[425px]">
        <div>
          <div>Tiebreaker</div>
        </div>
        {matchDetails.tiebreaker && (
          <div className="text-center text-sm text-muted-foreground mb-4">
            Tiebreaker in progress
          </div>
        )}
        {matchDetails.tiebreaker && (
          <div className="mt-4">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">{match.teamA.name}</h3>
              <div className="flex space-x-2">
                {renderTiebreakerAttempts(matchDetails?.tiebreaker?.teamA)}
              </div>
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  onClick={() =>
                    handleClick(
                      "A",
                      matchDetails?.tiebreaker?.teamA.findIndex(
                        (a) => a === "pending"
                      ),
                      "scored"
                    )
                  }
                >
                  Score
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleClick(
                      "A",
                      matchDetails?.tiebreaker?.teamA.findIndex(
                        (a) => a === "pending"
                      ),
                      "missed"
                    )
                  }
                >
                  Miss
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{match.teamB.name}</h3>
              <div className="flex space-x-2">
                {renderTiebreakerAttempts(matchDetails?.tiebreaker?.teamB)}
              </div>
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  onClick={() =>
                    handleClick(
                      "B",
                      matchDetails?.tiebreaker?.teamB.findIndex(
                        (a) => a === "pending"
                      ),
                      "scored"
                    )
                  }
                >
                  Score
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleClick(
                      "B",
                      matchDetails?.tiebreaker?.teamB.findIndex(
                        (a) => a === "pending"
                      ),
                      "missed"
                    )
                  }
                >
                  Miss
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
