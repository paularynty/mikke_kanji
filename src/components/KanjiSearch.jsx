import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../utils/darkMode";

const KanjiSearch = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [kanjiResults, setKanjiResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  // Memoized function to handle search logic
  const performSearch = useCallback(async () => {
    const word = searchTerm.trim();

    if (!word) {
      alert("Enter a word to search for.");
      return;
    }

    setError(null);
    setHasSearched(true);
    setLoading(true);

    try {
      // Call the serverless function
      const response = await fetch(
        `/api/kanjiSearch?word=${encodeURIComponent(word)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Kanji data");
      }
      const resultData = await response.json();

      if (Array.isArray(resultData) && resultData.length > 0) {
        const kanjiArray = resultData.map(
          (kanjiData) => kanjiData.kanji.character
        );
        setKanjiResults(kanjiArray);
      } else {
        setKanjiResults([]); // Clear results if no data is found
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch Kanji data.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        performSearch(); // Call search function on Enter key press
      }
    };

    // Attach keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [performSearch]); // Include performSearch in the dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Enter English word"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
        />
        <button onClick={performSearch}>Search</button>{" "}
      </div>
      {hasSearched && (
        <>
          <h2>Search results</h2>
          <div className="result">
            <div className="grid-container">
              {kanjiResults.length > 0 ? (
                kanjiResults.map((kanji, index) => (
                  <div
                    className={darkMode ? "grid-item dark-mode" : "grid-item"}
                    key={index}
                    onClick={() => (window.location.href = `/kanji/${kanji}`)}
                  >
                    {kanji}
                  </div>
                ))
              ) : (
                <div>No kanji found.</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default KanjiSearch;
