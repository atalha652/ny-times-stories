const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const API_KEY = ''; // Get your API key from https://developer.nytimes.com/

app.use(express.json());
app.use(cors());

app.get('/top-stories', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
    );
    const data = response.data;
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from the New York Times API' });
  }
});

app.listen(PORT, () => {
  console.log(`server running successfuly on port ${PORT}`);
});