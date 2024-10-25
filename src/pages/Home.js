import React from "react";

function Home() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ textAlign: "center" }}>Welcome to Mikke!</h2>
      <p style={{ fontSize: "14px", maxWidth: "400px", margin: "0 auto" }}>
        Mikke is a quick, easy-to-use tool for Japanese language learners. It
        allows you to look up kanji (Japanese characters/ideograms adapted from
        Chinese characters).
      </p>

      {/* <div style={{ marginTop: "40px" }}> */}
      <h2 style={{ textAlign: "center" }}>Features</h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        <li>🔍 Search for individual kanji by English meaning</li>
        <li>📘 Access detailed kanji information and stroke orders</li>
        <li>📝 View a list of all available kanji from the database</li>
        <li>💡 Sort the kanji list by stroke order (ascending/descending)</li>
      </ul>
    </div>
  );
}

export default Home;
