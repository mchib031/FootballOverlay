import React, { useEffect, useState } from 'react';
import './LineupView.css';
import stadiumImg from '../assets/stadium.png';
import homeJersey from '../assets/home-jersey.png';
import awayJersey from '../assets/away-jersey.png';


const LineupView = ({ homeTeam, awayTeam, homeLineup, awayLineup }) => {
  const [showHome, setShowHome] = useState(true);
  homeTeam= { ...homeTeam, jersey: homeJersey, color: "black" };
  awayTeam= { ...awayTeam, jersey: awayJersey, color: "white" };
  useEffect(() => {
    const interval = setInterval(() => {
      setShowHome(prev => !prev);
    }, 30000);
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

    <div className="slider">
      <div
        className="slider-inner"
        style={{ transform: showHome ? 'translateX(-125%)' : 'translateX(-25%)' }}
      >
        {[homeLineup, awayLineup].map((lineupData, index) => {
          const lineup = lineupData;
          const team = index === 0 ? homeTeam : awayTeam;
          const goalkeeper = lineup.filter(p => p.position === 'GK');
          const defenders = lineup.filter(p => p.position.includes('DF'));
          const midfielders = lineup.filter(p => p.position.includes('MF'));
          const forwards = lineup.filter(p => p.position.includes('FW'));

          return (
            <div key={index} className="lineup-container">
              <div className="stadium-field">
                <div className="lineup-row fwd">
                  {forwards.map((player, idx) => <PlayerCard key={idx} player={player} jersey={team.jersey} color={team.color} />)}
                </div>
                <div className="lineup-row mid">
                  {midfielders.map((player, idx) => <PlayerCard key={idx} player={player} jersey={team.jersey} color={team.color} />)}
                </div>
                <div className="lineup-row def">
                  {defenders.map((player, idx) => <PlayerCard key={idx} player={player} jersey={team.jersey} color={team.color} />)}
                </div>
                <div className="lineup-row gk">
                  {goalkeeper.map((player, idx) => <PlayerCard key={idx} player={player} jersey={team.jersey} color={team.color} />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};

const PlayerCard = ({ player, jersey, color }) => (
  <div className="player">
    <div className="player-name" style={{ color }}>{player.name}</div>
    <img src={jersey} alt="jersey" className="jersey" />
    <div className="player-number" style={{ color }}>{player.number}</div>
  </div>
);

export default LineupView;
