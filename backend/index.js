const express = require("express");
const cors = require("cors");
const {
  fetchKanjiData,
  fetchKanjiSearchResults,
  fetchKanjiDetails,
} = require("./controllers/kanjiController");

const app = express();
const port = 5001;

// Middleware configuration
app.use(cors());
app.use(express.json());

// Utility function for sending errors
const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

// Route for getting all kanji
app.get("/kanji", async (req, res) => {
  try {
    const kanjiData = await fetchKanjiData();
    if (!kanjiData || kanjiData.length === 0) {
      return sendErrorResponse(res, 404, "No Kanji found.");
    }
    res.json(kanjiData);
  } catch (error) {
    console.error("Error fetching Kanji data:", error);
    sendErrorResponse(res, 500, "Failed to fetch Kanji data.");
  }
});

// Route for getting sorted Kanji
app.get("/kanji/sorted", async (req, res) => {
  try {
    const { sortType } = req.query; // Destructure sortType from query
    const kanjiData = await fetchKanjiData();

    if (!kanjiData || kanjiData.length === 0) {
      return sendErrorResponse(res, 404, "No Kanji found.");
    }

    // Sort based on sortType
    if (sortType === "ascending") {
      kanjiData.sort((a, b) => a.kanji.strokes - b.kanji.strokes);
    } else if (sortType === "descending") {
      kanjiData.sort((a, b) => b.kanji.strokes - a.kanji.strokes);
    }
    res.json(kanjiData);
  } catch (error) {
    console.error("Error fetching or sorting Kanji data:", error);
    sendErrorResponse(res, 500, "Error fetching or sorting Kanji data.");
  }
});

// Route for getting kanji details by character
app.get("/kanji/details/:character", async (req, res) => {
  try {
    const { character } = req.params; // Destructure character from params
    const kanjiDetails = await fetchKanjiDetails(character);
    if (!kanjiDetails) {
      return sendErrorResponse(res, 404, `No details found for kanji: ${character}.`);
    }
    res.json(kanjiDetails);
  } catch (error) {
    console.error("Error fetching Kanji details:", error);
    sendErrorResponse(res, 500, "Failed to fetch Kanji details.");
  }
});

// Route for searching kanji
app.get("/kanji/search", async (req, res) => {
  try {
    const { word: searchTerm } = req.query; // Destructure search term from query
    if (!searchTerm) {
      return sendErrorResponse(res, 400, "Search term is required.");
    }
    const searchResults = await fetchKanjiSearchResults(searchTerm);
    if (!searchResults || searchResults.length === 0) {
      return sendErrorResponse(res, 404, `No results found for: ${searchTerm}.`);
    }
    res.json(searchResults);
  } catch (error) {
    console.error("Error fetching Kanji search results:", error);
    sendErrorResponse(res, 500, "Failed to fetch Kanji search results.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});