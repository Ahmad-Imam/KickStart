import { tournamentsModel } from "@/models/tournaments-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

export async function createTournaments(data) {
  try {
    const tournament = await tournamentsModel.create(data);
    const simpleTournamentData = await tournamentsModel
      .findById(tournament._id)
      .lean();
    console.log(tournament);
    return replaceMongoIdInObject(simpleTournamentData);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTournamentById(tournamentId) {
  try {
    console.log(tournamentId);
    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      throw new Error("Invalid tournament ID");
    }
    const tournament = await tournamentsModel.findById(tournamentId).lean();
    // console.log(tournament);

    return replaceMongoIdInObject(tournament);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllTournaments() {
  try {
    const tournaments = await tournamentsModel.find().lean();
    return replaceMongoIdInArray(tournaments);
  } catch (error) {
    throw new Error(error);
  }
}
