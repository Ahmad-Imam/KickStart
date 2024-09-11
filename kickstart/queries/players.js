import { playersModel } from "@/models/players-model";
import { teamsModel } from "@/models/teams-model";
import { teamsTournamentModel } from "@/models/teamsTournament-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

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
      .lean();
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
          // Fetch the team and update its players
          console.log("inside");
          //remove from chelsea og
          // const team = await teamsModel.findById(prevTeamId).lean();
          // console.log(team);
          // team.players = team.players.filter((p) => p !== player.id);
          // const newTeams = await teamsModel.findByIdAndUpdate(prevTeamId, {
          //   players: team.players,
          // });

          // console.log(newTeams);

          console.log("newTeams");
          //remove from chelsea team Tournament
          const prevTeamsTournament = await teamsTournamentModel
            .findOne({ teamId: prevTeamId })
            .lean();

          console.log("prevTeamsTournament");
          console.log(prevTeamsTournament);

          console.log("before filter");
          console.log(prevTeamsTournament.players);
          console.log(player.id);

          prevTeamsTournament.players = prevTeamsTournament.players.filter(
            (p) => p !== player.id
          );

          console.log("after filter");
          console.log(prevTeamsTournament.players);
          console.log(player.id);

          const prevTeamsT = await teamsTournamentModel.findOneAndUpdate(
            { teamId: prevTeamId },
            {
              players: prevTeamsTournament.players,
            }
          );

          console.log("prevTeamsT");
          console.log(prevTeamsT);
          //add to city team Tournament

          // Fetch the teamsTournament and update its players
          const currentTeamsTournament = await teamsTournamentModel
            .findById(teamsTId)
            .lean();

          currentTeamsTournament.players.push(player.id);
          const newTeamsT = await teamsTournamentModel.findByIdAndUpdate(
            teamsTId,
            {
              players: currentTeamsTournament.players,
            }
          );
          console.log("newTeamsT");
          console.log(newTeamsT);
          // Update the player with the new team
          // return playersModel.findByIdAndUpdate(player.id, { team: teamsTId });
        }
        return player;
      })
    );

    console.log("newPlayers query");
    console.log(replaceMongoIdInArray(newPlayers));
  } catch (error) {
    throw new Error(error);
  }
}
