import { playersModel } from "@/models/players-model";
import { teamsModel } from "@/models/teams-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { getAllPlayersByIds } from "./players";

export async function createTeams(data) {
  try {
    const team = await teamsModel.create(data);
    const simpleTeamData = await teamsModel.findById(team._id).lean();

    return replaceMongoIdInObject(simpleTeamData);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTeams() {
  try {
    const teams = await teamsModel.find().lean();
    return replaceMongoIdInArray(teams);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTeamById(id) {
  try {
    const teams = await teamsModel
      .findById(id)
      .populate({
        path: "players",
        model: playersModel,
      })
      .lean();
    return replaceMongoIdInObject(teams);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTeamsTByTeamId(id, tournamentId) {
  try {
    const teamsT = await teamsTournamentModel
      .findOne({
        teamId: id,
        tournamentId: tournamentId,
      })
      .lean();

    let teamPlayers = [];
    if (teamsT?.players?.length > 0) {
      teamPlayers = await getAllPlayersByIds(teamsT?.players);
    } else {
      teamPlayers = [];
    }

    return { ...teamsT, players: teamPlayers };
  } catch (error) {
    throw new Error(error);
  }
}
