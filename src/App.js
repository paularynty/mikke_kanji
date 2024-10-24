import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Home from "./Home"; // Your existing homepage
import { useTheme } from "./components/DarkMode";
import KanjiDetails from "./components/KanjiDetails";
import KanjiSearch from "./components/KanjiSearch";
import KanjiList from "./components/KanjiList";
// // import Login from "./pages/Login";
// import Register from "./pages/Register";
import "./App.css";

function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Router>
      <div className={darkMode ? "App dark-mode" : "App light-mode"}>
        <header className={darkMode ? "header dark-mode" : "header"}>
          <div className="link">KanjiDex</div>
          <div className="header-content-right">
            <Link className="link" to="/home">
              Home
            </Link>
            <Link className="link" to="/search">
              Search
            </Link>
            <Link className="link" to="/kanji">
              All Kanji
            </Link>
            <Link className="link" to="/login">
              Log In
            </Link>
            <Link className="link" to="/signup">
              Sign Up
            </Link>
          </div>
        </header>
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Register />} /> */}
          <Route path="/kanji" element={<KanjiList />} />
          <Route path="/search" element={<KanjiSearch />} />
          <Route path="/kanji/:character" element={<KanjiDetails />} />
        </Routes>
        <div className="button">
          <button onClick={toggleDarkMode}>
            {darkMode ? "Switch to light mode" : "Switch to dark mode"}
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
