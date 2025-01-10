import axios from "axios";

export default async function handler(req, res) {
  const { word } = req.query; // Extract the search term from the query string

  if (!word) {
    res.status(400).json({ error: "Word parameter is required" });
    return;
  }

  try {
    const response = await axios.get(
      `https://kanjialive-api.p.rapidapi.com/api/public/search/${encodeURIComponent(
        word
      )}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        },
      }
    );

    res.status(200).json(response.data); // Send the API response back to the frontend
  } catch (error) {
    console.error("Error fetching Kanji search results:", error);

    if (error.response) {
      // API returned an error response
      res.status(error.response.status).json({
        error: error.response.data || "Error from external API",
      });
    } else {
      // Other errors (e.g., network issues)
      res.status(500).json({ error: "Failed to fetch Kanji data" });
    }
  }
}
