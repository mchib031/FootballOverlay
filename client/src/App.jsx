import MatchHeader from './components/MatchHeader';
import MatchStats from './components/MatchStats';
import LineupView from './components/LineupView';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MatchSelector from './pages/MatchSelector';
import Overlay from './pages/Overlay';

function App() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchSelector />} />
        <Route path="/overlay/:matchId" element={<Overlay />} />
      </Routes>
    </Router>
  );
}

export default App;
