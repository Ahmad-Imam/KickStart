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
import { createTeams } from "@/queries/teams";
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

    const teams = await createTeams(data);

    return teams;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addPlayers(data) {
  try {
    await dbConnect();

    const player = await createPlayers(data);

    return player;
  } catch (error) {
    throw new Error(error);
  }
}

export async function editPlayerData(playerData, playerId) {
  try {
    await dbConnect();

    const player = await updatePlayerData(playerData, playerId);

    revalidatePath(`/player/${playerId}`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editPlayerTeam(playersInTeam, teamsId) {
  try {
    await dbConnect();

    const playersUpdated = await updatePlayerTeam(playersInTeam, teamsId);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addTournaments(data, loggedUser) {
  try {
    await dbConnect();

    const tournament = await createTournaments(data, loggedUser);

    const teamsTournament = await createTeamsTournamentList(
      data?.teamsTournament,
      tournament.id
    );

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

    const allMatch = {
      groupMatch: data?.groupMatch,
      quarterMatch: data?.quarterMatch,
      semiMatch: data?.semiMatch,
      isThirdPlace: data?.isThirdPlace,
      // teamsQPerGroup: data?.teamsQPerGroup,
      groupsNum: data?.groupsNum,
      teamsPerGroup: data?.teamsPerGroup,
    };

    const matches = await createMatches(allMatch, tournament, data?.startDate);

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

    const playersUpdated = await removeFromPrevAddPlayersToCurrentTeamTeamsT(
      playersInTeam,
      teamsTournament
    );

    revalidatePath(`/tournament/${teamsTournament.id}`);
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

    const playersUpdated = await removeFromPrevAddPlayersToCurrentTeam(
      playersInTeam,
      team
    );

    revalidatePath(`/team/${team.id}`);
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

    const playersUpdated = await removePlayersFromCurrentTeamTeamsT(
      playersInTeam,
      teamsTournament
    );

    revalidatePath(`/tournament/${teamsTournament.id}`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deletePlayersFromCurrentTeam(playersInTeam, team) {
  try {
    await dbConnect();

    const playersUpdated = await removePlayersFromCurrentTeam(
      playersInTeam,
      team
    );

    revalidatePath(`/team/${team.id}`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editMatchStatus(matchDetails, status) {
  try {
    await dbConnect();

    const tournament = await getTournamentById(matchDetails?.tournamentId);
    const newMatch = await updateMatchStatus(matchDetails, status, tournament);

    if (status === "finished") {
      const newTeamsT = await updateMatchPlayedTeamsT(matchDetails, tournament);

      if (matchDetails?.type === "group") {
        const newGroups = await updateMatchPlayedGroups(
          matchDetails,
          tournament
        );

        const matchesLeft = await getMatchesLeftGroup(tournament);

        if (matchesLeft === "done") {
          const newTeamsList = await updateGroupEnd(tournament);
        }
      } else if (matchDetails?.type === "quarter") {
        const matchesLeftQ = await getMatchesLeftQuarter(tournament);

        if (matchesLeftQ === "done") {
          const newTeamsList = await updateQuarterEnd(tournament);
        }
      } else if (matchDetails?.type === "semi") {
        const matchesLeftS = await getMatchesLeftSemi(tournament);

        if (matchesLeftS === "done") {
          const newTeamsList = await updateSemiEnd(tournament);
        }
      } else if (matchDetails?.type === "third") {
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
          description: `${winner?.name} won the third place!!! 🥉`,
          matchId: matchDetails?.id,
        };

        const updateTEvent = await updateTournamentEvent(
          tournamentEvent,
          matchDetails.tournamentId
        );
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

    revalidatePath(`/tournament/${tournament.id}`);
    revalidatePath(`/tournament/${tournament.id}/match/${matchDetails.id}`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addGoalToMatch(gfTeam, gaTeam, player, matchDetails) {
  try {
    await dbConnect();

    const match = await updateMatchGoal(
      replaceMongoIdInObject(gfTeam),
      replaceMongoIdInObject(gaTeam),
      player,
      matchDetails
    );

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

    const match = await updateMatchCard(
      replaceMongoIdInObject(team),
      player,
      matchDetails,
      type
    );

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

    const tiebreaker = await addTiebreaker(matchDetails);

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

    const tiebreaker = await updateTiebreaker(
      matchDetails,
      teamId,
      index,
      result
    );

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

    const tiebreaker = await finishTieBreaker(matchDetails);

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

    const match = await updateMatchData(matchData, matchDetails);

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

    const match = await updateMatchMOTM(team, player, matchDetails);

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

    const tournament = await deleteTournament(tournamentId);

    revalidatePath(`/tournaments`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editTournamentStatus(tournamentDetails, status) {
  try {
    await dbConnect();

    const tournament = await updateTournamentStatus(tournamentDetails, status);
    revalidatePath(`/tournament/${tournamentDetails.id}`);
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

    const tournament = await removePrevModeratorsFromCurrentTournament(
      moderatorList,
      tournamentDetails
    );

    revalidatePath(`/tournament/${tournamentDetails.id}`);
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

    const tournament = await addModeratorsToCurrentTournament(
      moderatorList,
      tournamentDetails
    );
    revalidatePath(`/tournament/${tournamentDetails.id}`);
  } catch (error) {
    throw new Error(error);
  }
}
