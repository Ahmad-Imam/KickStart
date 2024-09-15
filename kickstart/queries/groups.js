import { groupsModel } from "@/models/groups-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function createGroups(
  data,
  tournamentId,
  teamsQPerGroup,
  teamsPerGroup
) {
  console.log("createsTeamsTournamentList");
  // console.log(tournamentId);
  // console.log(data);
  let groupsList = [];
  try {
    groupsList = await Promise.all(
      data?.map(async (team) => {
        const teamsDataObj = await team.teams.reduce(
          async (accPromise, team) => {
            const acc = await accPromise;
            const teamData = await teamsTournamentModel.findOne({
              teamId: team.id,
            });
            acc[team.id] = teamData;
            return acc;
          },
          Promise.resolve({})
        );
        const teamsDataArray = Object.values(teamsDataObj);

        const groupData = {
          tournamentId: tournamentId,
          teamsQPerGroup: teamsQPerGroup,
          ...team,
          teams: teamsDataArray,
        };

        return groupsModel.create(groupData);
      })
    );

    // const teamsTournament = await teamsTournamentModel.create(tournamentData);
    // const simpleTeamData = await teamsTournamentModel
    //   .findById(teamsTournament._id)
    //   .lean();
    // console.log(replaceMongoIdInObject(simpleTeamData));
    return replaceMongoIdInArray(groupsList);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getGroupsByTournamentId(tournamentId) {
  try {
    const groups = await groupsModel.find({ tournamentId }).lean();
    return replaceMongoIdInArray(groups);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMatchPlayedGroups(matchDetails, tournament) {
  try {
    const groups = await getGroupsByTournamentId(tournament.id);
    // console.log(groups);
    const newGroups = await Promise.all(
      groups.map(async (group) => {
        const newGroup = await groupsModel.findOneAndUpdate(
          { _id: group.id },
          {
            $set: {
              teams: group.teams.map((team) => {
                if (
                  team.teamId.toString() === matchDetails.team1.id.toString()
                ) {
                  console.log("team1");
                  return {
                    ...team,
                    matchPlayed: team.matchPlayed + 1,
                    // goalsFor: team.goalsFor + matchDetails.team1.goals,
                    // goalsAgainst: team.goalsAgainst + matchDetails.team2.goals,
                  };
                } else if (
                  team.teamId.toString() === matchDetails.team2.id.toString()
                ) {
                  console.log("team2");
                  return {
                    ...team,
                    matchPlayed: team.matchPlayed + 1,
                    // goalsFor: team.goalsFor + matchDetails.team2.goals,
                    // goalsAgainst: team.goalsAgainst + matchDetails.team1.goals,
                  };
                }
                return team;
              }),
            },
          },
          { new: true }
        );
        return newGroup;
      })
    );

    console.log("group updated");
    // console.log(newGroups[0].teams);
    // return replaceMongoIdInArray(newGroups);
  } catch (error) {
    throw new Error(error);
  }
}
