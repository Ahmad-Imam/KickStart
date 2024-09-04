"use client";
import React, { useState } from "react";

const TournamentPage = () => {
  const [numGroups, setNumGroups] = useState(4);
  const [teamsPerGroup, setTeamsPerGroup] = useState(4);
  const [qualifiesPerGroup, setQualifiesPerGroup] = useState(2);
  const [groups, setGroups] = useState([]);
  const [matches, setMatches] = useState([]);
  const [rankings, setRankings] = useState([]);

  const generateGroups = () => {
    const newGroups = [];
    for (let i = 0; i < numGroups; i++) {
      const group = [];
      for (let j = 0; j < teamsPerGroup; j++) {
        group.push({
          id: `G${i + 1}T${j + 1}`,
          name: `Team ${i + 1}-${j + 1}`,
        });
      }
      newGroups.push(group);
    }
    setGroups(newGroups);
  };

  const generateMatches = () => {
    const newMatches = [];
    groups.forEach((group, groupIndex) => {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          newMatches.push({
            group: groupIndex + 1,
            team1: group[i],
            team2: group[j],
            result: null,
          });
        }
      }
    });
    setMatches(newMatches);
  };

  const updateMatchResult = (matchIndex, result) => {
    const newMatches = [...matches];
    newMatches[matchIndex].result = result;
    setMatches(newMatches);
    updateRankings();
  };

  const updateRankings = () => {
    const newRankings = groups.map((group) => {
      const groupRankings = group.map((team) => ({
        team,
        points: matches
          .filter(
            (match) =>
              match.group === group.group &&
              (match.team1.id === team.id || match.team2.id === team.id)
          )
          .reduce((acc, match) => {
            if (match.result === "draw") return acc + 1;
            if (match.result === team.id) return acc + 3;
            return acc;
          }, 0),
      }));
      return groupRankings.sort((a, b) => b.points - a.points);
    });
    setRankings(newRankings);
  };

  const getQualifiers = () => {
    return rankings.map((groupRankings) =>
      groupRankings.slice(0, qualifiesPerGroup).map((ranking) => ranking.team)
    );
  };

  return (
    <div>
      <h1>Tournament Page</h1>
      <button onClick={generateGroups}>Generate Groups</button>
      <button onClick={generateMatches}>Generate Matches</button>
      <div>
        {matches.map((match, index) => (
          <div key={index}>
            <span>
              Group {match.group}: {match.team1.name} vs {match.team2.name}
            </span>
            <button onClick={() => updateMatchResult(index, match.team1.id)}>
              {match.team1.name} Wins
            </button>
            <button onClick={() => updateMatchResult(index, match.team2.id)}>
              {match.team2.name} Wins
            </button>
            <button onClick={() => updateMatchResult(index, "draw")}>
              Draw
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>Rankings</h2>
        {rankings.map((groupRankings, groupIndex) => (
          <div key={groupIndex}>
            <h3>Group {groupIndex + 1}</h3>
            <ul>
              {groupRankings.map((ranking, index) => (
                <li key={index}>
                  {ranking.team.name}: {ranking.points} points
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <h2>Qualifiers</h2>
        {getQualifiers().map((groupQualifiers, groupIndex) => (
          <div key={groupIndex}>
            <h3>Group {groupIndex + 1}</h3>
            <ul>
              {groupQualifiers.map((team, index) => (
                <li key={index}>{team.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentPage;
