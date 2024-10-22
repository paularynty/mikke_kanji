import React, { useState, useEffect } from "react";
import { useTheme } from "./LightDarkMode";
import KanjiSort from "./KanjiSort";

const KanjiList = () => {
  const [sortType, setSortType] = useState("default");
  const [kanjiData, setKanjiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchKanji = async () => {
      const url = "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "15ae912ac0mshafc017a046e3bb5p1e71e3jsn9cd9b768b7e9",
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="button-sort">
        <select
          defaultValue="default"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option disabled value="default">
            Sort by
          </option>
          <option value="ascending">Ascending (Stroke count)</option>
          <option value="descending">Descending (Stroke count)</option>
        </select>
      </div>
      <KanjiSort data={kanjiData} sortType={sortType} />
      <div className="grid-container">
        {kanjiData.map((kanji, index) => (
          <div
            className={
              darkMode ? "grid-item-clickable dark-mode" : "grid-item-clickable"
            }
            key={index}
            onClick={() => (window.location.href = `/kanji/${kanji.ka_utf}`)}
          >
            {kanji.ka_utf}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanjiList;
