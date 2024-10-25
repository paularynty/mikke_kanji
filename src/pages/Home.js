import React from "react";

function Home() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ textAlign: "center"}}>Welcome to Mikke!</h2>
      <p style={{ fontSize: "16px", maxWidth: "400px", margin: "0 auto" }}>
        Mikke was created as a quick, low-threshold way to look up kanji (Japanese
        characters/ideograms adapted from Chinese characters).
        </p>

      <div style={{ marginTop: "40px" }}>
      <h2 style={{ textAlign: "center"}}>Features</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          <li>🔍 Search for individual kanji by English meaning.</li>
          <li>📘 Access detailed kanji information and stroke orders.</li>
          <li>📝 View a list of all kanji available from the database.</li>
          <li>💡 Sort the kanji list by stroke order (ascending/descending).</li>
        </ul>
      </div>

      {/* <div style={{ marginTop: "40px" }}>
        <h2>Get Started</h2>
        <p style={{ fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
          Ready to start learning? Head over to the Kanji search or sign up to
          track your progress and dive deeper into the world of Kanji!
        </p>
        <a
          href="/signup"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#4CAF50",
            padding: "10px 20px",
            borderRadius: "5px",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          Sign Up Now
        </a>
      </div> */}
    </div>
  );
}

export default Home;
