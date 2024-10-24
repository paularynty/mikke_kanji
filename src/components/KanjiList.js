import React, { useEffect, useState } from "react";
import { useTheme } from "../utils/DarkMode";

const KanjiList = () => {
  const [kanjiResults, setKanjiResults] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  // by default, we fetch non-sorted kanji data
  useEffect(() => {
    const fetchNonSortedKanji = async () => {
      try {
        const response = await fetch("http://localhost:5001/kanji");
        const resultData = await response.json();
        setKanjiResults(resultData);
      } catch (error) {
        setError("Failed to fetch kanji data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNonSortedKanji();
  }, []);

  // when sortType changes, trigger sorting request and fetch sorted kanji data
  // if/when sorting changes, re-run useEffect
  useEffect(() => {
    const fetchSortedKanji = async () => {
      if (sortType === "default") return;
      try {
        const response = await fetch(
          `http://localhost:5001/kanji/sorted?sortType=${sortType}`
        );
        const resultData = await response.json();
        setKanjiResults(resultData);
      } catch (error) {
        setError("Failed to fetch sorted kanji data.");
      }
    };

    fetchSortedKanji();
  }, [sortType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(kanjiResults) || kanjiResults.length === 0) {
    return <div>No data available.</div>;
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
      <div className="grid-container">
        {kanjiResults.map((kanji, index) =>
          kanji.kanji.character ? (
            <div
              className={
                darkMode
                  ? "grid-item-clickable dark-mode"
                  : "grid-item-clickable"
              }
              key={index}
              onClick={() =>
                (window.location.href = `/kanji/${kanji.kanji.character}`)
              }
            >
              {kanji.kanji.character}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default KanjiList;
