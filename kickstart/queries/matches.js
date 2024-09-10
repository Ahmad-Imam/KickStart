import { groupsModel } from "@/models/groups-model";
import { matchModel } from "@/models/matches-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function createMatches(allMatch, tournamentId, matchDate) {
  console.log("createsTeamsTournamentList");
  console.log(tournamentId);

  const { groupMatch, quarterMatch, semiMatch, isThirdPlace, teamsPerGroup } =
    allMatch;
  const groupsNum = groupMatch.length;

  try {
    let matchesList = [];

    if (teamsPerGroup > 1) {
      if (teamsPerGroup === 2 && groupsNum === 1) {
        const matchData = {
          tournamentId: tournamentId,
          team1: groupMatch[0].teams[0],
          team2: groupMatch[0].teams[1],
          status: "pending",
          matchDate: matchDate,
          type: "final",
        };
        const createdMatch = await matchModel.create(matchData);
        matchesList.push(replaceMongoIdInObject(createdMatch));
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
                status: "pending",
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
        status: "pending",
        matchDate: matchDate,
        type: "final",
      };
      const createdMatch = await matchModel.create(matchData);
      matchesList.push(replaceMongoIdInObject(createdMatch));
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
          status: "pending",
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
          status: "pending",
          matchDate: matchDate,
          type: "semi",
        };
        quarterMatches.push(matchData);
      }

      //create final match
      const matchData = {
        tournamentId: tournamentId,
        qName: { team1: "sf1", team2: "sf2" },
        status: "pending",
        matchDate: matchDate,
        type: "final",
      };
      quarterMatches.push(matchData);
      if (isThirdPlace) {
        const matchData = {
          tournamentId: tournamentId,
          qName: { team1: "sf1", team2: "sf2" },
          status: "pending",
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
          status: "pending",
          matchDate: matchDate,
          type: "semi",
        };
        semiMatches.push(matchData);
      }

      //create final match
      const matchData = {
        tournamentId: tournamentId,
        qName: { team1: "sf1", team2: "sf2" },
        status: "pending",
        matchDate: matchDate,
        type: "final",
      };
      semiMatches.push(matchData);
      if (isThirdPlace) {
        const matchData = {
          tournamentId: tournamentId,
          qName: { team1: "sf1", team2: "sf2" },
          status: "pending",
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
