import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlayerById } from "../api/players";
import type { Player } from "../api/types";
import PlayerCard from "../components/PlayerCard";

export default function PlayerDetail() {
  const { leagueID, playerID } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (leagueID && playerID) {
      getPlayerById(leagueID, playerID)
        .then((p) => setPlayer(p))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [leagueID, playerID]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!player) return <div className="p-6">Player not found.</div>;

  return (
    <main className="p-6">
        <div className="playerCard">
            <PlayerCard key={player.id} player={player} />
        </div>
        <div className="player-details">
            <h1 className="text-2xl font-bold mb-4">{player.name}</h1>
            <div className="mb-2">Position: {player.position}</div>
        </div>
    </main>
  );
}