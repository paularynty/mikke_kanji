import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function KanjiDetails() {
  const { character } = useParams(); // Get the kanji or radical from the URL
  const [kanjiData, setKanjiData] = useState(null); // State to hold kanji data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchKanjiData = async () => {
      const url = `http://localhost:5001/kanji/details/${encodeURIComponent(
        character
      )}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setKanjiData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch kanji data.");
        setLoading(false);
      }
    };

    fetchKanjiData();
  }, [character]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="result">
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
        </div>
      ) : (
        <div>No data available for this kanji.</div>
      )}
    </div>
  );
}

export default KanjiDetails;