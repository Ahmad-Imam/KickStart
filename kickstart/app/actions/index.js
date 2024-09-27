"use server";

import { createGroups, updateMatchPlayedGroups } from "@/queries/groups";
import {
  addTiebreaker,
  createMatches,
  finishTieBreaker,
  getMatchesLeftGroup,
  getMatchesLeftQuarter,
  getMatchesLeftSemi,
  updateGroupEnd,
  updateMatchGoal,
  updateMatchPlayedQuarter,
  updateMatchStatus,
  updateMatchCard,
  updateTiebreaker,
  updateMatchData,
  updateMatchMOTM,
  updateTournamentEvent,
} from "@/queries/matches";
import {
  createPlayers,
  removeFromPrevAddPlayersToCurrentTeam,
  removeFromPrevAddPlayersToCurrentTeamTeamsT,
  removePlayersFromCurrentTeam,
  removePlayersFromCurrentTeamTeamsT,
  updatePlayerData,
  updatePlayersTournament,
  updatePlayerTeam,
} from "@/queries/players";
import { createTeams, createTeamsN } from "@/queries/teams";
import {
  createTeamsTournamentList,
  updateMatchPlayedTeamsT,
  updateQuarterEnd,
  updateSemiEnd,
} from "@/queries/teamsTournament";
import {
  addModeratorsToCurrentTournament,
  createTournaments,
  deleteTournament,
  getTournamentById,
  removePrevModeratorsFromCurrentTournament,
  updateTournamentStatus,
} from "@/queries/tournaments";
import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInObject } from "@/utils/data-util";
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
    return player;
  } catch (error) {
    throw new Error(error);
  }
}

