import React from "react";
import TournamentBracket from "./brackets/tournament-brackets";
import SingleElimination from "./brackets/tournament-brackets";
import { Badge } from "@/components/ui/badge";

export default function TournamentPreview({
  groupMatch,
  teamsTournament,
  quarterMatch,
  semiMatch,
  thirdSwitch,
  formData,
  startDate,
  endDate,
  wordDb,
}) {
  const transformData = (data) => {
    const rounds = [];
    const roundSize = 4; // Assuming each round has 4 matches

    // Generate the first round
    const firstRoundMatches = data.map((match, index) => ({
      id: index + 1,
      date: new Date().toDateString(),
      teams: [
        { id: index * 2 + 1, name: match.team1.qName, score: 0 },
        { id: index * 2 + 2, name: match.team2.qName, score: 0 },
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
        const winner1 = currentRound[i].teams[1]; // Assume team1 is the winner
        const winner2 = currentRound[i + 1]?.teams[1]; // Assume team1 is the winner

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

  const formatDate = (date) => {
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Manually format the timezone offset
    const timezoneOffset = -date.getTimezoneOffset() / 60;
    const timezoneString = `GMT${
      timezoneOffset >= 0 ? "+" : ""
    }${timezoneOffset}`;

    // Replace the default timezone name with the custom formatted timezone string
    return formattedDate.replace(/GMT[+-]\d{1,2}/, timezoneString);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{wordDb.tournamentPreview}</h1>

      <section
        className="mb-8 mt-10 p-6 bg-white rounded-lg cardFull dark:bg-slate-950"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 4px 0 6px -1px rgba(0, 0, 0, 0.1), -4px 0 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-xl font-semibold py-2 mb-4 ">
          {wordDb.tournamentSettings}
        </h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md dark:bg-slate-900">
          <p className="mb-2 dark:hover:bg-slate-500 hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
            <strong className="">{wordDb.name}:</strong>{" "}
            <span className="">{formData.name}</span>
          </p>

          <p className="mb-2 dark:hover:bg-slate-500 hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
            <strong className="">{wordDb.description}:</strong>{" "}
            <span className="">{formData.bio}</span>
          </p>
          <p className="mb-2 dark:hover:bg-slate-500 hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
            <strong className="">{wordDb.location}:</strong>{" "}
            <span className="">{formData.location}</span>
          </p>
          <p className="mb-2 dark:hover:bg-slate-500 hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
            <strong className="">{wordDb.organizer}:</strong>{" "}
            <span className="">{formData.organizer}</span>
          </p>
          <p className="mb-2 dark:hover:bg-slate-500 hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
            <strong className="">{wordDb.startDate}:</strong>{" "}
            <span className="">{formatDate(startDate)}</span>
          </p>
          <p className="mb-2 dark:hover:bg-slate-500 hover:bg-slate-800 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out p-2">
            <strong className="">{wordDb.endDate}:</strong>{" "}
            <span className="">{formatDate(endDate)}</span>
          </p>

          {/* Add more settings as needed */}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{wordDb.teams}</h2>
        <ul className="bg-gray-100 p-4 rounded flex flex-row flex-wrap gap-2 justify-around dark:bg-slate-900 ">
          {teamsTournament.map((team, index) => (
            <li
              key={index}
              className="bg-white dark:bg-slate-800 dark:hover:bg-slate-600 p-2 mb-2 rounded shadow hover:bg-slate-800 hover:text-white  transition duration-300 ease-in-out"
            >
              {team.name}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{wordDb.groups}</h2>
        <div className="flex flex-wrap gap-4 justify-around items-center">
          {groupMatch.map((group, index) => (
            <div
              key={index}
              className=" bg-gray-100 dark:bg-slate-950 p-4 rounded mb-4 w-1/3 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <h3 className=" pl-2 text-lg font-semibold pb-2">{group.name}</h3>
              <ul>
                {group.teams.map((team, teamIndex) => (
                  <li
                    className="py-2 pl-2 hover:bg-slate-600 dark:hover:bg-slate-600 dark:bg-slate-800 bg-slate-200 my-2 rounded-sm cursor-pointer hover:text-white transition duration-300 ease-in-out"
                    key={teamIndex}
                  >
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
      <div className="text-xl font-semibold py-2 pb-10">
        {wordDb.knockout}:{" "}
      </div>
      {quarterMatch.length !== 0 && semiMatch.length === 0 && (
        <div className="py-6">
          <SingleElimination transformedRounds={transformData(quarterMatch)} />
          <div className=" text-center font-medium">{wordDb.sampleBracket}</div>
        </div>
      )}
      {quarterMatch.length === 0 && semiMatch.length > 0 && (
        <div className="py-6">
          <SingleElimination transformedRounds={transformData(semiMatch)} />
          <div className=" text-center font-medium">{wordDb.sampleBracket}</div>
        </div>
      )}

      <section className="mb-8 w-20 flex flex-row gap-10 items-center">
        <h2 className="text-xl font-semibold mb-2">{wordDb.thirdPlace}</h2>
        <Badge
          className="px-6 py-1 text-base border-2 border-black dark:hover:bg-slate-500 dark:bg-slate-800  hover:bg-slate-800 hover:text-white"
          variant="outline"
        >
          {thirdSwitch ? "YES" : "NO"}
        </Badge>
        {/* <p>{thirdSwitch ? "Yes" : "No"}</p> */}
      </section>
    </div>
  );
}
