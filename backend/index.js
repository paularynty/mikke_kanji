const { pool } = require("./database/db");
const cors = require("cors");
const express = require("express");
const {
  fetchKanjiData,
  fetchKanjiSearchResults,
  fetchKanjiDetails,
} = require("./controllers/kanjiController");
const { userRouter, authMiddleware } = require("./controllers/userController");

const app = express();
const port = 5001;

// Middleware that enables CORS (Cross-Origin Resource Sharing) and JSON parsing
app.use(cors());
app.use(express.json());

app.use("/auth/", userRouter);

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

// get a specific user
app.get("/users/:userId", async (req, res) => {
  console.log("Request parameters:", req.params); // Log params to check what's being received
  const userId = parseInt(req.params.userId, 10); // Convert to integer
  try {
    // Confirm database connection
    await pool.query("SELECT NOW()"); // Test connection
    const result = await pool.query(
      `SELECT id, username FROM users WHERE id = $1`,
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error); // Log the error for more details
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get username by authtoken
app.get("/get_user_by_token", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT id, username FROM users where id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
