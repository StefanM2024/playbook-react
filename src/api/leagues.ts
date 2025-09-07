import { apiFetch } from "./client";
import { type League, type LeagueDetail } from "./types";

export const getLeagues = () => apiFetch<League[]>("/api/League");
export const getLeagueById = (id: string) => apiFetch<LeagueDetail>(`/api/League/${id}`);