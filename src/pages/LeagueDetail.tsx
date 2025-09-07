import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLeagueById } from "../api/leagues";
import type { LeagueDetail } from "../api/types"
import PlayerCard from "../components/PlayerCard";

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
          <Link
            key={p.id}
            to={`/leagues/${league.id}/player/${p.id}`}
            className="block"
          >
            <PlayerCard player={p} />
          </Link>
        ))}
      </div>
    </main>
  );
}