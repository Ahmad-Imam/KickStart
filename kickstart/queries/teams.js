import { playersModel } from "@/models/players-model";
import { teamsModel } from "@/models/teams-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function createTeams(data) {
  try {
    const team = await teamsModel.create(data);
    console.log(team);
    return replaceMongoIdInObject(team);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTeamInfo(id) {
  try {
    const teams = await teamsModel
      .findById(id)
      .populate({
        path: "players",
        model: playersModel,
      })
      .lean();
    return replaceMongoIdInArray(teams);
  } catch (error) {
    throw new Error(error);
  }
}
