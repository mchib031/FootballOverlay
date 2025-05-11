import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchSelector = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/matches', {
          params: {
            dateFrom: new Date().toISOString().split('T')[0],
            dateTo: new Date().toISOString().split('T')[0],
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
    <div>
      <h1>Match Selector</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchSelector;
