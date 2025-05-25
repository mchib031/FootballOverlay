import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Overlay.css';
import MatchHeader from "../components/MatchHeader";
import LineupView from '../components/LineupView';

const Overlay = () => {
  const { matchId } = useParams();
  const location = useLocation();
  const cameraURL = process.env.REACT_APP_CAMERA_URL;

  const queryParams = new URLSearchParams(location.search);
  const fixtureId = queryParams.get('apiId');

  const [matchData, setMatchData] = useState(null);
  const [loadingMatch, setLoadingMatch] = useState(true);

  const [homeLineup, setHomeLineup] = useState([]);
  const [awayLineup, setAwayLineup] = useState([]);
  const [loadingLineup, setLoadingLineup] = useState(true);

  const fetchMatchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/match/${matchId}`);
      setMatchData(response.data);
      setLoadingMatch(false);
    } catch (error) {
      console.error("Error fetching match data:", error);
      setLoadingMatch(false);
    }
  };

  const fetchLineupData = async () => {
    if (!fixtureId) {
      setLoadingLineup(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/lineup/${fixtureId}`);
      const lineups = response.data || [];
      if (lineups.length >= 2) {
        setHomeLineup(lineups[0].startXI.map(playerObj => ({
          number: playerObj.player.number,
          name: playerObj.player.name.split(' ').slice(-1).join(' ').toUpperCase(),
          position: playerObj.player.pos
        })));

        setAwayLineup(lineups[1].startXI.map(playerObj => ({
          number: playerObj.player.number,
          name: playerObj.player.name.split(' ').slice(-1).join(' ').toUpperCase(),
          position: playerObj.player.pos
        })));
      } else {
        setHomeLineup([]);
        setAwayLineup([]);
      }
      setLoadingLineup(false);
    } catch (error) {
      console.error("Error fetching lineup data:", error);
      setLoadingLineup(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMatchData();
    }, 30000);

    fetchMatchData();

    return () => clearInterval(intervalId);
  }, [matchId]);


  useEffect(() => {
    fetchLineupData();
  }, [fixtureId]);

  if (loadingMatch || loadingLineup) {
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
          {homeLineup.length > 0 && awayLineup.length > 0 ? (
            <LineupView
              homeTeam={matchData?.homeTeam}
              awayTeam={matchData?.awayTeam}
              homeLineup={homeLineup}
              awayLineup={awayLineup}
            />
          ) : (
            <div>No lineup data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
