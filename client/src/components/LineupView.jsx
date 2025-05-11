import React from 'react';
import './LineupView.css';

const LineupView = ({ homeTeam, awayTeam, homeLineup, awayLineup }) => {
  return (
    <div className="lineup-container">
      <div className="team-lineup">
        <h3>{homeTeam.name}</h3>
        <ul>
          {homeLineup.map((player, index) => (
            <li key={index}>{player.number} - {player.name} ({player.position})</li>
          ))}
        </ul>
      </div>

      <div className="vs-text">VS</div>

      <div className="team-lineup">
        <h3>{awayTeam.name}</h3>
        <ul>
          {awayLineup.map((player, index) => (
            <li key={index}>{player.number} - {player.name} ({player.position})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LineupView;
