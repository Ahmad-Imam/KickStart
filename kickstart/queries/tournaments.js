import { tournamentsModel } from "@/models/tournaments-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

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
