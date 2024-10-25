const express = require("express");
const cors = require("cors");
const {
  fetchKanjiData,
  fetchKanjiSearchResults,
  fetchKanjiDetails,
} = require("./controllers/kanjiController");

const app = express();
const port = 5001;

// Middleware that enables CORS (Cross-Origin Resource Sharing) and JSON parsing
app.use(cors());
app.use(express.json());

// Route for getting all kanji
app.get("/kanji", async (req, res) => {
  try {
    const kanjiData = await fetchKanjiData();
    if (!kanjiData || kanjiData.length === 0) {
      return res.status(404).json({ message: "No Kanji found." });
    }
    res.json(kanjiData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Kanji data." });
  }
});

// Route for getting sorted Kanji
app.get("/kanji/sorted", async (req, res) => {
  try {
    const sortType = req.query.sortType;
    const kanjiData = await fetchKanjiData();

    if (!kanjiData || kanjiData.length === 0) {
      return res.status(404).json({ message: "No Kanji found." });
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
    res.status(500).send("Error fetching or sorting Kanji data.");
  }
});

// Route for getting kanji details by character
app.get("/kanji/details/:character", async (req, res) => {
  try {
    const character = req.params.character; // Extract character from the URL
    const kanjiDetails = await fetchKanjiDetails(character);
    if (!kanjiDetails) {
      return res
        .status(404)
        .json({ message: `No details found for kanji: ${character}.` });
    }
    res.json(kanjiDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Kanji details." });
  }
});

// Route for searching kanji
app.get("/kanji/search", async (req, res) => {
  try {
    const searchTerm = req.query.word; // Extract search word from query parameter
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required." });
    }
    const searchResults = await fetchKanjiSearchResults(searchTerm);
    if (!searchResults || searchResults.length === 0) {
      return res
        .status(404)
        .json({ message: `No results found for: ${searchTerm}.` });
    }
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Kanji search results." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});