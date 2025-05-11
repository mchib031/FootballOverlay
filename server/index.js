const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/api/matches', async (req, res) => {
  const { date } = req.query;

  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
      params: {
        dateFrom: date,
        dateTo: date,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.get('/api/match/:id', async (req, res) => {
console.log("Requested match ID:", req.params.id);
  try {
    const response = await axios.get(`https://api.football-data.org/v4/matches/${req.params.id}`, {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching match data:', error.message);
    res.status(500).json({ error: 'Failed to fetch match data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
