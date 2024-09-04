import { playersModel } from "@/models/players-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function createPlayers(data) {
  try {
    const player = await playersModel.create(data);
    console.log(player);
    return replaceMongoIdInObject(player);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPlayers() {
  try {
    const players = await playersModel.find().lean();
    return replaceMongoIdInArray(players);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPlayerById(id) {
  try {
    const player = await playersModel.findById(id).lean();
    return replaceMongoIdInObject(player);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllPlayersByIds(ids) {
  try {
    const players = await playersModel.find({ _id: { $in: ids } }).lean();
    return replaceMongoIdInArray(players);
  } catch (error) {
    throw new Error(error);
  }
}
