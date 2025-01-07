import { fetchKanjiSearchResults } from "../api"; // Import fetch function from api.js

export default async function handler(req, res) {
  const { word } = req.query;

  try {
    const resultData = await fetchKanjiSearchResults(word); // Use the imported function to fetch the data
    res.status(200).json(resultData); // Send the fetched data back as JSON
  } catch (error) {
    console.error("Error fetching Kanji search results:", error);
    res.status(500).json({ error: "Failed to fetch Kanji data" });
  }
}
