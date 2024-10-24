import React from 'react';

function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Mikke!</h1>
      <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
        Mikke is your ultimate app for mastering Kanji! Whether you're just starting your journey into the Japanese language or you're a seasoned learner, we have all the tools you need to search, learn, and practice Kanji.
      </p>
      
      <div style={{ marginTop: '40px' }}>
        <h2>Features</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '16px', lineHeight: '1.6' }}>
          <li>🔍 Search for Kanji by character or meaning.</li>
          <li>📘 Access detailed Kanji information and stroke orders.</li>
          <li>📝 Keep track of your learning progress.</li>
          <li>💡 Explore example sentences and readings.</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <h2>Get Started</h2>
        <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Ready to start learning? Head over to the Kanji search or sign up to track your progress and dive deeper into the world of Kanji!
        </p>
        <a href="/signup" style={{ textDecoration: 'none', color: 'white', backgroundColor: '#4CAF50', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', marginTop: '20px' }}>Sign Up Now</a>
      </div>
    </div>
  );
}

export default Home;