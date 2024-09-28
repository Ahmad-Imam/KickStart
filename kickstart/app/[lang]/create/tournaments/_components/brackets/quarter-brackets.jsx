import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const BracketMatch = ({ match, matchNumber }) => (
  <Card className="mb-4 w-64">
    <CardContent className="p-4">
      <div className="text-xs font-semibold text-muted-foreground mb-2">
        Quarterfinal {matchNumber}
      </div>
      <div className="text-sm font-semibold">{match.team1}</div>
      <div className="text-sm font-semibold mt-2 pb-2 border-b">
        {match.team2}
      </div>
      <div className="text-xs font-semibold text-muted-foreground mt-2">
        Winner to Semifinal {Math.ceil(matchNumber / 2)}
      </div>
    </CardContent>
  </Card>
);

const BracketConnector = () => (
  <div className="h-16 w-8 border-r border-b"></div>
);

export function QuarterfinalsBracket({ matches }) {
  if (matches.length !== 4) {
    return (
      <div className="text-red-500">
        Error: Quarterfinals require exactly 4 matches
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Quarterfinals Bracket</h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col mr-8 mb-8 md:mb-0">
          <BracketMatch match={matches[0]} matchNumber={1} />
          <BracketConnector />
          <BracketMatch match={matches[1]} matchNumber={2} />
        </div>
        <div className="flex flex-col mr-8 md:mt-20">
          <BracketMatch match={matches[2]} matchNumber={3} />
          <BracketConnector />
          <BracketMatch match={matches[3]} matchNumber={4} />
        </div>
      </div>
    </div>
  );
}
