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
    // console.log(replaceMongoIdInObject(simpleTeamData));
    return replaceMongoIdInObject(simpleTeamData);
  } catch (error) {
    throw new Error(error);
  }
}

export async function createTeamsN(data, n) {
  try {
    for (let i = 0; i < n; i++) {
      const team = await teamsModel.create(data);
      console.log(team);
    }

    // const team = await teamsModel.create(data);
    // console.log(team);
    // return replaceMongoIdInObject(team);
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
    //find from teamsT table where teamId = id
    const teamsT = await teamsTournamentModel
      .findOne({
        teamId: id,
        tournamentId: tournamentId,
      })
      .lean();
    // console.log("teamsT");
    // console.log(teamsT);

    let teamPlayers = [];
    if (teamsT?.players?.length > 0) {
      teamPlayers = await getAllPlayersByIds(teamsT?.players);
    } else {
      teamPlayers = [];
    }

    // console.log("teamPlayers");
    // console.log(teamPlayers);

    return { ...teamsT, players: teamPlayers };
  } catch (error) {
    throw new Error(error);
  }
}
