import React from 'react';
import { useParams } from 'react-router-dom';
import './Overlay.css';

const Overlay = () => {
  const { matchId } = useParams();
  const cameraURL = process.env.REACT_APP_CAMERA_URL;

  return (
    <div className="overlay-container">
      <iframe
        className="camera-feed"
        src={cameraURL}
        allow="camera; microphone"
        title="Camera Feed"
      />
      <div className="overlay-content">
        <div className="overlay-left">
          {/* Match header: teams, score, etc. */}
        </div>
        <div className="overlay-right">
          {/* Rotating component: stats <-> lineup */}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
