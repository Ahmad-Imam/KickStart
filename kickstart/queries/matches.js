import { groupsModel } from "@/models/groups-model";
import { matchModel } from "@/models/matches-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import { tournamentsModel } from "@/models/tournaments-model";

import {
  capitalizeFirstLetter,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { da } from "date-fns/locale";

export async function createMatches(allMatch, tournamentId, matchDate) {
  console.log("creating matches");
  console.log(tournamentId);
  console.log(allMatch);
  const {
    groupMatch,
    quarterMatch,
    semiMatch,
    isThirdPlace,
    teamsPerGroup,
    groupsNum,
  } = allMatch;
  // const groupsNum = groupMatch.length;

  try {
    let matchesList = [];

    if (teamsPerGroup > 1) {
      if (teamsPerGroup === 2 && groupsNum === 1) {
        const matchData = {
          tournamentId: tournamentId,
          team1: groupMatch[0].teams[0],
          team2: groupMatch[0].teams[1],
          matchDate: matchDate,
          type: "final",
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          tiebreaker: {},
        };
        console.log("hereeeeeeeeeeeeeeeeeeeeee");
        const createdMatch = await matchModel.create(matchData);
        // matchesList.push(replaceMongoIdInObject(createdMatch));
      } else {
        for (const group of groupMatch) {
          const groupMatches = [];
          const teams = group.teams;
          for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
              const matchData = {
                tournamentId: tournamentId,
                team1: teams[i],
                team2: teams[j],
                status: "upcoming",
                result: {
                  team1: 0,
                  team2: 0,
                },
                groupName: group?.name,
                matchDate: matchDate,
                type: "group",
              };
              groupMatches.push(matchData);
            }
          }
          // Batch insert all matches for the group
          const createdMatches = await matchModel.insertMany(groupMatches);
          matchesList.push(...createdMatches.map(replaceMongoIdInObject));
        }
      }
    } else if (teamsPerGroup === 1 && groupsNum === 2) {
      const matchData = {
        tournamentId: tournamentId,
        team1: groupMatch[0].teams[0],
        team2: groupMatch[1].teams[0],
        status: "upcoming",
        result: {
          team1: 0,
          team2: 0,
        },
        matchDate: matchDate,
        type: "final",
        tiebreaker: {},
      };
      const createdMatch = await matchModel.create(matchData);
      console.log("match created g1 t2");
      // console.log(createdMatch);
      // matchesList.push(replaceMongoIdInObject(createdMatch));
    } else if (teamsPerGroup == 1 && groupsNum === 1) {
    } else if (teamsPerGroup == 1 && groupsNum === 4) {
      //semi. but no group matches
    } else if (teamsPerGroup == 1 && groupsNum === 8) {
      //quarter. but no group matches
      //quarter. but no group matches
    }

    if (quarterMatch.length > 0) {
      console.log("quarterMatch");
      const quarterMatches = [];
      for (const match of quarterMatch) {
        const matchData = {
          tournamentId: tournamentId,
          qName: { team1: match?.team1?.qName, team2: match?.team2?.qName },
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          matchDate: matchDate,
          type: "quarter",
          tiebreaker: {},
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
        };
        quarterMatches.push(matchData);
      }

      const createdMatchesQ = await matchModel.insertMany(quarterMatches);
      //   const createdMatchesS = await matchModel.insertMany(semiMatches);
      matchesList.push(...createdMatchesQ.map(replaceMongoIdInObject));
      //   matchesList.push(...createdMatchesS.map(replaceMongoIdInObject));
    }

    if (semiMatch.length > 0) {
      console.log("semiMatch");
      const semiMatches = [];
      for (const match of semiMatch) {
        const matchData = {
          tournamentId: tournamentId,
          qName: { team1: match?.team1?.qName, team2: match?.team2?.qName },
          status: "upcoming",
          result: {
            team1: 0,
            team2: 0,
          },
          matchDate: matchDate,
          type: "semi",
          tiebreaker: {},
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
        };
        semiMatches.push(matchData);
      }

      const createdMatches = await matchModel.insertMany(semiMatches);
      matchesList.push(...createdMatches.map(replaceMongoIdInObject));
    }

    console.log("matchesList");
    // console.log(matchesList);
    // return replaceMongoIdInArray(matchesList);
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
      console.log("match started");
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
      console.log("match ended");
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

    // console.log(new Date().toLocaleTimeString());

    const updatedMatch = await matchModel.findByIdAndUpdate(matchId, {
      status,
      $push: { events: matchEvent },
    });

    const updateTEvent = await updateTournamentEvent(
      tournamentEvent,
      tournament.id
    );

    console.log(matchId);
    console.log(tournament.id);

    // console.log(replaceMongoIdInObject(updatedTournament));

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

    console.log("matchResult updated");

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
    console.log("tournScorer updated");

    const updatedTournament = await tournamentsModel
      .findById(matchDetails.tournamentId)
      .lean();

    if (
      !updatedTournament.scorers.some((scorer) => scorer.playerId === player.id)
    ) {
      console.log("if no prev tournScorer updated");
      await tournamentsModel.findByIdAndUpdate(
        matchDetails.tournamentId,
        {
          $addToSet: { scorers: { playerId: player.id, score: 1 } },
        },
        { new: true }
      );
    }

    console.log("tournaments updated complete");

    const test = await teamsTournamentModel.findById(gfTeam.id).lean();
    console.log("gfTeam");
    console.log(gfTeam);

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

    console.log("teamsT scorers for updated");

    const updatedTeamTournament = await teamsTournamentModel
      .findById(gfTeam.id)
      .lean();

    // Check if the player is not in the scorers array
    if (
      !updatedTeamTournament.scorers.some(
        (scorer) => scorer.playerId === player.id
      )
    ) {
      console.log("if no prev teamsT scorers, goals for updated");
      // Add the player to the scorers array with an initial score of 1
      await teamsTournamentModel.findByIdAndUpdate(
        { _id: gfTeam.id, tournamentId: matchDetails.tournamentId },
        {
          $addToSet: { scorers: { playerId: player.id, score: 1 } },
        },
        { new: true }
      );
    }

    console.log("teamsT scorers for updated");
    await teamsTournamentModel.findByIdAndUpdate(
      { _id: gaTeam.id, tournamentId: matchDetails.tournamentId },
      {
        $inc: { goalsAgainst: 1 },
      },
      { new: true }
    );
    console.log("teamsT goals against updated");

    const tournamentEvent = {
      type: "goal",
      time: currentTime,
      date: currentDate,
      description: `${gfTeam.name} Scored! Goal by ${player.name}. Current score: ${updatedMatch.team1.name} ${updatedMatch.result.team1} - ${updatedMatch.result.team2} ${updatedMatch.team2.name}`,
      matchId,
    };

    // Update the tournament document in the database
    const updatedTournamentEvent = await updateTournamentEvent(
      tournamentEvent,
      matchDetails.tournamentId
    );
    console.log("tournEvent updated");

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
    // console.log(matchesFinished);

    console.log(matchesUpcomingOrLive.length);
    if (matchesUpcomingOrLive.length === 0) {
      console.log("all matches finished");
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
    // console.log(matchesFinished);

    console.log(matchesUpcomingOrLive.length);
    if (matchesUpcomingOrLive.length === 0) {
      console.log("all matches finished");
      return "done";
    } else return "not done";

    // return replaceMongoIdInArray(matches);
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
    // console.log(matchesFinished);

    console.log(matchesUpcomingOrLive.length);
    if (matchesUpcomingOrLive.length === 0) {
      console.log("all matches finished");
      return "done";
    } else return "not done";

    // return replaceMongoIdInArray(matches);
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

  console.log("tournament.id");
  console.log(tournament.id);
  const groups = await groupsModel
    .find({ tournamentId: tournament.id.toString() })
    .lean();
  console.log(groups);

  if (!groups || groups.length === 0) {
    throw new Error(`No groups found for tournament ${tournament.id}.`);
  }

  const groupMap = {};
  for (let i = 0; i < groupNumber; i++) {
    const groupKey = `Group ${String.fromCharCode(65 + i)}`; // Group A, B, C, etc.
    console.log(groupKey);
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
    // console.log(rankedTeamList)
  }

  console.log("groupMap");
  console.log(groupMap);

  const matchTypes = totalTeams === 8 ? ["quarter"] : ["semi"];
  const matches = await matchModel
    .find({ type: { $in: matchTypes }, tournamentId: tournament.id })
    .lean();
  console.log(matches?.length);

  for (const match of matches) {
    const { qName } = match;
    console.log(qName);
    const team1Key = qName.team1;
    const team2Key = qName.team2;

    const group1 = `Group ${team1Key[0]}`;
    const group2 = `Group ${team2Key[0]}`;

    const team1Index = parseInt(team1Key[1], 10) - 1;
    const team2Index = parseInt(team2Key[1], 10) - 1;

    const team1 = groupMap[group1][team1Index];
    const team2 = groupMap[group2][team2Index];

    console.log("team1");
    console.log(team1);
    console.log(team2);

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
  console.log("matches updated");
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
    console.log(tiebreaker);

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

    console.log("updated tiebreaker");
    // console.log(updatedMatchTie);

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

    console.log("Updated match with tiebreaker:", updatedMatch);
    return updatedMatch;
  } catch (error) {
    console.error("Error updating tiebreaker:", error);
    throw new Error(error);
  }
}
