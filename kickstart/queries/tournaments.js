import { groupsModel } from "@/models/groups-model";
import { matchModel } from "@/models/matches-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import { tournamentsModel } from "@/models/tournaments-model";
import { userModel } from "@/models/user-model";
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

    //add tournament id to user admin array

    const user = await userModel.findByIdAndUpdate(
      loggedUser?.id,
      { $push: { admin: tournament._id.toString() } },
      { new: true }
    );

    const simpleTournamentData = await tournamentsModel
      .findById(tournament._id)
      .lean();

    return replaceMongoIdInObject(simpleTournamentData);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTournamentById(tournamentId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      throw new Error("Invalid tournament ID");
    }
    const tournament = await tournamentsModel.findById(tournamentId).lean();

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

    const removedGroups = await groupsModel.deleteMany({ tournamentId });

    const removedMatches = await matchModel.deleteMany({ tournamentId });

    const removedTeamsT = await teamsTournamentModel.deleteMany({
      tournamentId,
    });

    const tournament = await tournamentsModel.findByIdAndDelete(tournamentId);
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

export async function removePrevModeratorsFromCurrentTournament(
  moderatorList,
  tournamentDetails
) {
  //remove moderators from tournamnet moderators array
  try {
    const newTournament = await Promise.all(
      moderatorList.map(async (user) => {
        // Remove player from team table
        const updatedTournament = await tournamentsModel.updateOne(
          { _id: tournamentDetails?.id },
          { $pull: { moderators: user.id } }
        );

        //remove team,tournament from player table
        const updatedUsers = await userModel.findByIdAndUpdate(user.id, {
          $pull: { moderator: tournamentDetails.id },
        });

        return user;
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function addModeratorsToCurrentTournament(
  moderatorList,
  tournamentDetails
) {
  //remove moderators from tournamnet moderators array
  try {
    const newTournament = await Promise.all(
      moderatorList.map(async (user) => {
        // Remove player from team table
        const updatedTournament = await tournamentsModel.updateOne(
          { _id: tournamentDetails?.id },
          { $push: { moderators: user.id } }
        );

        const updatedUsers = await userModel.findByIdAndUpdate(user.id, {
          $push: { moderator: tournamentDetails.id },
        });

        return user;
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}
