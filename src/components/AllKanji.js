import React, { useEffect, useState } from "react";

const AllKanji = () => {
  const [kanjiData, setKanjiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all kanji from the API
  useEffect(() => {
    const fetchKanji = async () => {
      const url = "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "YOUR_API_KEY", // Replace with your actual API key
          "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const resultData = await response.json();
        setKanjiData(resultData);
      } catch (error) {
        setError("Failed to fetch Kanji data.");
      } finally {
        setLoading(false);
      }
    };

    fetchKanji();
  }, []);

  if (loading) {
    return <div>Loading Kanji data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>All Kanji</h2>
      <div className="kanji-list">
        {kanjiData.map((kanji, index) => (
          <div key={index}>
            <strong>{kanji.character}</strong> - {kanji.meaning.english} {/* Display kanji character and meaning */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllKanji;
