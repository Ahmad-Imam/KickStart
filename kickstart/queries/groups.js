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
  let groupsList = [];
  try {
    groupsList = await Promise.all(
      data?.map(async (group) => {
        const teamsDataObj = await group.teams.reduce(
          async (accPromise, team) => {
            const acc = await accPromise;
            const teamData = await teamsTournamentModel.findOne({
              teamId: team.id,
              tournamentId: tournamentId,
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
          ...group,
          teams: teamsDataArray,
        };

        return groupsModel.create(groupData);
      })
    );

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
    const newGroups = await Promise.all(
      groups.map(async (group) => {
        const newGroup = await groupsModel
          .findOneAndUpdate(
            { _id: group.id, tournamentId: tournament.id },
            {
              $set: {
                teams: group.teams.map((team) => {
                  let updateFields = {
                    matchPlayed: team.matchPlayed,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    matchWon: team.matchWon,
                    matchDraw: team.matchDraw,
                    matchLost: team.matchLost,
                    points: team.points,
                  };

                  if (
                    team.teamId.toString() ===
                    matchDetails.team1.teamId.toString()
                  ) {
                    updateFields.matchPlayed += 1;
                    updateFields.goalsFor += matchDetails.result.team1;
                    updateFields.goalsAgainst += matchDetails.result.team2;

                    if (matchDetails.result.team1 > matchDetails.result.team2) {
                      updateFields.matchWon += 1;
                      updateFields.points += 3;
                    } else if (
                      matchDetails.result.team1 < matchDetails.result.team2
                    ) {
                      updateFields.matchLost += 1;
                    } else {
                      updateFields.matchDraw += 1;
                      updateFields.points += 1;
                    }
                  } else if (
                    team.teamId.toString() ===
                    matchDetails.team2.teamId.toString()
                  ) {
                    updateFields.matchPlayed += 1;
                    updateFields.goalsFor += matchDetails.result.team2;
                    updateFields.goalsAgainst += matchDetails.result.team1;

                    if (matchDetails.result.team2 > matchDetails.result.team1) {
                      updateFields.matchWon += 1;
                      updateFields.points += 3;
                    } else if (
                      matchDetails.result.team2 < matchDetails.result.team1
                    ) {
                      updateFields.matchLost += 1;
                    } else {
                      updateFields.matchDraw += 1;
                      updateFields.points += 1;
                    }
                  }

                  return {
                    ...team,
                    ...updateFields,
                  };
                }),
              },
            },
            { new: true }
          )
          .lean();
        return newGroup;
      })
    );

    return replaceMongoIdInArray(newGroups);
  } catch (error) {
    throw new Error(error);
  }
}
