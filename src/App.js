import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import { useTheme } from "./utils/darkMode";
import KanjiDetails from "./components/KanjiDetails";
import KanjiSearch from "./components/KanjiSearch";
import KanjiList from "./components/KanjiList";
import "./App.css";

function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={darkMode ? "App dark-mode" : "App light-mode"}>
      <header className={darkMode ? "header dark-mode" : "header"}>
        <div className="link">Mikke!</div>
        <div className="header-content-right">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/search">
            Search
          </Link>
          <Link className="link" to="/kanji">
            All Kanji
          </Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanji" element={<KanjiList />} />
        <Route path="/search" element={<KanjiSearch />} />
        <Route path="/kanji/:character" element={<KanjiDetails />} />
      </Routes>
      <div className="button">
        <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to light mode" : "Switch to dark mode"}
        </button>
      </div>
      <footer className={darkMode ? "footer dark-mode" : "footer"}>
        <span>
          <a href="https://github.com/paularynty/">GitHub</a>
        </span>
        <span>|</span>
        <span>
          <a href="https://rapidapi.com/KanjiAlive/api/learn-to-read-and-write-japanese-kanji/">
            Kanji database
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
