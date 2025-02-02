const axios = require("axios");

const fetchKanjiData = async () => {
  try {
    const options = {
      method: "GET",
      url: "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all/",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
      },
    };

    const response = await axios.request(options);
    let kanjiData = response.data;

    return kanjiData.map((item) => ({
      kanji: {
        character: item.kanji.character,
        strokes: item.kanji.strokes ? item.kanji.strokes.count : null,
        onyomi: item.kanji.onyomi,
        kunyomi: item.kanji.kunyomi,
        meaning: item.kanji.meaning.english,
      },
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchKanjiDetails = async (character) => {
  try {
    const options = {
      method: "GET",
      url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${encodeURIComponent(
        character
      )}`,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host":process.env.RAPIDAPI_HOST,
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching Kanji details:", error);
    throw error;
  }
};

const fetchKanjiSearchResults = async (word) => {
  try {
    const options = {
      method: "GET",
      url: `https://kanjialive-api.p.rapidapi.com/api/public/search/${encodeURIComponent(
        word
      )}`,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching Kanji search results:", error);
    throw error;
  }
};

module.exports = { fetchKanjiData, fetchKanjiDetails, fetchKanjiSearchResults };