import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Leaderboard from "./pages/Leaderboard";
import TeamMatches from "./pages/TeamMatches";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/team-matches" element={<TeamMatches />} />
      </Routes>
    </Router>
  )
}

export default App
