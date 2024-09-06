import React from "react";
import {
  Bracket,
  Seed,
  SeedItem,
  SeedTeam,
  SeedTime,
  IRoundProps,
  IRenderSeedProps,
} from "react-brackets";

const rounds = [
  {
    title: "Round 1",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 1, name: "The Leons", score: 5 },
          { id: 2, name: "Kitties", score: 6 },
        ],
      },

      {
        id: 2,
        date: new Date().toDateString(),
        teams: [
          { id: 3, name: "The asds", score: 2 },
          { id: 4, name: "hreeh", score: 6 },
        ],
      },
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [
          { id: 5, name: "The otyuj", score: 2 },
          { id: 6, name: "wedg", score: 6 },
        ],
      },
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [
          { id: 7, name: "The dbb", score: 2 },
          { id: 8, name: "rtgjn", score: 6 },
        ],
      },
    ],
  },
  {
    title: "Round 2",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [
          { id: 10, name: "The qfas", score: 5 },
          { id: 20, name: "acx", score: 6 },
        ],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [
          { id: 30, name: "The sdgsdg", score: 5 },
          { id: 40, name: "Kittaxczxcies", score: 6 },
        ],
      },
    ],
  },
  {
    title: "Round 3",
    seeds: [
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [
          { id: 30, name: "The sdgsdg", score: 5 },
          { id: 40, name: "Kittaxczxcies", score: 6 },
        ],
      },
    ],
  },
];

const RenderSeed = ({ breakpoint, seed }) => {
  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem style={{ width: "100%", background: "white", color: "black" }}>
        <div>
          <SeedTeam>
            {seed.teams?.[0].name + " " + seed.teams?.[0].score ||
              "-----------"}
          </SeedTeam>
          <div style={{ height: 1, backgroundColor: "#707070" }}></div>
          <SeedTeam>
            {seed.teams?.[1]?.name + " " + seed.teams?.[1].score ||
              "-----------"}
          </SeedTeam>
        </div>
      </SeedItem>
      <SeedTime mobileBreakpoint={breakpoint} style={{ fontSize: 9 }}>
        {seed.date}
      </SeedTime>
    </Seed>
  );
};

const SingleElimination = ({ transformedRounds }) => {
  return (
    <Bracket
      //   mobileBreakpoint={767}
      rounds={transformedRounds}
      renderSeedComponent={RenderSeed}
      swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
    />
  );
};

export default SingleElimination;
