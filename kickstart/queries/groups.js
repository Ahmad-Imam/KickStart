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
