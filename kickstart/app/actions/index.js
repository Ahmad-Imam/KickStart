"use server";

import { createGroups } from "@/queries/groups";
import { createMatches } from "@/queries/matches";
import {
  createPlayers,
  removeAddPlayersFromPrevCurrentTeam,
  updatePlayersTournament,
  updatePlayerTeam,
} from "@/queries/players";
import { createTeams, createTeamsN } from "@/queries/teams";
import { createTeamsTournamentList } from "@/queries/teamsTournament";
import { createTournaments } from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import { ca } from "date-fns/locale";
import { revalidatePath } from "next/cache";

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
    console.log("tournamentData action");
    console.log(tournament);
    const teamsTournament = await createTeamsTournamentList(
      data?.teamsTournament,
      tournament.id
    );
    console.log("teamsTournament");
    console.log(teamsTournament);

    const playersInTournamnet = await updatePlayersTournament(
      teamsTournament,
      tournament
    );

    const groups = await createGroups(
      data?.groupMatch,
      tournament?.id,
      data?.teamsQPerGroup,
      data?.teamsPerGroup
    );

    const allMatch = {
      groupMatch: data?.groupMatch,
      quarterMatch: data?.quarterMatch,
      semiMatch: data?.semiMatch,
      isThirdPlace: data?.isThirdPlace,
      // teamsQPerGroup: data?.teamsQPerGroup,
      teamsPerGroup: data?.teamsPerGroup,
    };

    const matches = await createMatches(
      allMatch,
      tournament?.id,
      data?.startDate
    );

    // console.log(teams);
    return tournament;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteAddPlayersFromPrevCurrentTeam(
  playersInTeam,
  teamsTournament
) {
  try {
    await dbConnect();
    console.log(playersInTeam);

    // console.log(teamsTournament.id);
    const playersUpdated = await removeAddPlayersFromPrevCurrentTeam(
      playersInTeam,
      teamsTournament
    );

    // console.log(playersUpdated);

    revalidatePath(`/tournament/${teamsTournament.id}`);
    // revalidatePath(`/tournament/${teamsTournament.id}/team/[teamId]`);
    console.log("newPlayers");
    // console.log(playersUpdated);
  } catch (error) {
    throw new Error(error);
  }
}
