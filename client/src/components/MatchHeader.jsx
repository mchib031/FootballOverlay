import React, { useEffect, useState } from "react";
import "./MatchHeader.css";

const MatchHeader = ({ matchData }) => {
  const {
    competition,
    homeTeam,
    awayTeam,
    score,
    status,
    utcDate,
  } = matchData;

  const [elapsedTime, setElapsedTime] = useState("00:00");

  useEffect(() => {
    const startTime = new Date(utcDate);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - startTime) / 1000); // in seconds

      const minutes = String(Math.floor(diff / 60)).padStart(2, "0");
      const seconds = String(diff % 60).padStart(2, "0");
      setElapsedTime(`${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [utcDate]);

  return (
    <div className="match-header">
      <div className="competition">
        <img
          src={competition.emblem}
          alt={competition.name}
          className="competition-logo"
        />
        <span>{competition.name}</span>
      </div>

      <div className="teams">
        <div className="team">
          <img src={homeTeam.crest} alt={homeTeam.name} />
          <span>{homeTeam.name}</span>
        </div>
        <div className="score">
          <span>
            {score.fullTime.home ?? 0} - {score.fullTime.away ?? 0}
          </span>
        </div>
        <div className="team">
          <img src={awayTeam.crest} alt={awayTeam.name} />
          <span>{awayTeam.name}</span>
        </div>
      </div>

      <div className="status">
        <span>{status === "IN_PLAY" ? "LIVE" : status}</span>
        <div>{status === "IN_PLAY" ? elapsedTime : null}</div>
      </div>
    </div>
  );
};

export default MatchHeader;