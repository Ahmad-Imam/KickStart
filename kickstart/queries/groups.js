import { groupsModel } from "@/models/groups-model";

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
  console.log(tournamentId);
  console.log(data);
  let groupsList = [];
  try {
    groupsList = await Promise.all(
      data?.map(async (team) => {
        const groupData = {
          tournamentId: tournamentId,
          teamsQPerGroup: teamsQPerGroup,
          points: 0,
          ...team,
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
