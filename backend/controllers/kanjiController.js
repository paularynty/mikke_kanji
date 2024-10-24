const express = require("express");
const axios = require("axios");
const app = express();

const fetchKanjiData = async () => {
  try {
    const options = {
      method: "GET",
      url: "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all/",
      headers: {
        "x-rapidapi-key": "15ae912ac0mshafc017a046e3bb5p1e71e3jsn9cd9b768b7e9",
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    let kanjiData = response.data;

    return kanjiData.map((item) => ({
      kanji: {
        character: item.kanji.character,
        strokes: item.kanji.strokes ? item.kanji.strokes.count : null,
        meaning: item.kanji.meaning,
        onyomi: item.kanji.onyomi,
        kunyomi: item.kanji.kunyomi,
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
        "x-rapidapi-key": "15ae912ac0mshafc017a046e3bb5p1e71e3jsn9cd9b768b7e9",
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
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
        "x-rapidapi-key": "15ae912ac0mshafc017a046e3bb5p1e71e3jsn9cd9b768b7e9",
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
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
