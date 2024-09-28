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

export default function Tiebreaker({
  matchDetails,
  tiebreaker,
  isMatchConfig,
  wordDb,
}) {
  const [tieDrawer, setTieDrawer] = useState(false);

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
    <div className="container mx-auto w-auto flex flex-col items-center justify-center my-4">
      <div className="flex justify-center space-x-4">
        {isMatchConfig && tiebreaker && (
          <Dialog open={tieDrawer} onOpenChange={setTieDrawer}>
            <DialogTrigger asChild>
              <Button variant="outline" className="dark:bg-slate-800">
                <Trophy className="mr-2 h-4 w-4" />
                {wordDb?.tiebreaker}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle> {wordDb?.tiebreaker}</DialogTitle>
              </DialogHeader>
              {matchDetails.tiebreaker && (
                <div className="mt-4">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">
                      {matchDetails?.team1?.name}
                    </h3>
                    <div className="flex space-x-2">
                      {renderTiebreakerAttempts(matchDetails.tiebreaker.teamA)}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleClick(
                            "A",
                            matchDetails.tiebreaker.teamA.findIndex(
                              (a) => a === "pending"
                            ),
                            "scored"
                          )
                        }
                      >
                        {wordDb?.score}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleClick(
                            "A",
                            matchDetails.tiebreaker.teamA.findIndex(
                              (a) => a === "pending"
                            ),
                            "missed"
                          )
                        }
                      >
                        {wordDb?.miss}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      {matchDetails?.team2?.name}
                    </h3>
                    <div className="flex space-x-2">
                      {renderTiebreakerAttempts(matchDetails.tiebreaker.teamB)}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleClick(
                            "B",
                            matchDetails.tiebreaker.teamB.findIndex(
                              (a) => a === "pending"
                            ),
                            "scored"
                          )
                        }
                      >
                        {wordDb?.score}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleClick(
                            "B",
                            matchDetails.tiebreaker.teamB.findIndex(
                              (a) => a === "pending"
                            ),
                            "missed"
                          )
                        }
                      >
                        {wordDb?.miss}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
      {matchDetails.tiebreaker && (
        <div className="sm:max-w-[425px] py-4">
          <div>
            <div className="font-semibold">
              {wordDb.tieBreakerLiveUpdates}:{" "}
            </div>
          </div>
          {/* {matchDetails.tiebreaker && (
          <div className="text-center text-sm text-muted-foreground mb-4">
            Tiebreaker in progress
          </div>
        )} */}

          {matchDetails?.tiebreaker && (
            <div className="mt-4">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  {matchDetails?.team1?.name}
                </h3>
                <div className="flex space-x-2">
                  {renderTiebreakerAttempts(matchDetails?.tiebreaker?.teamA)}
                </div>
                <div className="flex space-x-2 mt-2"></div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  {matchDetails?.team2?.name}
                </h3>
                <div className="flex space-x-2">
                  {renderTiebreakerAttempts(matchDetails?.tiebreaker?.teamB)}
                </div>
                <div className="flex space-x-2 mt-2"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
