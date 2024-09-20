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
    console.log("player created");
    console.log(replaceMongoIdInObject(simplePlayerData));

    if (simplePlayerData.team) {
      const teamId = simplePlayerData.team;
      const team = await teamsModel.findById(teamId).lean();
      //update team with new player in the db
      team.players.push(player._id.toString());
      await teamsModel.findByIdAndUpdate(teamId, { players: team.players });

      console.log("team found");
      console.log(replaceMongoIdInObject(team));
    }

    return replaceMongoIdInObject(simplePlayerData);
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
        // match: { status: "live" }, // Only populate tournaments with status "live"
      })
      .lean();

    console.log("players query");
    // console.log(replaceMongoIdInArray(players));

    //todo change upcoming to live later
    const filteredPlayers = players.filter(
      (player) => !player.tournament || player.tournament.status !== "live"
    );

    // console.log(filteredPlayers);
    return replaceMongoIdInArray(filteredPlayers);
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
  console.log(playerScores.length);
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
  console.log(playerScores.length);
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
  console.log(playerScores.length);
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
          console.log("player old team");
          console.log(playerId);
          console.log(player?.team.toString());

          const updatedTeam = await teamsModel.updateOne(
            { _id: player?.team.toString() },
            { $pull: { players: playerId.toString() } }
          );
          console.log(updatedTeam);
        }

        return playersModel
          .findByIdAndUpdate(playerId, { team: teamsId }, { new: true })
          .lean();
      })
    );

    console.log("newPlayers query");
    console.log(replaceMongoIdInArray(newPlayers));
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePlayersTournament(teamsTournament, tournament) {
  try {
    console.log("players");

    // const newPlayers = await Promise.all(
    //   teamsTournament.map(async (team) => {
    //     const teamId = team.teamId;
    //     const players = team.players;
    //     const newPlayers = await Promise.all(
    //       players.map(async (playerId) => {

    //         console.log("playerId");

    //         await playersModel.findByIdAndUpdate(
    //           playerId,
    //           { tournament: tournament.id },
    //           { new: false }
    //         );
    //       })
    //     );
    //     console.log("newPlayers query");
    //     console.log(replaceMongoIdInArray(newPlayers));
    //   })
    // );

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
        console.log("newPlayers query");
        // console.log(result);
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeFromPrevAddPlayersToCurrentTeam(
  playersInTeam,
  teamsTournament
) {
  try {
    console.log("removeAddPlayersFromPrevCurrentTeam");
    console.log(playersInTeam);
    // console.log(teamsTournament);

    const teamsTId = teamsTournament.id;

    const newPlayers = await Promise.all(
      playersInTeam.map(async (player) => {
        const prevTeamId = player?.team?._id;
        //player is in a team table - player has a team id?
        if (prevTeamId) {
          console.log("inside");
          console.log("newTeams");

          const prevTeamsTournament = await teamsTournamentModel
            .findOne({
              teamId: prevTeamId,
              tournamentId: teamsTournament.tournamentId,
            })
            .lean();

          //if player team is in a tournament
          if (prevTeamsTournament) {
            //ok
            console.log("prevTeamsTournament");
            // console.log(prevTeamsTournament);
            //remove player from teamsTournament table
            prevTeamsTournament.players = prevTeamsTournament.players.filter(
              (p) => p !== player.id
            );
            console.log("after filter");
            console.log(prevTeamsTournament);

            const prevTeamsT = await teamsTournamentModel.findOneAndUpdate(
              {
                teamId: prevTeamId,
              },
              {
                players: prevTeamsTournament.players,
              }
            );
            console.log("prevTeamsT");
            console.log(prevTeamsT);

            // Remove player from team table
            const updatedTeam = await teamsModel.updateOne(
              { _id: prevTeamId },
              { $pull: { players: player.id } }
            );
            console.log("updatedTeam");
            console.log(updatedTeam);

            //add player to teamsTournament

            const currentTeamsTournament = await teamsTournamentModel
              .findOne({
                teamId: teamsTournament.teamId,
                tournamentId: teamsTournament.tournamentId,
              })
              .lean();

            console.log("currentTeamsTournament");
            console.log(currentTeamsTournament);
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
            console.log("newTeamsT");
            console.log(newTeamsT);

            //add player to team table
            const currentTeam = await teamsModel
              .findById(teamsTournament.teamId)
              .lean();
            console.log(currentTeam);
            currentTeam.players.push(player.id);
            console.log(currentTeam.players);
            const newTeam = await teamsModel.findByIdAndUpdate(
              teamsTournament.teamId,
              {
                players: currentTeam.players,
              }
            );
            console.log("newTeam");
            console.log(newTeam);
            //remove old team from player table and add team to player table
            const playerCurrent = await playersModel.findByIdAndUpdate(
              player.id,
              { team: teamsTournament.teamId }
            );
            console.log(playerCurrent);
          }
          //if player team is not in a tournament
          else {
            //ok
            console.log("not in tournament");

            // Remove player from team table
            const updatedTeam = await teamsModel.updateOne(
              { _id: prevTeamId },
              { $pull: { players: player.id } }
            );
            console.log(updatedTeam);

            //add team,tournament to player table
            const updatedPlayers = await playersModel.findByIdAndUpdate(
              player.id,
              {
                team: teamsTournament.teamId,
                tournament: teamsTournament.tournamentId,
              }
            );

            console.log(updatedPlayers);

            //add player to teamsTournament

            const currentTeamsTournament = await teamsTournamentModel
              .findOne({
                teamId: teamsTournament.teamId,
                tournamentId: teamsTournament.tournamentId,
              })
              .lean();

            console.log("currentTeamsTournament");
            console.log(currentTeamsTournament);
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
            console.log("newTeamsT");
            console.log(newTeamsT);

            //add player to team table
            const currentTeam = await teamsModel
              .findById(teamsTournament.teamId)
              .lean();
            console.log(currentTeam);
            currentTeam.players.push(player.id);
            console.log(currentTeam.players);
            const newTeam = await teamsModel.findByIdAndUpdate(
              teamsTournament.teamId,
              {
                players: currentTeam.players,
              }
            );
            console.log("newTeam");
            console.log(newTeam);
          }
        }
        //player is not in a team table
        else {
          //ok
          console.log("outside");
          console.log("newTeams");

          //add player to city teamsTournament

          const currentTeamsTournament = await teamsTournamentModel
            .findOne({
              teamId: teamsTournament.teamId,
              tournamentId: teamsTournament.tournamentId,
            })
            .lean();

          console.log("currentTeamsTournament");
          console.log(currentTeamsTournament);
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
          console.log("newTeamsT");
          console.log(newTeamsT);

          //add player to city team table
          const currentTeam = await teamsModel
            .findById(teamsTournament.teamId)
            .lean();
          console.log(currentTeam);
          currentTeam.players.push(player.id);
          const newTeam = await teamsModel.findByIdAndUpdate(
            teamsTournament.teamId,
            {
              players: currentTeam.players,
            }
          );
          console.log("newTeam");
          console.log(newTeam);

          //add city,tournament to players table

          console.log(player.id);
          const playerCurrent = await playersModel.findByIdAndUpdate(
            player.id,
            {
              team: teamsTournament.teamId,
              tournament: teamsTournament.tournamentId,
            }
          );
          console.log(playerCurrent);
        }
        return player;
      })
    );

    console.log("newPlayers query");
    // console.log(replaceMongoIdInArray(newPlayers));
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlayersFromCurrentTeam(
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
        console.log("after filter");
        console.log(prevTeamsTournament);

        const prevTeamsT = await teamsTournamentModel.findOneAndUpdate(
          {
            teamId: prevTeamId,
          },
          {
            players: prevTeamsTournament.players,
          }
        );
        console.log("prevTeamsT");
        console.log(prevTeamsT);

        console.log("removePlayersFromCurrentTeam");

        // Remove player from team table
        const updatedTeam = await teamsModel.updateOne(
          { _id: prevTeamId },
          { $pull: { players: player.id } }
        );
        console.log(updatedTeam);

        //remove team,tournament from player table
        const updatedPlayers = await playersModel.findByIdAndUpdate(player.id, {
          team: null,
          tournament: null,
        });

        return player;
      })
    );

    console.log("newPlayers query delete");
    // console.log(replaceMongoIdInArray(newPlayers));
  } catch (error) {
    throw new Error(error);
  }
}
