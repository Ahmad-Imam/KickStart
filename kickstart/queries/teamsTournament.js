import { playersModel } from "@/models/players-model";
import { teamsModel } from "@/models/teams-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function createTeamsTournamentList(data, tournamentId) {
  console.log("createsTeamsTournamentList");
  console.log(tournamentId);
  console.log(data);
  try {
    const teamsTournamentList = await Promise.all(
      data?.map(async (team) => {
        const tournamentData = {
          tournamentId: tournamentId,
          ...team,
        };
        return await teamsTournamentModel.create(tournamentData);
      })
    );

    // const teamsTournament = await teamsTournamentModel.create(tournamentData);
    // const simpleTeamData = await teamsTournamentModel
    //   .findById(teamsTournament._id)
    //   .lean();
    // console.log(replaceMongoIdInObject(simpleTeamData));
    return replaceMongoIdInArray(teamsTournamentList);
  } catch (error) {
    throw new Error(error);
  }
}
