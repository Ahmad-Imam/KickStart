import { groupsModel } from "@/models/groups-model";
import { matchModel } from "@/models/matches-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import { tournamentsModel } from "@/models/tournaments-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

export async function createTournaments(data, loggedUser) {
  try {
    const tournament = await tournamentsModel.create({
      ...data,
      admin: loggedUser?.id,
    });
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

export async function deleteTournament(tournamentId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      throw new Error("Invalid tournament ID");
    }
    //remove from groups table which has the same tournament id
    //remove from matches table which has the same tournament id

    const removedGroups = await groupsModel.deleteMany({ tournamentId });
    console.log("removedGrouops");
    const removedMatches = await matchModel.deleteMany({ tournamentId });
    console.log("removedmatches");
    const removedTeamsT = await teamsTournamentModel.deleteMany({
      tournamentId,
    });
    console.log("removedteamsT");
    const tournament = await tournamentsModel.findByIdAndDelete(tournamentId);
    // return replaceMongoIdInObject(tournament);
    console.log("removedtournemant");
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTournamentStatus(tournamentDetails, status) {
  try {
    if (!mongoose.Types.ObjectId.isValid(tournamentDetails?.id)) {
      throw new Error("Invalid tournament ID");
    }
    const tournament = await tournamentsModel.findByIdAndUpdate(
      tournamentDetails?.id,
      { status },
      { new: true }
    );
    return replaceMongoIdInObject(tournament);
  } catch (error) {
    throw new Error(error);
  }
}
