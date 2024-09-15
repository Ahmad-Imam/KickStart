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
    const tournamentDataList = data?.map((team) => ({
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

    console.log("teamsTournamentList created");

    const teamsTournament = await teamsTournamentModel
      .find({ tournamentId })
      .lean();

    return replaceMongoIdInArray(teamsTournament);
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

export async function updateMatchPlayedTeamsT(matchDetails, tournament) {
  try {
    const teamsTournament = await getTeamsTournamentByTournamentId(
      tournament.id
    );
    // console.log(teamsTournament);
    // console.log(matchDetails);

    const teamsTournamentUpdated = teamsTournament
      .map((team) => {
        if (team.teamId.toString() === matchDetails.team1.id.toString()) {
          console.log("team1");
          return {
            updateOne: {
              filter: { _id: team.id },
              update: { $inc: { matchPlayed: 1 } },
            },
          };
        }

        if (team.teamId.toString() === matchDetails.team2.id.toString()) {
          console.log("team2");
          return {
            updateOne: {
              filter: { _id: team.id },
              update: { $inc: { matchPlayed: 1 } },
            },
          };
        }

        return null;
      })
      .filter(Boolean);

    console.log("teasmtournament updated");
    // console.log(teamsTournamentUpdated);
    if (teamsTournamentUpdated.length > 0) {
      const result = await teamsTournamentModel.bulkWrite(
        teamsTournamentUpdated
      );
      console.log("match Played updated");
      // return replaceMongoIdInArray(result);
    } else {
      console.log("No teams to update");
      return [];
    }

    // return replaceMongoIdInArray(teamsTournamentUpdatedList);
  } catch (error) {
    throw new Error(error);
  }
}
