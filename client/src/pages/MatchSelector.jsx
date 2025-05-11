import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MatchSelector.css';

const MatchSelector = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/matches', {
          params: {
            date: new Date().toISOString().split('T')[0],
          },
        });
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="match-selector">
      <h1>Select a Match</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="match-grid">
          {matches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="team">
                <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
                <span>{match.homeTeam.name}</span>
              </div>
              <span className="vs">vs</span>
              <div className="team">
                <img src={match.awayTeam.crest} alt={match.awayTeam.name} />
                <span>{match.awayTeam.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchSelector;
