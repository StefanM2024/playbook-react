import { apiFetch } from "./client"
import { type Player } from "./types"

export const getPlayerById = (leagueID: string, playerID: string) => apiFetch<Player>(`/api/leagues/${leagueID}/player/${playerID}`)