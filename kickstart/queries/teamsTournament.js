import { matchModel } from "@/models/matches-model";
import { playersModel } from "@/models/players-model";
import { teamsModel } from "@/models/teams-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { ObjectId } from "mongodb";

export async function createTeamsTournamentList(data, tournamentId) {
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

export async function getTeamsTournamentById(teamId, tournamentId) {
  try {
    const teamTournament = await teamsTournamentModel
      .findOne({ teamId, tournamentId })
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

    const teamsTournamentUpdated = teamsTournament
      .map((team) => {
        let updateFields = { matchPlayed: 1 };

        if (
          team?.teamId?.toString() === matchDetails?.team1?.teamId?.toString()
        ) {
          if (matchDetails?.result?.team1 > matchDetails?.result?.team2) {
            updateFields.matchWon = 1;
          } else if (
            matchDetails?.result?.team1 < matchDetails?.result?.team2
          ) {
            updateFields.matchLost = 1;
          } else {
            updateFields.matchDraw = 1;
          }
          return {
            updateOne: {
              filter: { _id: team.id },
              update: { $inc: updateFields },
            },
          };
        } else if (
          team?.teamId?.toString() === matchDetails?.team2?.teamId?.toString()
        ) {
          if (matchDetails.result.team2 > matchDetails.result.team1) {
            updateFields.matchWon = 1;
          } else if (matchDetails.result.team2 < matchDetails.result.team1) {
            updateFields.matchLost = 1;
          } else {
            updateFields.matchDraw = 1;
          }
          return {
            updateOne: {
              filter: { _id: team.id },
              update: { $inc: updateFields },
            },
          };
        }

        return null;
      })
      .filter(Boolean);

    if (teamsTournamentUpdated.length > 0) {
      const result = await teamsTournamentModel.bulkWrite(
        teamsTournamentUpdated
      );
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateQuarterEnd(tournament) {
  try {
    const quarterMatches = await matchModel
      .find({ tournamentId: tournament.id, type: "quarter" })
      .lean();

    const semiMatches = await matchModel
      .find({ tournamentId: tournament.id, type: "semi" })
      .lean();

    const qf1Winner =
      quarterMatches[0].result.team1 > quarterMatches[0].result.team2
        ? quarterMatches[0].team1
        : quarterMatches[0].team2;

    const qf2Winner =
      quarterMatches[1].result.team1 > quarterMatches[1].result.team2
        ? quarterMatches[1].team1
        : quarterMatches[1].team2;

    const qf3Winner =
      quarterMatches[2].result.team1 > quarterMatches[2].result.team2
        ? quarterMatches[2].team1
        : quarterMatches[2].team2;

    const qf4Winner =
      quarterMatches[3].result.team1 > quarterMatches[3].result.team2
        ? quarterMatches[3].team1
        : quarterMatches[3].team2;

    const sf1 = await matchModel.findOneAndUpdate(
      { _id: semiMatches[0]._id },
      {
        $set: {
          team1: qf1Winner,
          team2: qf2Winner,
        },
      },
      { new: true }
    );

    const sf2 = await matchModel.findOneAndUpdate(
      { _id: semiMatches[1]._id },
      {
        $set: {
          team1: qf3Winner,
          team2: qf4Winner,
        },
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateSemiEnd(tournament) {
  try {
    const semiMatches = await matchModel
      .find({ tournamentId: tournament.id, type: "semi" })
      .lean();

    const sf1Winner =
      semiMatches[0].result.team1 > semiMatches[0].result.team2
        ? semiMatches[0].team1
        : semiMatches[0].team2;

    const sf1Loser =
      semiMatches[0].result.team1 < semiMatches[0].result.team2
        ? semiMatches[0].team1
        : semiMatches[0].team2;

    const sf2Winner =
      semiMatches[1].result.team1 > semiMatches[1].result.team2
        ? semiMatches[1].team1
        : semiMatches[1].team2;

    const sf2Loser =
      semiMatches[1].result.team1 < semiMatches[1].result.team2
        ? semiMatches[1].team1
        : semiMatches[1].team2;

    const finalMatch = await matchModel.findOneAndUpdate(
      { tournamentId: tournament.id, type: "final" },
      {
        $set: {
          team1: sf1Winner,
          team2: sf2Winner,
        },
      },
      { new: true }
    );

    if (tournament.isThirdPlace) {
      const thirdPlaceMatch = await matchModel.findOneAndUpdate(
        { tournamentId: tournament.id, type: "third" },
        {
          $set: {
            team1: sf1Loser,
            team2: sf2Loser,
          },
        },
        { new: true }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTeamsTMatches(tournamentId, teamId) {
  const teamObj = ObjectId.createFromHexString(teamId);

  try {
    const matches = await matchModel
      .find({
        tournamentId,
        $or: [{ "team1.teamId": teamObj }, { "team2.teamId": teamObj }],
      })
      .lean();

    return replaceMongoIdInArray(matches);
  } catch (error) {
    throw new Error(error);
  }
}
