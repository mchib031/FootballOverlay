import React, { useEffect, useState } from 'react';
import './LineupView.css';
import stadiumImg from '../assets/stadium.png';
import jerseyImg from '../assets/jersey.png';

const LineupView = ({ homeTeam, awayTeam, homeLineup, awayLineup }) => {
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHome(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const lineup = showHome ? homeLineup : awayLineup;
  const teamName = showHome ? homeTeam.name : awayTeam.name;
  const teamCrest = showHome ? homeTeam.crest : awayTeam.crest;


  const goalkeeper = lineup.filter(p => p.position === 'GK');
  const defenders = lineup.filter(p => p.position.includes('DF'));
  const midfielders = lineup.filter(p => p.position.includes('MF'));
  const forwards = lineup.filter(p => p.position.includes('FW'));

  return (
    <div className="lineup-view">
      <div className="field-container">
        <img src={stadiumImg} alt="football field" className="field" />
      </div>
    <div className="lineup-container">
      <img className="team-crest" src={teamCrest} alt={teamName} />
      <div className="stadium-field">
        <div className="lineup-row fwd">
          {forwards.map((player, idx) => <PlayerCard key={idx} player={player} />)}
        </div>
        <div className="lineup-row mid">
          {midfielders.map((player, idx) => <PlayerCard key={idx} player={player} />)}
        </div>
        <div className="lineup-row def">
          {defenders.map((player, idx) => <PlayerCard key={idx} player={player} />)}
        </div>
        <div className="lineup-row gk">
          {goalkeeper.map((player, idx) => <PlayerCard key={idx} player={player} />)}
        </div>
      </div>
    </div>
    </div>
  );
};

const PlayerCard = ({ player }) => (
  <div className="player">
    <div className="player-name">{player.name}</div>
    <img src={jerseyImg} alt="jersey" className="jersey" />
    <div className="player-number">{player.number}</div>
  </div>
);

export default LineupView;
