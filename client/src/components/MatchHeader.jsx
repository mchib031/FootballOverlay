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
        setDisplayTime(
          `${String(mainMinutes).padStart(2, "0")}:00 + ${formatTime(extraTime)}`
        );

        if (!extraTimeIntervalRef.current) {
          extraTimeIntervalRef.current = setInterval(() => {
            setExtraTime((prev) => prev + 1);
          }, 1000);
        }
      } else if (status === "IN_PLAY") {
        clearInterval(extraTimeIntervalRef.current);
        extraTimeIntervalRef.current = null;
        setExtraTime(0);
        setDisplayTime(
          `${String(mainMinutes).padStart(2, "0")}:${String(mainSeconds).padStart(2, "0")}`
        );
      } else {
        clearInterval(extraTimeIntervalRef.current);
        extraTimeIntervalRef.current = null;
      }
    }, 1000);

    return () => {
    console.log("Start Time:", startTime);
    console.log("Now:", new Date());

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
        <img src={competition.emblem} alt={competition.name} className="competition-logo" />
        <span>{competition.name}</span>
      </div>

      <div className="team-box home">
        <div className="score-box">{score.fullTime.home ?? 0}</div>
        <span className="team-name">{homeTeam.shortName.toUpperCase()}</span>
        <img src={homeTeam.crest} alt={homeTeam.name} />
      </div>

      <div className="team-box away">
        <div className="score-box">{score.fullTime.away ?? 0}</div>
        <span className="team-name">{awayTeam.shortName.toUpperCase()}</span>
        <img src={awayTeam.crest} alt={awayTeam.name} />
      </div>

      <div className="status-box">
        <span>{status === "IN_PLAY" ? "1ST HALF" : status}</span>
        <span className="time-box">{status === "IN_PLAY" ? displayTime : "00:00"}</span>
      </div>
    </div>
  );
};

export default MatchHeader;
