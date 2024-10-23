// const express = require('express');
// const axios = require('axios');
// const apiURL = "https://kanjialive-api.p.rapidapi.com/api/public/";

// const app = express();
// const cors = require('cors');
// const PORT = process.env.PORT || 3000;

// app.use(cors());

// app.get('/', async (req, res) => {
// 	try {
// 		const response = await axios.get(`${apiURL}kanji/all`);
// 		res.json(response.data);
// 	} catch (error) {
// 		res.status(500).json({ error: 'Failed to fetch data' });
// 	}
// });