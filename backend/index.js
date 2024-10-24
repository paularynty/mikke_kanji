const cors = require("cors");
const express = require("express");
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

// Route for getting sorted kanji
app.get("/kanji/sorted", async (req, res) => {
  try {
    const sortType = req.query.sortType; 
    const kanjiData = await fetchKanjiData();

    // console.log("Fetched Kanji Data:", kanjiData);

    if (!kanjiData || kanjiData.length === 0) {
      return res.status(404).json({ message: "No Kanji found." });
    }

    if (sortType === "ascending") {
      kanjiData.sort((a, b) => a.kanji.strokes - b.kanji.strokes);
    } else if (sortType === "descending") {
      kanjiData.sort((a, b) => b.kanji.strokes - a.kanji.strokes);
    }

    // console.log("Sorted Kanji Data:", kanjiData);

    res.json(kanjiData);
  } catch (error) {
    console.error("Error fetching or sorting Kanji data:", error);
    res.status(500).send("Error fetching or sorting Kanji data.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
