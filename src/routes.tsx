import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Leagues from "./pages/Leagues";
import LeagueDetail from "./pages/LeagueDetail";
// import PlayerDetail from "./pages/PlayerDetail";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/leagues", element: <Leagues /> },
  { path: "/leagues/:id", element: <LeagueDetail /> },
//   { path: "/players/:id", element: <PlayerDetail /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}