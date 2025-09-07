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