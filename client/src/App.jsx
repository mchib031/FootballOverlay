import MatchHeader from './components/MatchHeader';
import LineupView from './components/LineupView';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MatchSelector from './pages/MatchSelector';
import Overlay from './pages/Overlay';
import MatchStats from './features/matchStats/MatchStats';

function App() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchSelector />} />
        <Route path="/overlay/:matchId" element={<Overlay />} />
        <Route path="/matchstats/:fixtureId" element={<MatchStats fixtureId={1351138}/>} />
      </Routes>
    </Router>
  );
}

export default App;
