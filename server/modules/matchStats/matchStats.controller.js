const express = require("express");
const router = express.Router();
const axios = require("axios");
require('dotenv').config();

router.get("/:fixtureId/stats", async (req, res) => {
  const { fixtureId } = req.params;
  try {
    const apiRes = await axios.get(
      `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`,
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY
        },
      }
    );
    res.json(apiRes.data.response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch match statistics" });
  }
});

module.exports = router;
