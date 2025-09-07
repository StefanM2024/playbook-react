import { apiFetch } from "./client";

export type League = {
  id: string;
  name: string;
};

export type LeagueDetail = League & {
  players: Player[];
};

export type Player = {
  id: string;
  name: string;
  country: string;
  overallRating: number;
  position: string;
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
  photoKey?: string | null;
};

export const getLeagues = () => apiFetch<League[]>("/api/League");
export const getLeagueById = (id: string) => apiFetch<LeagueDetail>(`/api/League/${id}`);