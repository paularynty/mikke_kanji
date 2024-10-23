const userRoutes = require('./routes/users');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5001;

// const apiURL = "https://kanjialive-api.p.rapidapi.com/api/public/";

// Middleware to parse incoming JSON requests
// For enabling CORS (Cross-Origin Resource Sharing)
app.use(express.json());
app.use(cors());

//Routes go here
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/all/`, {
      headers: {
        "x-rapidapi-key": "15ae912ac0mshafc017a046e3bb5p1e71e3jsn9cd9b768b7e9", // Make sure your API key is valid
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from external API:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});