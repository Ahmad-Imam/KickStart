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
    const tournamentDataList = data.map((team) => ({
      tournamentId: tournamentId,
      ...team,
      points: 0,
      matchPlayed: 0,
      matchWon: 0,
      matchDraw: 0,
      matchLost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    }));

    const teamsTournamentList = await teamsTournamentModel.insertMany(
      tournamentDataList
    );

    return replaceMongoIdInArray(teamsTournamentList);
  } catch (error) {
    throw new Error(error);
  }
}
