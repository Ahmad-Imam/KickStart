import React from "react";
import TournamentBracket from "./brackets/tournament-brackets";
import SingleElimination from "./brackets/tournament-brackets";

export default function TournamentPreview({
  groupMatch,
  teamsTournament,
  quarterMatch,
  semiMatch,
  thirdSwitch,
  formData,
}) {
  const matches = [
    { team1: "A1", team2: "B2" },
    { team1: "C1", team2: "D2" },
    { team1: "E1", team2: "F2" },
    { team1: "G1", team2: "H2" },
  ];

  const transformData = (data) => {
    const rounds = [];
    const roundSize = 4; // Assuming each round has 4 matches

    // Generate the first round
    const firstRoundMatches = data.map((match, index) => ({
      id: index + 1,
      date: new Date().toDateString(),
      teams: [
        { id: index * 2 + 1, name: match.team1.name, score: 0 },
        { id: index * 2 + 2, name: match.team2.name, score: 0 },
      ],
    }));

    if (data.length === 4) {
      rounds.push({
        title: `Quarter Final`,
        seeds: firstRoundMatches,
      });
    } else {
      rounds.push({
        title: `Semi Final`,
        seeds: firstRoundMatches,
      });
    }
    // Generate subsequent rounds
    let currentRound = firstRoundMatches;
    let roundNumber = 2;

    while (currentRound.length > 1) {
      const nextRoundMatches = [];

      for (let i = 0; i < currentRound.length; i += 2) {
        const winner1 = currentRound[i].teams[0]; // Assume team1 is the winner
        const winner2 = currentRound[i + 1]?.teams[0]; // Assume team1 is the winner

        if (winner2) {
          nextRoundMatches.push({
            id: i / 2 + 1,
            date: new Date().toDateString(),
            teams: [
              { id: winner1.id, name: winner1.name, score: 0 },
              { id: winner2.id, name: winner2.name, score: 0 },
            ],
          });
        }
      }

      if (data.length === 4 && roundNumber === 2) {
        rounds.push({
          title: `Semi Final`,
          seeds: nextRoundMatches,
        });
      } else {
        rounds.push({
          title: `Final`,
          seeds: nextRoundMatches,
        });
      }
      currentRound = nextRoundMatches;
      roundNumber++;
    }

    return rounds;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tournament Preview</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Tournament Settings</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Start Date:</strong> {formData.startDate}
          </p>
          <p>
            <strong>Location:</strong> {formData.location}
          </p>
          {/* Add more settings as needed */}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Teams</h2>
        <ul className="bg-gray-100 p-4 rounded flex flex-row flex-wrap gap-2 justify-around ">
          {teamsTournament.map((team, index) => (
            <li
              key={index}
              className="bg-white p-2 rounded shadow hover:bg-black hover:text-white  transition duration-300 ease-in-out"
            >
              {team.name}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Groups</h2>
        <div className="flex flex-wrap gap-4 justify-around items-center">
          {groupMatch.map((group, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded mb-4 w-1/3 hover:
                
                shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
            "
            >
              <h3 className="text-lg font-semibold pb-2">{group.name}</h3>
              <ul>
                {group.teams.map((team, teamIndex) => (
                  <li className="py-1" key={teamIndex}>
                    {team.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {/* <div className="h-screen">
        <SingleElimination transformedRounds={transformedRounds} />
      </div> */}
      {/* <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Quarter-Final Matches</h2>
        {quarterMatch.map((match, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded mb-4">
            <p>
              <strong>Match {index + 1}:</strong> {match.team1?.name} vs{" "}
              {match.team2?.name}
            </p>
          </div>
        ))}
      </section> */}
      <div className="text-xl font-semibold py-2 pb-10">Knockout Stage: </div>
      {quarterMatch.length !== 0 && semiMatch.length === 0 && (
        <div className="py-6">
          <SingleElimination transformedRounds={transformData(quarterMatch)} />
          <div className=" text-center font-medium">
            Sample bracket for Knockout Stage
          </div>
        </div>
      )}
      {quarterMatch.length === 0 && semiMatch.length > 0 && (
        <div className="py-6">
          <SingleElimination transformedRounds={transformData(semiMatch)} />
          <div className=" text-center font-medium">
            Sample bracket for Knockout Stage
          </div>
        </div>
      )}

      <section className="mb-8 w-20">
        <h2 className="text-xl font-semibold mb-2">Third Place</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>{thirdSwitch ? "Yes" : "No"}</p>
        </div>
      </section>
    </div>
  );
}
