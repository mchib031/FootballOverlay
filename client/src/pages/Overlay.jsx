import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Overlay.css';
import MatchHeader from "../components/MatchHeader";

const Overlay = () => {
  const { matchId } = useParams();
  const cameraURL = process.env.REACT_APP_CAMERA_URL;
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/match/${matchId}`);
        setMatchData(response.data);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatchData();
  }, [matchId]);

  if (!matchData) {
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
          {/* Rotating component: stats <-> lineup */}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
