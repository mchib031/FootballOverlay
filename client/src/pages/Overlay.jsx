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
                { number: 1, name: 'Goalkeeper 1', position: 'GK' },
                { number: 4, name: 'Defender A', position: 'DF' },
                { number: 4, name: 'Defender A', position: 'DF' },
                { number: 4, name: 'Defender A', position: 'DF' },
                { number: 4, name: 'Defender A', position: 'DF' },
                { number: 4, name: 'Defender A', position: 'DMF' },
                { number: 4, name: 'Defender A', position: 'CMF' },
                { number: 4, name: 'Defender A', position: 'MDF' },
                { number: 4, name: 'Defender A', position: 'FWD' },
                { number: 4, name: 'Defender A', position: 'FWD' },
                { number: 4, name: 'Defender A', position: 'FWD' }
            ]}
            awayLineup={[
                { number: 1, name: 'Goalkeeper 2', position: 'GK' },
                { number: 5, name: 'Defender B', position: 'DF' },
                { number: 5, name: 'Defender B', position: 'DF' },
                { number: 5, name: 'Defender B', position: 'DF' },
                { number: 5, name: 'Defender B', position: 'DF' },
                { number: 5, name: 'Defender B', position: 'DMF' },
                { number: 5, name: 'Defender B', position: 'CMF' },
                { number: 5, name: 'Defender B', position: 'MDF' },
                { number: 5, name: 'Defender B', position: 'FWD' },
                { number: 5, name: 'Defender B', position: 'FWD' },
                { number: 5, name: 'Defender B', position: 'FWD' }
            ]}/>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
