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

  try {
    const tournamentDataList = data.map((team) => ({
      tournamentId: tournamentId,
      teamId: team.id,
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

export async function getTeamsTournamentByTournamentId(tournamentId) {
  try {
    const teamsTournament = await teamsTournamentModel
      .find({ tournamentId })
      .lean();
    return replaceMongoIdInArray(teamsTournament);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTeamsTournamentById(teamId) {
  try {
    const teamTournament = await teamsTournamentModel
      .findOne({ teamId })
      .lean();
    return replaceMongoIdInObject(teamTournament);
  } catch (error) {
    throw new Error(error);
  }
}
