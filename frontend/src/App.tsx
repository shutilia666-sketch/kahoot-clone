import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import { Home } from './pages/Home';
import { HostSetup } from './pages/HostSetup';
import { PlayerJoin } from './pages/PlayerJoin';
import { WaitingRoom } from './pages/WaitingRoom';
import { GameHost } from './pages/GameHost';
import { GamePlayer } from './pages/GamePlayer';
import { Results } from './pages/Results';

function App() {
  const token = useGameStore((state) => state.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host-setup" element={token ? <HostSetup /> : <Navigate to="/" />} />
        <Route path="/player-join" element={<PlayerJoin />} />
        <Route path="/waiting-room/:roomId" element={<WaitingRoom />} />
        <Route path="/game-host/:roomId" element={<GameHost />} />
        <Route path="/game/:roomId" element={<GamePlayer />} />
        <Route path="/results/:roomId" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
