import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Overlay.css';
import MatchHeader from "../components/MatchHeader";
import LineupView from '../components/LineupView';

const Overlay = () => {
  const { matchId } = useParams();
  const cameraURL = process.env.REACT_APP_CAMERA_URL;
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMatchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/match/${matchId}`);
      setMatchData(response.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

 
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMatchData();
    }, 10000);

    fetchMatchData();

    return () => clearInterval(intervalId);
  }, [matchId]);

  if (loading) {
    return <div className="loading">Loading match data...</div>;
  }

  return (
    <div className="overlay-container">
      <iframe
        className="camera-feed"
        src={cameraURL}
        allow="camera; microphone"
        title="Camera Feed"
        frameBorder="0"
      />
      <div className="overlay-content">
        <div className="overlay-left">
          <MatchHeader matchData={matchData} />
        </div>
        <div className="overlay-right">
          <LineupView
            homeTeam={matchData.homeTeam}
            awayTeam={matchData.awayTeam}
            homeLineup={[
                { number: 1, name: 'Szczęsny', position: 'GK' },
                { number: 24, name: 'Eric García', position: 'DF' },
                { number: 2, name: 'Cubarsí', position: 'DF' },
                { number: 5, name: 'Martinez', position: 'DF' },
                { number: 35, name: 'Gerard Martín', position: 'DF' },
                { number: 21, name: 'De Jong', position: 'MF' },
                { number: 8, name: 'Pedri', position: 'MF' },
                { number: 20, name: 'Olmo', position: 'MF' },
                { number: 11, name: 'Raphinha', position: 'FWD' },
                { number: 19, name: 'Lamine Yamal', position: 'FWD' },
                { number: 7, name: 'Ferran Torres', position: 'FWD' }
            ]}
            awayLineup={[
                { number: 1, name: 'Courtois', position: 'GK' },
                { number: 35, name: 'Asencio', position: 'DF' },
                { number: 14, name: 'Tchouameni', position: 'DF' },
                { number: 20, name: 'Fran Garcia', position: 'DF' },
                { number: 17, name: 'Lucas Vazquez', position: 'DF' },
                { number: 19, name: 'Ceballos', position: 'MF' },
                { number: 8, name: 'Valverde', position: 'MF' },
                { number: 5, name: 'Bellingham', position: 'MF' },
                { number: 15, name: 'Guler', position: 'MF' },
                { number: 9, name: 'Mbappe', position: 'FWD' },
                { number: 7, name: 'Vinicius Jr', position: 'FWD' }
            ]}/>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
