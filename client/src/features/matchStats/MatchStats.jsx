import React from "react";
import "./MatchStats.css";

const MatchStats = ({ stats }) => {
  if (!stats) return <div>Loading stats...</div>;

  const statMap = {};

  stats.forEach(teamStat => {
    teamStat.statistics.forEach(stat => {
      if (!statMap[stat.type]) statMap[stat.type] = {};
      statMap[stat.type][teamStat.team.name] = stat.value;
    });
  });

  return (
    <div className="match-stats">
      {Object.entries(statMap).map(([type, values]) => (
        <div key={type} className="stat-row">
          <span>{values[Object.keys(values)[0]]}</span>
          <span className="stat-type">{type}</span>
          <span>{values[Object.keys(values)[1]]}</span>
        </div>
      ))}
    </div>
  );
};

export default MatchStats;