export async function editPlayerData(playerData, playerId) {
  try {
    await dbConnect();
    // console.log(data);
    const player = await updatePlayerData(playerData, playerId);
    // console.log(teams);
    // return user;
    revalidatePath(`/player/${playerId}`);
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

export async function addTournaments(data, loggedUser) {
  try {
    await dbConnect();
    console.log(data);
    const tournament = await createTournaments(data, loggedUser);
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

    if (data?.groupsNum * data?.teamsPerGroup > 2) {
      const groups = await createGroups(
        data?.groupMatch,
        tournament?.id,
        data?.teamsQPerGroup,
        data?.teamsPerGroup
      );
    }

    console.log("groups created");

    const allMatch = {
      groupMatch: data?.groupMatch,
      quarterMatch: data?.quarterMatch,
      semiMatch: data?.semiMatch,
      isThirdPlace: data?.isThirdPlace,
      // teamsQPerGroup: data?.teamsQPerGroup,
      groupsNum: data?.groupsNum,
      teamsPerGroup: data?.teamsPerGroup,
    };

    console.log("allMatch");
    // console.log(allMatch);

    const matches = await createMatches(allMatch, tournament, data?.startDate);

    // console.log(teams);
    return tournament;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteFromPrevAddPlayersToCurrentTeamTeamsT(
  playersInTeam,
  teamsTournament
) {
  try {
    await dbConnect();
    console.log(playersInTeam);

    // console.log(teamsTournament.id);
    const playersUpdated = await removeFromPrevAddPlayersToCurrentTeamTeamsT(
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

export async function deleteFromPrevAddPlayersToCurrentTeam(
  playersInTeam,
  team
) {
  try {
    await dbConnect();
    console.log(playersInTeam);

    // console.log(teamsTournament.id);
    const playersUpdated = await removeFromPrevAddPlayersToCurrentTeam(
      playersInTeam,
      team
    );

    // console.log(playersUpdated);

    revalidatePath(`/team/${team.id}`);
    // revalidatePath(`/tournament/${teamsTournament.id}/team/[teamId]`);
    console.log("newPlayers");
    // console.log(playersUpdated);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deletePlayersFromCurrentTeamTeamsT(
  playersInTeam,
  teamsTournament
) {
  try {
    await dbConnect();
    console.log(playersInTeam);

    // console.log(teamsTournament.id);
    const playersUpdated = await removePlayersFromCurrentTeamTeamsT(
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

export async function deletePlayersFromCurrentTeam(playersInTeam, team) {
  try {
    await dbConnect();
    console.log(playersInTeam);

    // console.log(teamsTournament.id);
    const playersUpdated = await removePlayersFromCurrentTeam(
      playersInTeam,
      team
    );

    // console.log(playersUpdated);

    revalidatePath(`/team/${team.id}`);
    // revalidatePath(`/tournament/${teamsTournament.id}/team/[teamId]`);
    console.log("newPlayers");
    // console.log(playersUpdated);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editMatchStatus(matchDetails, status) {
  try {
    await dbConnect();
    // console.log(matchId);
    console.log(status);
    // const player = await createPlayers(data);
    // console.log(teams);
    // return user;
    const tournament = await getTournamentById(matchDetails?.tournamentId);

    console.log("tournament");
    // console.log(tournament.name);
    // console.log(matchDetails);
    // console.log(status);
    const newMatch = await updateMatchStatus(matchDetails, status, tournament);
    console.log("status updated");
    if (status === "finished") {
      console.log("inside finished");
      const newTeamsT = await updateMatchPlayedTeamsT(matchDetails, tournament);
      console.log("newTeamsTTTTT");
      if (matchDetails?.type === "group") {
        const newGroups = await updateMatchPlayedGroups(
          matchDetails,
          tournament
        );
        console.log("newGroups");
        // console.log(newGroups);
        const matchesLeft = await getMatchesLeftGroup(tournament);
        console.log("matchesLeft");
        console.log(matchesLeft);
        if (matchesLeft === "done") {
          const newTeamsList = await updateGroupEnd(tournament);
          console.log("newTeamsList");
        }
      } else if (matchDetails?.type === "quarter") {
        console.log("quarter");

        const matchesLeftQ = await getMatchesLeftQuarter(tournament);
        console.log("matchesLeft");
        console.log(matchesLeftQ);

        if (matchesLeftQ === "done") {
          const newTeamsList = await updateQuarterEnd(tournament);
          console.log("newTeamsList");
        }
      } else if (matchDetails?.type === "semi") {
        console.log("semi");
        const matchesLeftS = await getMatchesLeftSemi(tournament);
        console.log("matchesLeft");
        console.log(matchesLeftS);

        if (matchesLeftS === "done") {
          const newTeamsList = await updateSemiEnd(tournament);
          console.log("newTeamsList");
        }
      } else if (matchDetails?.type === "third") {
        const winner =
          matchDetails?.result?.team1 > matchDetails?.result?.team2
            ? matchDetails?.team1
            : matchDetails?.team2;
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();

        console.log("in thirddddddddddddd");

        const tournamentEvent = {
          type: "fulltime",
          time: currentTime,
          date: currentDate,
          description: `${winner?.name} won the third place!!! 🥉`,
          matchId: matchDetails?.id,
        };

        const updateTEvent = await updateTournamentEvent(
          tournamentEvent,
          matchDetails.tournamentId
        );

        console.log("updateTEvent thirdddddd");
      } else if (matchDetails?.type === "final") {
        const winner =
          matchDetails?.result?.team1 > matchDetails?.result?.team2
            ? matchDetails?.team1
            : matchDetails?.team2;
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();

        const tournamentEvent = {
          type: "fulltime",
          time: currentTime,
          date: currentDate,
          description: `${winner?.name} are the Champions!!! 🏆`,
          matchId: matchDetails?.id,
        };

        const updateTEvent = await updateTournamentEvent(
          tournamentEvent,
          matchDetails.tournamentId
        );
      }
    }

    console.log("after live");

    revalidatePath(`/tournament/${tournament.id}`);
    revalidatePath(`/tournament/${tournament.id}/match/${matchDetails.id}`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addGoalToMatch(gfTeam, gaTeam, player, matchDetails) {
  try {
    await dbConnect();
    console.log(gfTeam);
    console.log(gaTeam);
    console.log(player);
    console.log(matchDetails);
    const match = await updateMatchGoal(
      replaceMongoIdInObject(gfTeam),
      replaceMongoIdInObject(gaTeam),
      player,
      matchDetails
    );
    console.log("match");
    console.log(match);

    revalidatePath(`/tournament/${matchDetails.tournamentId}`);
    revalidatePath(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function addCardToMatch(team, player, matchDetails, type) {
  try {
    await dbConnect();
    console.log(team);
    console.log(player);
    console.log(matchDetails);
    const match = await updateMatchCard(
      replaceMongoIdInObject(team),
      player,
      matchDetails,
      type
    );
    console.log("match");
    // console.log(match);

    revalidatePath(`/tournament/${matchDetails.tournamentId}`);
    revalidatePath(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function startTiebreaker(matchDetails) {
  try {
    await dbConnect();
    console.log(matchDetails);

    const tiebreaker = await addTiebreaker(matchDetails);
    console.log("tiebreaker");
    // console.log(tiebreaker);

    revalidatePath(`/tournament/${matchDetails.tournamentId}`);
    revalidatePath(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function editTiebreaker(matchDetails, teamId, index, result) {
  try {
    await dbConnect();
    console.log(matchDetails);
    console.log(teamId);
    console.log(index);
    console.log(result);
    const tiebreaker = await updateTiebreaker(
      matchDetails,
      teamId,
      index,
      result
    );
    console.log("tiebreaker");
    console.log(tiebreaker);

    revalidatePath(`/tournament/${matchDetails.tournamentId}`);
    revalidatePath(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function endTiebreaker(matchDetails) {
  try {
    await dbConnect();
    console.log(matchDetails);
    const tiebreaker = await finishTieBreaker(matchDetails);
    console.log("tiebreaker");
    console.log(tiebreaker);

    revalidatePath(`/tournament/${matchDetails.tournamentId}`);
    revalidatePath(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function editMatchData(matchData, matchDetails) {
  try {
    await dbConnect();
    console.log(matchData);
    console.log(matchDetails);
    const match = await updateMatchData(matchData, matchDetails);
    console.log("match");
    console.log(match);

    revalidatePath(`/tournament/${matchDetails.tournamentId}`);
    revalidatePath(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function addMOTMToMatch(team, player, matchDetails) {
  try {
    await dbConnect();
    console.log(team);
    console.log(player);
    console.log(matchDetails);
    const match = await updateMatchMOTM(team, player, matchDetails);
    console.log("match");
    console.log(match);

    revalidatePath(`/tournament/${matchDetails.tournamentId}`);
    revalidatePath(
      `/tournament/${matchDetails.tournamentId}/match/${matchDetails.id}`
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeTournament(tournamentId) {
  try {
    await dbConnect();
    console.log(tournamentId);
    const tournament = await deleteTournament(tournamentId);
    // console.log(tournament);
    console.log("deleted");
    revalidatePath(`/tournaments`);
    // console.log(teams);
    // return tournament;
  } catch (error) {
    throw new Error(error);
  }
}

export async function editTournamentStatus(tournamentDetails, status) {
  try {
    await dbConnect();
    console.log(tournamentDetails);
    const tournament = await updateTournamentStatus(tournamentDetails, status);
    revalidatePath(`/tournament/${tournamentDetails.id}`);
    // console.log(teams);
    // return tournament;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deletePrevModeratorsFromCurrentTournament(
  moderatorList,
  tournamentDetails
) {
  try {
    await dbConnect();
    console.log("deletePrevModeratorsFromCurrentTournament");
    const tournament = await removePrevModeratorsFromCurrentTournament(
      moderatorList,
      tournamentDetails
    );
    console.log("removed moderators");
    revalidatePath(`/tournament/${tournamentDetails.id}`);
    // console.log(teams);
    // return tournament;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addNewModeratorsToCurrentTournament(
  moderatorList,
  tournamentDetails
) {
  try {
    await dbConnect();
    console.log("addNewModeratorsToCurrentTournament");
    const tournament = await addModeratorsToCurrentTournament(
      moderatorList,
      tournamentDetails
    );
    revalidatePath(`/tournament/${tournamentDetails.id}`);
    // console.log(teams);
    // return tournament;
  } catch (error) {
    throw new Error(error);
  }
}
