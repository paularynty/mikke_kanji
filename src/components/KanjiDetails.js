import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function KanjiDetails() {
  const { character } = useParams(); // Get the kanji or radical from the URL
  const [kanjiData, setKanjiData] = useState(null); // State to hold kanji data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchKanjiData = async () => {
      const url = `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${encodeURIComponent(character)}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "15ae912ac0mshafc017a046e3bb5p1e71e3jsn9cd9b768b7e9",
          "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setKanjiData(data); // Set the kanji data
        setLoading(false); // Disable loading
      } catch (error) {
        console.error(error);
        setError("Failed to fetch kanji data.");
        setLoading(false); // Disable loading in case of error
      }
    };

    fetchKanjiData();
  }, [character]); // Re-fetch if character changes

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error if there's an issue
  }

  return (
    <div>
      {kanjiData ? (
        <div>
          <div className="kanjiDetail">{kanjiData.kanji.character}</div>
          <h2>Meaning</h2>
          <div className="result">{kanjiData.kanji.meaning.english}</div>
          <h2>Onyomi</h2>
          <div className="result">{kanjiData.kanji.onyomi.katakana}</div>
          <div className="result">{kanjiData.kanji.onyomi.romaji}</div>

          <h2>Kunyomi</h2>
          <div className="result">{kanjiData.kanji.kunyomi.hiragana}</div>
          <div className="result">{kanjiData.kanji.kunyomi.romaji}</div>
          <h2>Strokes</h2>
          <div className="result">{kanjiData.kanji.strokes.count}</div>
          {/* <h2>Animation</h2>
          <div className="result">{kanjiData.kanji.video.poster}</div> */}
        </div>
      ) : (
        <div>No data available for this kanji.</div>
      )}
    </div>
  );
}

export default KanjiDetails;