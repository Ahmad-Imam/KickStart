import { groupsModel } from "@/models/groups-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function createGroups(data, tournamentId) {
  console.log("createsTeamsTournamentList");
  console.log(tournamentId);
  console.log(data);
  try {
    const groupsList = await Promise.all(
      data?.map(async (team) => {
        const groupData = {
          tournamentId: tournamentId,
          ...team,
          points: 0,
        };
        return await groupsModel.create(groupData);
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
