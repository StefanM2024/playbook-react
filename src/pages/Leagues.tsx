import { useEffect, useState } from "react";
import { getLeagues } from "../api/leagues";
import type { League } from "../api/leagues";
import { Link } from "react-router-dom";

export default function Leagues() {
  const [leagues, setLeagues] = useState<League[]>([]);

  useEffect(() => {
    getLeagues().then(setLeagues).catch(console.error);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leagues</h1>
      <ul className="space-y-2">
        {leagues.map(l => (
          <li key={l.id}>
            <Link to={`/leagues/${l.id}`} className="underline">{l.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
