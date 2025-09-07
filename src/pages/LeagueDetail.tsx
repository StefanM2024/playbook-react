import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLeagueById } from "../api/leagues";
import type { LeagueDetail } from "../api/leagues";
// import PlayerCard from "../components/PlayerCard";

export default function LeagueDetail() {
  const { id } = useParams();
  const [league, setLeague] = useState<LeagueDetail | null>(null);

  useEffect(() => {
    if (id) getLeagueById(id).then(setLeague).catch(console.error);
  }, [id]);

  if (!league) return <div>Loading...</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{league.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {league.players.map(p => (
          <div>
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}