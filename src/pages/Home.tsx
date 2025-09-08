import "../index.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home-desc">
        <h1>Welcome to Playbook</h1>

        <p>Your ultimate sports league management app.</p>

        <p>
          Navigate to the Leagues page to explore various leagues and their
          players.
        </p>

        <p>Click on a player to view detailed information about them.</p>

        <p>Enjoy managing your sports leagues with ease!</p>
      </div>

      <div className="home-list">
        <Link to={`/leagues`} className="underline">View Leagues</Link>
      </div>
    </>
  );
}

export default Home;
