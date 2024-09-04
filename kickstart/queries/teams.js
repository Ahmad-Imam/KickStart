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
    return replaceMongoIdInArray(teams);
  } catch (error) {
    throw new Error(error);
  }
}
