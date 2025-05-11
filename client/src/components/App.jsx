import React from 'react';
import MatchHeader from './components/MatchHeader';
import MatchStats from './components/MatchStats';
import LineupView from './components/LineupView';

function App() {
  return (
    <div className="overlay">
      <MatchHeader />
      <MatchStats />
      <LineupView />
    </div>
  );
}

export default App;
