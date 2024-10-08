import { groupsModel } from "@/models/groups-model";
import { matchModel } from "@/models/matches-model";
import { playersModel } from "@/models/players-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import { tournamentsModel } from "@/models/tournaments-model";

import {
  capitalizeFirstLetter,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function createMatches(allMatch, tournament, matchDate) {
  const tournamentId = tournament.id;

  const {
    groupMatch,
    quarterMatch,
    semiMatch,
    isThirdPlace,
    teamsPerGroup,
    groupsNum,
  } = allMatch;

  try {
    let matchesList = [];

    if (teamsPerGroup > 1) {
      if (teamsPerGroup === 2 && groupsNum === 1) {
        const [team1T, team2T] = await Promise.all([
          teamsTournamentModel.findOne({
            teamId: groupMatch[0].teams[0].id,
            tournamentId: tournamentId,
          }),
          teamsTournamentModel.findOne({
            teamId: groupMatch[0].teams[1].id,
            tournamentId: tournamentId,
          }),
        ]);

        const matchData = {
          tournamentId: tournamentId,
          team1: team1T,
          team2: team2T,
          matchDate: matchDate,
          type: "final",
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          tiebreaker: {},
          location: tournament.location,
        };

        const createdMatch = await matchModel.create(matchData);
      } else {
        for (const group of groupMatch) {
          const groupMatches = [];
          const teams = group.teams;
          for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
              try {
                const [team1T, team2T] = await Promise.all([
                  teamsTournamentModel.findOne({
                    teamId: teams[i].id,
                    tournamentId: tournamentId,
                  }),
                  teamsTournamentModel.findOne({
                    teamId: teams[j].id,
                    tournamentId: tournamentId,
                  }),
                ]);

                const matchData = {
                  tournamentId: tournamentId,
                  team1: team1T,
                  team2: team2T,
                  status: "upcoming",
                  result: {
                    team1: 0,
                    team2: 0,
                  },
                  groupName: group?.name,
                  matchDate: matchDate,
                  location: tournament.location,
                  type: "group",
                };
                groupMatches.push(matchData);
              } catch (error) {
                console.log(error);
              }
            }
          }
          // Batch insert all matches for the group
          const createdMatches = await matchModel.insertMany(groupMatches);
          matchesList.push(...createdMatches.map(replaceMongoIdInObject));
        }
        if (quarterMatch.length > 0) {
          const quarterMatches = [];
          for (const match of quarterMatch) {
            const matchData = {
              tournamentId: tournamentId,
              qName: {
                team1: match?.team1?.qName,
                team2: match?.team2?.qName,
              },
              status: "upcoming",
              result: {
                team1: 0,
                team2: 0,
              },
              matchDate: matchDate,
              type: "quarter",
              tiebreaker: {},
              location: tournament.location,
            };
            quarterMatches.push(matchData);
          }
          //   const semiMatches = [];
          for (let i = 0; i < 4; i = i + 2) {
            const matchData = {
              tournamentId: tournamentId,
              qName: {
                team1: `qf${i + 1}`,
                team2: `qf${i + 2}`,
              },
              status: "upcoming",
              result: {
                team1: 0,
                team2: 0,
              },
              matchDate: matchDate,
              type: "semi",
              tiebreaker: {},
              location: tournament.location,
            };
            quarterMatches.push(matchData);
          }

          //create final match
          const matchData = {
            tournamentId: tournamentId,
            qName: { team1: "sf1", team2: "sf2" },
            status: "upcoming",
            result: {
              team1: 0,
              team2: 0,
            },
            matchDate: matchDate,
            type: "final",
            tiebreaker: {},
          };
          quarterMatches.push(matchData);
          if (isThirdPlace) {
            const matchData = {
              tournamentId: tournamentId,
              qName: { team1: "sf1", team2: "sf2" },
              status: "upcoming",
              result: {
                team1: 0,
                team2: 0,
              },
              matchDate: matchDate,
              type: "third",
              tiebreaker: {},
              location: tournament.location,
            };
            quarterMatches.push(matchData);
          }

          const createdMatchesQ = await matchModel.insertMany(quarterMatches);
          //   const createdMatchesS = await matchModel.insertMany(semiMatches);
          matchesList.push(...createdMatchesQ.map(replaceMongoIdInObject));
          //   matchesList.push(...createdMatchesS.map(replaceMongoIdInObject));
        }

        if (semiMatch.length > 0) {
          const semiMatches = [];
          for (const match of semiMatch) {
            const matchData = {
              tournamentId: tournamentId,
              qName: {
                team1: match?.team1?.qName,
                team2: match?.team2?.qName,
              },
              status: "upcoming",
              result: {
                team1: 0,
                team2: 0,
              },
              matchDate: matchDate,
              type: "semi",
              tiebreaker: {},
              location: tournament.location,
            };
            semiMatches.push(matchData);
          }

          //create final match
          const matchData = {
            tournamentId: tournamentId,
            qName: { team1: "sf1", team2: "sf2" },
            status: "upcoming",
            result: {
              team1: 0,
              team2: 0,
            },
            matchDate: matchDate,
            type: "final",
            tiebreaker: {},
            location: tournament.location,
          };
          semiMatches.push(matchData);
          if (isThirdPlace) {
            const matchData = {
              tournamentId: tournamentId,
              qName: { team1: "sf1", team2: "sf2" },
              status: "upcoming",
              result: {
                team1: 0,
                team2: 0,
              },
              matchDate: matchDate,
              type: "third",
              tiebreaker: {},
              location: tournament.location,
            };
            semiMatches.push(matchData);
          }

          const createdMatches = await matchModel.insertMany(semiMatches);
          matchesList.push(...createdMatches.map(replaceMongoIdInObject));
        }
      }
    } else if (teamsPerGroup === 1 && groupsNum === 2) {
      const [team1T, team2T] = await Promise.all([
        teamsTournamentModel.findOne({
          teamId: groupMatch[0].teams[0].id,
          tournamentId: tournamentId,
        }),
        teamsTournamentModel.findOne({
          teamId: groupMatch[1].teams[0].id,
          tournamentId: tournamentId,
        }),
      ]);

      const matchData = {
        tournamentId: tournamentId,
        team1: team1T,
        team2: team2T,
        status: "upcoming",
        result: {
          team1: 0,
          team2: 0,
        },
        matchDate: matchDate,
        type: "final",
        tiebreaker: {},
        location: tournament.location,
      };
      const createdMatch = await matchModel.create(matchData);
    } else if (teamsPerGroup == 1 && groupsNum === 1) {
    } else if (teamsPerGroup == 1 && groupsNum === 4) {
      //semi. but no group matches
      const semiTeamList = [];
      const semiMatches = [];

      const qNameMap = {
        A1: 0,
        B1: 1,
        C1: 2,
        D1: 3,
      };

      for (let i = 0; i < 4; i++) {
        semiTeamList.push(groupMatch[i].teams[0]);
      }

      for (const match of semiMatch) {
        const team1Index = qNameMap[match?.team1?.qName] ?? 3;
        const team2Index = qNameMap[match?.team2?.qName] ?? 3;

        const [team1T, team2T] = await Promise.all([
          teamsTournamentModel.findOne({
            teamId: semiTeamList[team1Index].id,
            tournamentId: tournamentId,
          }),
          teamsTournamentModel.findOne({
            teamId: semiTeamList[team2Index].id,
            tournamentId: tournamentId,
          }),
        ]);

        const matchData = {
          tournamentId: tournamentId,
          team1: team1T,
          team2: team1T,
          qName: { team1: match?.team1?.qName, team2: match?.team2?.qName },
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          matchDate: matchDate,
          type: "semi",
          tiebreaker: {},
          location: tournament.location,
        };
        semiMatches.push(matchData);
      }

      //create final match
      const matchData = {
        tournamentId: tournamentId,
        qName: { team1: "sf1", team2: "sf2" },
        status: "upcoming",
        result: {
          team1: 0,
          team2: 0,
        },
        matchDate: matchDate,
        type: "final",
        tiebreaker: {},
        location: tournament.location,
      };
      semiMatches.push(matchData);
      if (isThirdPlace) {
        const matchData = {
          tournamentId: tournamentId,
          qName: { team1: "sf1", team2: "sf2" },
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          matchDate: matchDate,
          type: "third",
          tiebreaker: {},
          location: tournament.location,
        };
        semiMatches.push(matchData);
      }

      const createdMatches = await matchModel.insertMany(semiMatches);
      matchesList.push(...createdMatches.map(replaceMongoIdInObject));
    } else if (teamsPerGroup == 1 && groupsNum === 8) {
      const quarterTeamList = [];
      const quarterMatches = [];

      const qNameMap = {
        A1: 0,
        B1: 1,
        C1: 2,
        D1: 3,
        E1: 4,
        F1: 5,
        G1: 6,
        H1: 7,
      };

      for (let i = 0; i < 8; i++) {
        quarterTeamList.push(groupMatch[i].teams[0]);
      }

      for (const match of quarterMatch) {
        const team1Index = qNameMap[match?.team1?.qName] ?? 7;
        const team2Index = qNameMap[match?.team2?.qName] ?? 7;

        const [team1T, team2T] = await Promise.all([
          teamsTournamentModel.findOne({
            teamId: quarterTeamList[team1Index].id,
            tournamentId: tournamentId,
          }),
          teamsTournamentModel.findOne({
            teamId: quarterTeamList[team2Index].id,
            tournamentId: tournamentId,
          }),
        ]);

        const matchData = {
          tournamentId: tournamentId,
          team1: quarterTeamList[team1Index],
          team2: quarterTeamList[team2Index],
          qName: { team1: match?.team1?.qName, team2: match?.team2?.qName },
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          matchDate: matchDate,
          type: "quarter",
          tiebreaker: {},
          location: tournament.location,
        };
        quarterMatches.push(matchData);
      }

      //   const semiMatches = [];
      for (let i = 0; i < 4; i = i + 2) {
        const matchData = {
          tournamentId: tournamentId,
          qName: {
            team1: `qf${i + 1}`,
            team2: `qf${i + 2}`,
          },
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          matchDate: matchDate,
          type: "semi",
          tiebreaker: {},
          location: tournament.location,
        };
        quarterMatches.push(matchData);
      }

      //create final match
      const matchData = {
        tournamentId: tournamentId,
        qName: { team1: "sf1", team2: "sf2" },
        status: "upcoming",
        result: {
          team1: 0,
          team2: 0,
        },
        matchDate: matchDate,
        type: "final",
        tiebreaker: {},
        location: tournament.location,
      };
      quarterMatches.push(matchData);
      if (isThirdPlace) {
        const matchData = {
          tournamentId: tournamentId,
          qName: { team1: "sf1", team2: "sf2" },
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          matchDate: matchDate,
          type: "third",
          tiebreaker: {},
          location: tournament.location,
        };
        quarterMatches.push(matchData);
      }

      const createdMatchesQ = await matchModel.insertMany(quarterMatches);
    } else {
      console.log("nothing");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMatchesByTournamentId(tournamentId) {
  try {
    const matches = await matchModel.find({ tournamentId }).lean();
    return replaceMongoIdInArray(matches);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMatchById(matchId) {
  try {
    const match = await matchModel.findById(matchId).lean();
    return replaceMongoIdInObject(match);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMatchStatus(matchDetails, status, tournament) {
  try {
    const matchId = matchDetails?.id;
    let matchEvent;
    let tournamentEvent;

    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    const matchType = capitalizeFirstLetter(matchDetails?.type);

    if (status === "live") {
      matchEvent = {
        type: "kickoff",
        time: currentTime,
        date: currentDate,
        description: "Match started",
      };

      tournamentEvent = {
        type: "kickoff",
        time: currentTime,
        date: currentDate,
        description: `${matchType} Match - (${capitalizeFirstLetter(
          matchDetails?.team1?.name
        )} vs ${capitalizeFirstLetter(matchDetails?.team2?.name)}) started`,
        matchId,
      };
    } else if (status === "finished") {
      matchEvent = {
        type: "fulltime",
        time: currentTime,
        description: "Match ended",
        date: currentDate,
      };
      tournamentEvent = {
        type: "fulltime",
        time: currentTime,
        date: currentDate,
        description: `${matchType} Match ended. Score: ${capitalizeFirstLetter(
          matchDetails?.team1?.name
        )} ${matchDetails?.result?.team1} - ${
          matchDetails?.result?.team2
        } ${capitalizeFirstLetter(matchDetails?.team2?.name)}`,
        matchId,
      };
    }

    const updatedMatch = await matchModel.findByIdAndUpdate(matchId, {
      status,
      $push: { events: matchEvent },
    });

    const updateTEvent = await updateTournamentEvent(
      tournamentEvent,
      tournament.id
    );

    return replaceMongoIdInObject(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMatchEvent(event, matchDetails) {
  try {
    // const matchEvent = {
    //   type: eventType,
    //   time: currentTime,
    //   description: eventDes,
    // };

    // const tournamentEvent = {
    //   type: "kickoff",
    //   time: currentTime,
    //   description: `${matchType} Match - (${capitalizeFirstLetter(
    //     matchDetails?.team1?.name
    //   )} vs ${capitalizeFirstLetter(matchDetails?.team2?.name)}) started`,
    //   matchId,
    // };

    const updatedMatch = await matchModel.findByIdAndUpdate(matchDetails?.id, {
      $push: { events: event },
    });

    return replaceMongoIdInObject(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTournamentEvent(event, tournamentId) {
  try {
    const updatedTournament = await tournamentsModel.findByIdAndUpdate(
      tournamentId,
      {
        $push: { events: event },
      }
    );

    return replaceMongoIdInObject(updatedTournament);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMatchGoal(gfTeam, gaTeam, player, matchDetails) {
  try {
    const matchId = matchDetails?.id;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    const matchEvent = {
      type: "goal",
      time: currentTime,
      date: currentDate,
      description: `${gfTeam.name} Scored! Goal by ${player.name}`,
    };

    //update result of the match. If the goal is scored by team1, increment team1 score by 1
    const updatedResult = {
      team1:
        matchDetails.team1.name === gfTeam.name
          ? matchDetails.result.team1 + 1
          : matchDetails.result.team1,
      team2:
        matchDetails.team2.name === gfTeam.name
          ? matchDetails.result.team2 + 1
          : matchDetails.result.team2,
    };

    // Update the match document in the database
    const updatedMatch = await matchModel
      .findByIdAndUpdate(
        matchId,
        {
          $push: { events: matchEvent },
          $set: { result: updatedResult },
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean();

    // Update the scorers in the tournament table
    await tournamentsModel.findByIdAndUpdate(
      matchDetails.tournamentId,
      {
        $inc: { "scorers.$[elem].score": 1 },
      },
      {
        arrayFilters: [{ "elem.playerId": player.id }],
        new: true,
        upsert: true,
      }
    );

    const updatedTournament = await tournamentsModel
      .findById(matchDetails.tournamentId)
      .lean();

    if (
      !updatedTournament.scorers.some((scorer) => scorer.playerId === player.id)
    ) {
      await tournamentsModel.findByIdAndUpdate(
        matchDetails.tournamentId,
        {
          $addToSet: { scorers: { playerId: player.id, score: 1 } },
        },
        { new: true }
      );
    }

    await teamsTournamentModel.findByIdAndUpdate(
      { _id: gfTeam.id, tournamentId: matchDetails.tournamentId },
      {
        $inc: { "scorers.$[elem].score": 1, goalsFor: 1 },
      },
      {
        arrayFilters: [{ "elem.playerId": player.id }],
        new: true,
        upsert: true,
      }
    );

    const updatedTeamTournament = await teamsTournamentModel
      .findOne({ _id: gfTeam.id, tournamentId: matchDetails.tournamentId })
      .lean();

    // Check if the player is not in the scorers array
    if (
      !updatedTeamTournament.scorers.some(
        (scorer) => scorer.playerId === player.id
      )
    ) {
      // Add the player to the scorers array with an initial score of 1
      await teamsTournamentModel.findByIdAndUpdate(
        { _id: gfTeam.id, tournamentId: matchDetails.tournamentId },
        {
          $addToSet: { scorers: { playerId: player.id, score: 1 } },
        },
        { new: true }
      );
    }

    await teamsTournamentModel.findByIdAndUpdate(
      { _id: gaTeam.id, tournamentId: matchDetails.tournamentId },
      {
        $inc: { goalsAgainst: 1 },
      },
      { new: true }
    );

    const tournamentEvent = {
      type: "goal",
      time: currentTime,
      date: currentDate,
      description: `${gfTeam.name} Scored! Goal by ${player.name}. Current score: ${updatedMatch.team1.name} ${updatedMatch.result.team1} - ${updatedMatch.result.team2} ${updatedMatch.team2.name}`,
      matchId,
    };

    //increase goal by 1 for player in players table
    const updatedPlyer = await playersModel.findByIdAndUpdate(
      player.id,
      {
        $inc: { goals: 1 },
      },
      { new: true }
    );

    // Update the tournament document in the database
    const updatedTournamentEvent = await updateTournamentEvent(
      tournamentEvent,
      matchDetails.tournamentId
    );

    return replaceMongoIdInObject(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMatchCard(team, player, matchDetails, type) {
  try {
    const matchId = matchDetails?.id;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    const matchEvent = {
      type: type,
      time: currentTime,
      date: currentDate,
      description:
        type === "yellow"
          ? `Yellow Card for ${team.name}! ${player.name} just booked a yellow card`
          : `Red Card for ${team.name}! ${player.name} has been sent off`,
    };

    //update result of the match. If the goal is scored by team1, increment team1 score by 1

    // Update the match document in the database
    const updatedMatch = await matchModel
      .findByIdAndUpdate(
        matchId,
        {
          $push: { events: matchEvent },
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean();

    if (type === "yellow") {
      const updateResult = await teamsTournamentModel.findByIdAndUpdate(
        { _id: team.id, tournamentId: matchDetails.tournamentId },
        {
          $inc: { "yellow.$[elem].score": 1 },
        },
        {
          arrayFilters: [{ "elem.playerId": player.id }],
          new: true,
          upsert: true,
        }
      );

      const updatedPlyer = await playersModel.findByIdAndUpdate(
        player.id,
        {
          $inc: { yellow: 1 },
        },
        { new: true }
      );
    } else {
      const updateResult = await teamsTournamentModel.findByIdAndUpdate(
        { _id: team.id, tournamentId: matchDetails.tournamentId },
        {
          $inc: { "red.$[elem].score": 1 },
        },
        {
          arrayFilters: [{ "elem.playerId": player.id }],
          new: true,
          upsert: true,
        }
      );

      const updatedPlyer = await playersModel.findByIdAndUpdate(
        player.id,
        {
          $inc: { red: 1 },
        },
        { new: true }
      );
    }

    // Fetch the updated team tournament document
    const updatedTeamTournament = await teamsTournamentModel
      .findOne({ _id: team.id, tournamentId: matchDetails.tournamentId })
      .lean();

    // Check if the player is not already in the scorers array

    if (type === "yellow") {
      if (
        !updatedTeamTournament.yellow.some(
          (scorer) => scorer.playerId === player.id
        )
      ) {
        // Add the player to the yellow array with an initial score of 1
        const addToSetResult = await teamsTournamentModel.findByIdAndUpdate(
          { _id: team.id, tournamentId: matchDetails.tournamentId },
          {
            $addToSet: { yellow: { playerId: player.id, score: 1 } },
          },
          { new: true }
        );
      }
    } else {
      if (
        !updatedTeamTournament.red.some(
          (scorer) => scorer.playerId === player.id
        )
      ) {
        // Add the player to the yellow array with an initial score of 1
        const addToSetResult = await teamsTournamentModel.findByIdAndUpdate(
          { _id: team.id, tournamentId: matchDetails.tournamentId },
          {
            $addToSet: { red: { playerId: player.id, score: 1 } },
          },
          { new: true }
        );
      }
    }

    const tournamentEvent = {
      type: type,
      time: currentTime,
      date: currentDate,
      description:
        type === "yellow"
          ? `Yellow Card for ${team.name}! ${player.name} just booked a yellow card. Current score: ${updatedMatch.team1.name} ${updatedMatch.result.team1} - ${updatedMatch.result.team2} ${updatedMatch.team2.name}`
          : `Red Card for ${team.name}! ${player.name} has been sent off. Current score: ${updatedMatch.team1.name} ${updatedMatch.result.team1} - ${updatedMatch.result.team2} ${updatedMatch.team2.name}`,

      matchId,
    };

    // Update the tournament document in the database
    const updatedTournamentEvent = await updateTournamentEvent(
      tournamentEvent,
      matchDetails.tournamentId
    );

    return replaceMongoIdInObject(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMatchesLeftGroup(tournament) {
  try {
    const matchesUpcomingOrLive = await matchModel
      .find({
        tournamentId: tournament.id,
        type: "group",
        status: { $in: ["upcoming", "live"] },
      })
      .lean();

    if (matchesUpcomingOrLive.length === 0) {
      return "done";
    } else return "not done";

    // return replaceMongoIdInArray(matches);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMatchesLeftQuarter(tournament) {
  try {
    const matchesUpcomingOrLive = await matchModel
      .find({
        tournamentId: tournament.id,
        type: "quarter",
        status: { $in: ["upcoming", "live"] },
      })
      .lean();

    if (matchesUpcomingOrLive.length === 0) {
      return "done";
    } else return "not done";
  } catch (error) {
    throw new Error(error);
  }
}
export async function getMatchesLeftSemi(tournament) {
  try {
    const matchesUpcomingOrLive = await matchModel
      .find({
        tournamentId: tournament.id,
        type: "semi",
        status: { $in: ["upcoming", "live"] },
      })
      .lean();

    if (matchesUpcomingOrLive.length === 0) {
      return "done";
    } else return "not done";
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateGroupEnd(tournament) {
  const teamsQualifiedPerGroup = tournament?.teamsQPerGroup; // Example value, replace with actual value
  const groupNumber = tournament?.groupsNum; // Example value, replace with actual value
  const totalTeams = teamsQualifiedPerGroup * groupNumber;

  if (totalTeams !== 8 && totalTeams !== 4) {
    throw new Error(
      "Invalid number of total teams for quarter or semi-finals."
    );
  }

  const groups = await groupsModel
    .find({ tournamentId: tournament.id.toString() })
    .lean();

  if (!groups || groups.length === 0) {
    throw new Error(`No groups found for tournament ${tournament.id}.`);
  }

  const groupMap = {};
  for (let i = 0; i < groupNumber; i++) {
    const groupKey = `Group ${String.fromCharCode(65 + i)}`; // Group A, B, C, etc.

    const group = groups.find((group) => group.name === groupKey);
    if (!group) {
      throw new Error(`Group ${groupKey} not found.`);
    }

    const rankedTeamList = group.teams.slice().sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points; // Sort by points in descending order
      }
      if (a.goalsFor - a.goalsAgainst !== b.goalsFor - b.goalsAgainst) {
        return b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst); // Sort by goal difference in descending order
      }
      if (a.goalsFor !== b.goalsFor) {
        return b.goalsFor - a.goalsFor; // Sort by goals for in descending order
      }
      return a.name.localeCompare(b.name); // Sort by name in ascending order if all else is equal
    });

    groupMap[groupKey] = rankedTeamList.slice(0, teamsQualifiedPerGroup);
  }

  const matchTypes = totalTeams === 8 ? ["quarter"] : ["semi"];
  const matches = await matchModel
    .find({ type: { $in: matchTypes }, tournamentId: tournament.id })
    .lean();

  for (const match of matches) {
    const { qName } = match;

    const team1Key = qName.team1;
    const team2Key = qName.team2;

    const group1 = `Group ${team1Key[0]}`;
    const group2 = `Group ${team2Key[0]}`;

    const team1Index = parseInt(team1Key[1], 10) - 1;
    const team2Index = parseInt(team2Key[1], 10) - 1;

    const team1 = groupMap[group1][team1Index];
    const team2 = groupMap[group2][team2Index];

    const teamsT1 = await teamsTournamentModel
      .findOne({ teamId: team1.teamId, tournamentId: tournament.id })
      .lean();

    const teamsT2 = await teamsTournamentModel
      .findOne({ teamId: team2.teamId, tournamentId: tournament.id })
      .lean();

    await matchModel.updateOne(
      { _id: match._id },
      {
        $set: {
          team1: teamsT1,
          team2: teamsT2,
        },
      }
    );
  }
}

export async function addTiebreaker(matchDetails) {
  try {
    const matchId = matchDetails?.id;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();

    const tiebreaker = {
      teamA: Array(10).fill("pending"),
      teamB: Array(10).fill("pending"),
    };

    const matchEvent = {
      type: "tiebreaker",
      time: currentTime,
      date: currentDate,
      description: "Tiebreaker started",
    };

    const test = {
      name: "asd",
    };

    const updatedMatchTie = await matchModel.findByIdAndUpdate(
      matchId,
      {
        tiebreaker,
      },
      { new: true }
    );

    const updatedMatch = await matchModel
      .findByIdAndUpdate(matchId, {
        $push: { events: matchEvent },
      })
      .lean();

    return replaceMongoIdInObject(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTiebreaker(matchDetails, teamId, index, result) {
  // Determine the field to update based on teamId
  const teamField = teamId === "A" ? "tiebreaker.teamA" : "tiebreaker.teamB";

  try {
    // Construct the update query
    const updateQuery = {
      $set: {
        [`${teamField}.${index}`]: result,
      },
    };

    // Execute the update query
    const updatedMatch = await matchModel
      .findByIdAndUpdate(matchDetails?.id, updateQuery, {
        new: true,
        useFindAndModify: false,
      })
      .lean();

    if (!updatedMatch) {
      throw new Error("Match not found or update failed");
    }

    return updatedMatch;
  } catch (error) {
    console.error("Error updating tiebreaker:", error);
    throw new Error(error);
  }
}

export async function finishTieBreaker(matchDetails) {
  try {
    const matchId = matchDetails?.id;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();

    const team1Result = matchDetails.tiebreaker.teamA.filter(
      (result) => result === "scored"
    ).length;

    const team2Result = matchDetails.tiebreaker.teamB.filter(
      (result) => result === "scored"
    ).length;

    const matchResult = {
      team1: matchDetails?.result?.team1 + team1Result,
      team2: matchDetails?.result?.team2 + team2Result,
    };

    const matchEvent = {
      type: "tiebreaker",
      time: currentTime,
      date: currentDate,
      description: "Tiebreaker ended",
    };

    const updatedMatch = await matchModel.findByIdAndUpdate(
      matchId,
      {
        $push: { events: matchEvent },
        $set: {
          result: matchResult,
        },
      },
      { new: true }
    );

    return replaceMongoIdInObject(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMatchData(matchData, matchDetails) {
  try {
    const matchId = matchDetails?.id;

    const updatedMatch = await matchModel
      .findByIdAndUpdate(
        matchId,
        {
          $set: matchData,
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean();

    return replaceMongoIdInObject(updatedMatch);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMatchMOTM(team, player, matchDetails) {
  try {
    const matchId = matchDetails?.id;
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    const matchEvent = {
      type: "motm",
      time: currentTime,
      date: currentDate,
      description: `${player.name} from ${team.name} was awarded Man of the Match!`,
    };

    const tournamentEvent = {
      type: "motm",
      time: currentTime,
      date: currentDate,
      description: `${player.name} from ${team.name} was awarded Man of the Match in (${matchDetails.team1.name} vs ${matchDetails.team2.name})`,
      matchId,
    };

    const motmMatch = {
      player,
      team,
    };

    // Update the match document in the database
    const updatedMatch = await matchModel
      .findByIdAndUpdate(
        matchId,
        {
          $push: { events: matchEvent },
          $set: { motm: motmMatch },
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean();

    const motmTeamsT = {
      player,
      matchDetails,
    };

    const updatedTeamsT = await teamsTournamentModel
      .findOneAndUpdate(
        { _id: team._id, tournamentId: matchDetails.tournamentId },

        {
          $push: { events: matchEvent, motm: { $each: [motmTeamsT] } },
          // $set: { motm: motmTeamsT },
        },
        {
          new: true,
          upsert: true,
        }
      )
      .lean();

    const updatedPlyer = await playersModel.findByIdAndUpdate(
      player.id,
      {
        $inc: { motm: 1 },
      },
      { new: true }
    );

    const tournamentUpdated = await updateTournamentEvent(
      tournamentEvent,
      matchDetails.tournamentId
    );
  } catch (error) {
    throw new Error(error);
  }
}
