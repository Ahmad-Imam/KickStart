"use server";

import { createPlayers, updatePlayerTeam } from "@/queries/players";
import { createTeams, createTeamsN } from "@/queries/teams";
import { createTournaments } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import { ca } from "date-fns/locale";

export async function addTeams(data) {
  try {
    await dbConnect();
    console.log(data);
    const teams = await createTeams(data);
    console.log("teamData action");
    console.log(teams);
    return teams;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addTeamsN(data, n) {
  try {
    await dbConnect();
    console.log(data);
    const teams = await createTeamsN(data, n);
    // console.log(teams);
    // return user;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addPlayers(data) {
  try {
    await dbConnect();
    console.log(data);
    const player = await createPlayers(data);
    // console.log(teams);
    // return user;
  } catch (error) {
    throw new Error(error);
  }
}

export async function editPlayerTeam(playersInTeam, teamsId) {
  try {
    await dbConnect();
    console.log(playersInTeam);
    console.log(teamsId);
    const playersUpdated = await updatePlayerTeam(playersInTeam, teamsId);
    console.log("newPlayers");
    console.log(playersUpdated);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addTournaments(data) {
  try {
    await dbConnect();
    console.log(data);
    const tournament = await createTournaments(data);
    // console.log(teams);
    return tournament;
  } catch (error) {
    throw new Error(error);
  }
}
