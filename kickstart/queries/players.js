import { playersModel } from "@/models/players-model";
import { teamsModel } from "@/models/teams-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";
import { tournamentsModel } from "@/models/tournaments-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

export async function createPlayers(data) {
  try {
    const player = await playersModel.create(data);
    const simplePlayerData = await playersModel.findById(player._id).lean();

    if (simplePlayerData.team) {
      const teamId = simplePlayerData.team;
      const team = await teamsModel.findById(teamId).lean();
      //update team with new player in the db
      team.players.push(player._id.toString());
      await teamsModel.findByIdAndUpdate(teamId, { players: team.players });
    }

    return replaceMongoIdInObject(simplePlayerData);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePlayerData(playerData, playerId) {
  try {
    const player = await playersModel.findByIdAndUpdate(playerId, playerData, {
      new: true,
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPlayers() {
  try {
    const players = await playersModel
      .find()
      .populate({
        path: "team",
        model: teamsModel,
      })
      .populate({
        path: "tournament",
        model: tournamentsModel,
        //todo check here
        // match: { status: "live" }, // Only populate tournaments with status "live"
      })
      .lean();

    //todo change upcoming to live later
    const filteredPlayers = players.filter(
      (player) => !player.tournament || player.tournament.status !== "live"
    );

    return replaceMongoIdInArray(filteredPlayers);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPlayerById(id) {
  try {
    const player = await playersModel
      .findById(id)
      .populate({
        path: "team",
        model: teamsModel,
      })
      .populate({
        path: "tournament",
        model: tournamentsModel,
        //todo check here
        // match: { status: "live" }, // Only populate tournaments with status "live"
      })
      .lean();
    return replaceMongoIdInObject(player);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllPlayersByIds(ids) {
  try {
    if (ids?.length === 0) {
      return [];
    }
    const players = await playersModel
      .find({ _id: { $in: ids } })
      .populate({
        path: "team",
        model: teamsModel,
      })
      .lean();
    return replaceMongoIdInArray(players);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTopScorers(playerScores) {
  try {
    if (playerScores?.length === 0) {
      return [];
    }

    // Extract player IDs from the input array
    const playerIds = playerScores?.map((player) => player.playerId);

    // Fetch player information from the playersModel
    const players = await playersModel
      .find({ _id: { $in: playerIds } })
      .populate({
        path: "team",
        model: teamsModel,
      })
      .lean();

    // Create a map of playerId to score for quick lookup
    const scoreMap = playerScores?.reduce((map, player) => {
      map[player.playerId] = player.score;
      return map;
    }, {});

    // Merge player information with the corresponding score
    const playersWithScores = players.map((player) => ({
      ...player,
      score: scoreMap[player._id],
    }));
    playersWithScores.sort((a, b) => b.score - a.score);

    return replaceMongoIdInArray(playersWithScores);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getYellowScorers(playerScores) {
  try {
    if (playerScores?.length === 0) {
      return [];
    }

    // Extract player IDs from the input array
    const playerIds = playerScores?.map((player) => player.playerId);

    // Fetch player information from the playersModel
    const players = await playersModel
      .find({ _id: { $in: playerIds } })
      .populate({
        path: "team",
        model: teamsModel,
      })
      .lean();

    // Create a map of playerId to score for quick lookup
    const scoreMap = playerScores?.reduce((map, player) => {
      map[player.playerId] = player.score;
      return map;
    }, {});

    // Merge player information with the corresponding score
    const playersWithScores = players.map((player) => ({
      ...player,
      yellow: scoreMap[player._id],
    }));
    playersWithScores.sort((a, b) => b.score - a.score);

    return replaceMongoIdInArray(playersWithScores);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getRedScorers(playerScores) {
  try {
    if (playerScores?.length === 0) {
      return [];
    }

    // Extract player IDs from the input array
    const playerIds = playerScores?.map((player) => player.playerId);

    // Fetch player information from the playersModel
    const players = await playersModel
      .find({ _id: { $in: playerIds } })
      .populate({
        path: "team",
        model: teamsModel,
      })
      .lean();

    // Create a map of playerId to score for quick lookup
    const scoreMap = playerScores?.reduce((map, player) => {
      map[player.playerId] = player.score;
      return map;
    }, {});

    // Merge player information with the corresponding score
    const playersWithScores = players.map((player) => ({
      ...player,
      red: scoreMap[player._id],
    }));
    playersWithScores.sort((a, b) => b.score - a.score);

    return replaceMongoIdInArray(playersWithScores);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePlayerTeam(playersInTeam, teamsId) {
  try {
    // const newPlayers = await playersModel.updateMany(
    //   { _id: { $in: playersInTeam } },
    //   { team: teamsId }
    // );
    const newPlayers = await Promise.all(
      playersInTeam.map(async (playerId) => {
        const player = await playersModel.findById(playerId).lean();

        if (player?.team) {
          // Remove player from team table

          const updatedTeam = await teamsModel.updateOne(
            { _id: player?.team.toString() },
            { $pull: { players: playerId.toString() } }
          );
        }

        return playersModel
          .findByIdAndUpdate(playerId, { team: teamsId }, { new: true })
          .lean();
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePlayersTournament(teamsTournament, tournament) {
  try {
    const newPlayers = await Promise.all(
      teamsTournament.map(async (team) => {
        const playerUpdates = team.players.map((playerId) => ({
          updateOne: {
            filter: { _id: playerId },
            update: { tournament: tournament.id },
            upsert: false,
          },
        }));

        const result = await playersModel.bulkWrite(playerUpdates);
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeFromPrevAddPlayersToCurrentTeamTeamsT(
  playersInTeam,
  teamsTournament
) {
  try {
    const teamsTId = teamsTournament.id;

    const newPlayers = await Promise.all(
      playersInTeam.map(async (player) => {
        const prevTeamId = player?.team?._id;
        //player is in a team table - player has a team id?
        if (prevTeamId) {
          const prevTeamsTournament = await teamsTournamentModel
            .findOne({
              teamId: prevTeamId,
              tournamentId: teamsTournament.tournamentId,
            })
            .lean();

          //if player team is in a tournament
          if (prevTeamsTournament) {
            //remove player from teamsTournament table
            prevTeamsTournament.players = prevTeamsTournament.players.filter(
              (p) => p !== player.id
            );

            const prevTeamsT = await teamsTournamentModel.findOneAndUpdate(
              {
                teamId: prevTeamId,
                tournamentId: teamsTournament.tournamentId,
              },
              {
                players: prevTeamsTournament.players,
              }
            );

            //   //add player to teamsTournament

            const currentTeamsTournament = await teamsTournamentModel
              .findOne({
                teamId: teamsTournament.teamId,
                tournamentId: teamsTournament.tournamentId,
              })
              .lean();

            currentTeamsTournament.players.push(player.id);
            const newTeamsT = await teamsTournamentModel.findOneAndUpdate(
              {
                teamId: teamsTournament.teamId,
                tournamentId: teamsTournament.tournamentId,
              },
              {
                players: currentTeamsTournament.players,
              }
            );
          } else {
            const currentTeamsTournament = await teamsTournamentModel
              .findOne({
                teamId: teamsTournament.teamId,
                tournamentId: teamsTournament.tournamentId,
              })
              .lean();

            currentTeamsTournament.players.push(player.id);
            const newTeamsT = await teamsTournamentModel.findOneAndUpdate(
              {
                teamId: teamsTournament.teamId,
                tournamentId: teamsTournament.tournamentId,
              },
              {
                players: currentTeamsTournament.players,
              }
            );
          }
        }
        //player is not in a team table
        else {
          //ok

          //add player to city teamsTournament

          const currentTeamsTournament = await teamsTournamentModel
            .findOne({
              teamId: teamsTournament.teamId,
              tournamentId: teamsTournament.tournamentId,
            })
            .lean();

          currentTeamsTournament.players.push(player.id);
          const newTeamsT = await teamsTournamentModel.findOneAndUpdate(
            {
              teamId: teamsTournament.teamId,
              tournamentId: teamsTournament.tournamentId,
            },
            {
              players: currentTeamsTournament.players,
            }
          );
        }
        return player;
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeFromPrevAddPlayersToCurrentTeam(
  playersInTeam,
  team
) {
  try {
    const teamsTId = team.id;

    const newPlayers = await Promise.all(
      playersInTeam.map(async (player) => {
        //player is in a team table - player has a team id?

        // remove player from chelsea team
        if (player?.team) {
          const updatedTeam = await teamsModel.updateOne(
            { _id: player?.team },
            { $pull: { players: player.id } }
          );
        }

        //add player to city team table
        const currentTeam = await teamsModel.findById(team.id).lean();

        currentTeam.players.push(player.id);
        const newTeam = await teamsModel.findByIdAndUpdate(team.id, {
          players: currentTeam.players,
        });

        //add city to players table

        const playerCurrent = await playersModel.findByIdAndUpdate(player.id, {
          team: team.id,
        });

        return player;
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlayersFromCurrentTeamTeamsT(
  playersInTeam,
  teamsTournament
) {
  try {
    const teamsTId = teamsTournament.id;

    const newPlayers = await Promise.all(
      playersInTeam.map(async (player) => {
        const prevTeamId = player?.team?._id;

        const prevTeamsTournament = await teamsTournamentModel
          .findOne({
            teamId: prevTeamId,
            tournamentId: teamsTournament.tournamentId,
          })
          .lean();
        //remove player from teamsTournament table
        prevTeamsTournament.players = prevTeamsTournament.players.filter(
          (p) => p !== player.id
        );

        const prevTeamsT = await teamsTournamentModel.findOneAndUpdate(
          {
            teamId: prevTeamId,
            tournamentId: teamsTournament.tournamentId,
          },
          {
            players: prevTeamsTournament.players,
          }
        );

        return player;
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlayersFromCurrentTeam(playersInTeam, team) {
  try {
    const newPlayers = await Promise.all(
      playersInTeam.map(async (player) => {
        // Remove player from team table
        const updatedTeam = await teamsModel.updateOne(
          { _id: team?.id },
          { $pull: { players: player.id } }
        );

        //remove team,tournament from player table
        const updatedPlayers = await playersModel.findByIdAndUpdate(player.id, {
          team: null,
        });

        return player;
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}
