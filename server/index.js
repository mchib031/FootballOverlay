const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const normalize = (str) => str.toLowerCase().replace(/\s/g, '');

const getApiFootballFixturesByDate = async (matchDate) => {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: {
        'x-apisports-key': process.env.API_FOOTBALL_KEY,
      },
      params: {
        date: matchDate
      },
    });

    return response.data.response;
  } catch (err) {
    console.error('Error fetching fixtures:', err.message);
    return [];
  }
};


app.get('/api/matches', async (req, res) => {
  const { date } = req.query;

  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
      params: {
        date: date
      },
    });

    const matches = response.data.matches;

    const apiFootballFixtures = await getApiFootballFixturesByDate(date);

    const enrichedMatches = matches.map(match => {
      const homeName = normalize(match.homeTeam.name);
      const awayName = normalize(match.awayTeam.name);
      const homeShortName = normalize(match.homeTeam.shortName);
      const awayShortName = normalize(match.awayTeam.shortName);

      const found = apiFootballFixtures.find(fixture => {
        const home = normalize(fixture.teams.home.name);
        const away = normalize(fixture.teams.away.name);
        return home.includes(homeName) || home.includes(homeShortName) || away.includes(awayName) || away.includes(awayShortName);
      });

      return {
        ...match,
        apiFootballId: found?.fixture?.id || null,
      };
    });

    res.json({
      matches: enrichedMatches,
      fixturesFromApiFootball: apiFootballFixtures,
    });
  } catch (err) {
    console.error('API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});


app.get('/api/match/:id', async (req, res) => {
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

app.get('/api/lineup/:fixtureId', async (req, res) => {
  const fixtureId = req.params.fixtureId;
  try {
    const response = await axios.get(`https://v3.football.api-sports.io/fixtures/lineups`, {
      headers: {
        'x-apisports-key': process.env.API_FOOTBALL_KEY,
      },
      params: {
        fixture: fixtureId
      }
    });

    res.json(response.data.response);
  } catch (error) {
    console.error('Error fetching lineup:', error.message);
    res.status(500).json({ error: 'Failed to fetch lineup data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
