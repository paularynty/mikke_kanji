import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../utils/darkMode";

const KanjiSearch = () => {
  const [hasSearched, setHasSearched] = useState(false); // State to track if a search has been performed
  const [kanjiResults, setKanjiResults] = useState([]); // State for kanji results
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
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

    setHasSearched(true); // Set the search flag to true after initiating a search
    setLoading(true); // Set loading to true before fetching data

    const url = `http://localhost:5001/kanji/search?word=${encodeURIComponent(word)}`;

    try {
      const response = await fetch(url);
      const resultData = await response.json();

      if (Array.isArray(resultData) && resultData.length > 0) {
        const kanjiArray = [];

        resultData.forEach((kanjiData) => {
          if (kanjiData.kanji && kanjiData.kanji.character) {
            kanjiArray.push(kanjiData.kanji.character); // Add kanji to the array
          }
        });

        setKanjiResults(kanjiArray); // Update the kanji results state
      } else {
        setKanjiResults([]); // If no data found, clear results
      }
    } catch (error) {
      setError("Failed to fetch Kanji data.");
      setKanjiResults([]); // If an error is encountered, also clear results
    } finally {
      setLoading(false);
    }
  }, [searchTerm]); // Depend on searchTerm to ensure it uses the latest value

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        performSearch(); // Call search function on Enter key press
      }
    };

    // Attach keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
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
                    className={
                      darkMode
                        ? "grid-item-clickable dark-mode"
                        : "grid-item-clickable"
                    }
                    key={index}
                    onClick={() => (window.location.href = `/kanji/${kanji}`)} // Navigate to details page on click
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