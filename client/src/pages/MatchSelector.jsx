import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchSelector = ({ onSelect }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/matches/today')
      .then(res => setMatches(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Select a Match</h2>
      <ul>
        {matches.map(match => (
          <li key={match.id} onClick={() => onSelect(match)}>
            {match.homeTeam.name} vs {match.awayTeam.name} ({match.competition.name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchSelector;
