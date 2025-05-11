import MatchHeader from './components/MatchHeader';
import MatchStats from './components/MatchStats';
import LineupView from './components/LineupView';
import MatchSelector from './pages/MatchSelector';
import React, { useState } from 'react';


function App() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div>
      {!selectedMatch ? (
        <MatchSelector onSelect={setSelectedMatch} />
      ) : (
        <MatchHeader match={selectedMatch} />
      )}
    </div>
  );
}

export default App;
