import { groupsModel } from "@/models/groups-model";
import { matchModel } from "@/models/matches-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import { tournamentsModel } from "@/models/tournaments-model";

import {
  capitalizeFirstLetter,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

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
                groupName: group?.groupName,
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
    const matchType = capitalizeFirstLetter(matchDetails?.type);

    if (status === "live") {
      console.log("match started");
      matchEvent = {
        type: "kickoff",
        time: currentTime,
        description: "Match started",
      };

      tournamentEvent = {
        type: "kickoff",
        time: currentTime,
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
      };
      tournamentEvent = {
        type: "fulltime",
        time: currentTime,
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

    const matchEvent = {
      type: "goal",
      time: currentTime,
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
      gfTeam.id,
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
        gfTeam.id,
        {
          $addToSet: { scorers: { playerId: player.id, score: 1 } },
        },
        { new: true }
      );
    }

    console.log("teamsT scorers for updated");
    await teamsTournamentModel.findByIdAndUpdate(
      gaTeam.id,
      {
        $inc: { goalsAgainst: 1 },
      },
      { new: true }
    );
    console.log("teamsT goals against updated");

    const tournamentEvent = {
      type: "goal",
      time: currentTime,
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
