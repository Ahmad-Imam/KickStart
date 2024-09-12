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
      team.players.push(player._id);
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

export async function updatePlayerTeam(playersInTeam, teamsId) {
  try {
    // const newPlayers = await playersModel.updateMany(
    //   { _id: { $in: playersInTeam } },
    //   { team: teamsId }
    // );
    const newPlayers = await Promise.all(
      playersInTeam.map(async (playerId) =>
        playersModel.findByIdAndUpdate(
          playerId,
          { team: teamsId },
          { new: false }
        )
      )
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

export async function removeAddPlayersFromPrevCurrentTeam(
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
        if (prevTeamId) {
          console.log("inside");
          console.log("newTeams");

          //remove from chelsea team Tournament
          const prevTeamsTournament = await teamsTournamentModel
            .findOne({ teamId: prevTeamId })
            .lean();

          console.log("prevTeamsTournament");
          console.log(prevTeamsTournament);

          if (prevTeamsTournament) {
            console.log("before filter");
            console.log(prevTeamsTournament.players);

            prevTeamsTournament.players = prevTeamsTournament.players.filter(
              (p) => p !== player.id
            );

            console.log("after filter");
            console.log(prevTeamsTournament.players);

            const prevTeamsT = await teamsTournamentModel.findOneAndUpdate(
              { teamId: prevTeamId },
              {
                players: prevTeamsTournament.players,
              }
            );
            console.log("prevTeamsT");
            console.log(prevTeamsT);
          }

          //remove chelsea from teams table
          const prevTeam = await teamsModel.findById(prevTeamId).lean();

          prevTeam.players = prevTeam.players.filter((p) => p !== player.id);

          console.log("after filter team");
          console.log(prevTeam.players);

          const prevTeamsT = await teamsModel.findByIdAndUpdate(prevTeamId, {
            players: prevTeam.players,
          });

          console.log(prevTeamsT);

          //remove chelsea from player table
          // const playerPrev = await playersModel.findByIdAndUpdate(player.id, {
          //   team: new mongoose.Types.ObjectId(),
          // });
          // console.log(playerPrev);

          console.log(teamsTId);
          //add player to city teamsTournament

          const currentTeamsTournament = await teamsTournamentModel
            .findOne({ teamId: teamsTournament.teamId })
            .lean();

          console.log("currentTeamsTournament");
          console.log(currentTeamsTournament);
          currentTeamsTournament.players.push(player.id);
          const newTeamsT = await teamsTournamentModel.findOneAndUpdate(
            { teamId: teamsTournament.teamId },
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
          console.log(currentTeam.players);
          const newTeam = await teamsModel.findByIdAndUpdate(
            teamsTournament.teamId,
            {
              players: currentTeam.players,
            }
          );
          console.log("newTeam");
          console.log(newTeam);

          //add city to players table

          const testPlayer = await playersModel.findById(player.id).lean();

          console.log("testPlayer");
          console.log(testPlayer);
          console.log(player.id);
          // console.log(teamsTId);

          const playerCurrent = await playersModel.findByIdAndUpdate(
            player.id,
            { team: teamsTournament.teamId }
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
