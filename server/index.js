const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/match/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://api.football-data.org/v4/matches/${req.params.id}`, {
      headers: { 'X-Auth-Token': process.env.API_TOKEN }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch match data' });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
