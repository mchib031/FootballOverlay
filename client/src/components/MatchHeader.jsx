import React, { useEffect, useState, useRef } from "react";
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

  const [displayTime, setDisplayTime] = useState("00:00");
  const [extraTime, setExtraTime] = useState(0);
  const extraTimeIntervalRef = useRef(null);

  useEffect(() => {
    const startTime = new Date(utcDate);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - startTime) / 1000);

      const mainMinutes = Math.floor(diff / 60);
      const mainSeconds = diff % 60;

      if ((mainMinutes === 45 || mainMinutes === 90) && status === "IN_PLAY") {
        // Lock main clock at 45:00 or 90:00
        setDisplayTime(
          `${String(mainMinutes).padStart(2, "0")}:00 + ${formatTime(extraTime)}`
        );

        if (!extraTimeIntervalRef.current) {
          extraTimeIntervalRef.current = setInterval(() => {
            setExtraTime((prev) => prev + 1);
          }, 1000);
        }
      } else if (status === "IN_PLAY") {
        // Normal ticking
        clearInterval(extraTimeIntervalRef.current);
        extraTimeIntervalRef.current = null;
        setExtraTime(0);
        setDisplayTime(
          `${String(mainMinutes).padStart(2, "0")}:${String(mainSeconds).padStart(2, "0")}`
        );
      } else {
        // Stop everything if not in play
        clearInterval(extraTimeIntervalRef.current);
        extraTimeIntervalRef.current = null;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(extraTimeIntervalRef.current);
    };
  }, [utcDate, status, extraTime]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

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
        <div>{status === "IN_PLAY" ? displayTime : null}</div>
      </div>
    </div>
  );
};

export default MatchHeader;
