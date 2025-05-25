import axios from "axios";

export const getMatchStats = async (fixtureId) => {
  const res = await axios.get(
    `http://localhost:5000/api/match/${fixtureId}/stats`
  );
  return res.data;
};
