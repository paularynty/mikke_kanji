import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { useTheme } from "./utils/DarkMode";
import KanjiDetails from "./components/KanjiDetails";
import KanjiSearch from "./components/KanjiSearch";
import KanjiList from "./components/KanjiList";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Profile from "./pages/Profile";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const validateToken = async (token) => {
    if (token) {
      try {
        const response = await axios.post('http://localhost:5001/auth/validate', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Log the response to debug
        console.log("Token validation response:", response.data);
        
        if (response.status === 200) {
          const userId = response.data.userId;
          if (userId) {
            setUserId(userId);
            const userResponse = await axios.get(`http://localhost:5001/users/${userId}`);
            setUserName(userResponse.data.username);
          } else {
            console.error("User ID is undefined.");
            setError("User ID is undefined.");
          }
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        setError("Failed to validate token.");
      }
    } else {
      console.error("No token found.");
      setError("No token found.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      validateToken(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setUserId(null);
    }
  }, [location]);

  const handleLogout = (reason) => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    setUserName("");
    setUserId(null);
    navigate("/login");

    if (reason === "inactivity") {
      navigate("/login", {
        state: { message: "You have been logged out due to inactivity." },
      });
    }
  };

  const handleUserLogout = () => {
    handleLogout("manual");
  };

  useEffect(() => {
    const fetchUsersSearch = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          // Ensure userId is defined before fetching users
          if (userId) {
            const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(resp.data);
          } else {
            console.error("User ID is undefined while fetching users.");
            setError("User ID is undefined.");
          }
        } catch (error) {
          setError("Failed to fetch users.");
        }
      }
    };

    fetchUsersSearch();
  }, [isLoggedIn, userId]); // Added userId to dependencies

  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className={darkMode ? "App dark-mode" : "App light-mode"}>
      <header className={darkMode ? "header dark-mode" : "header"}>
        <div className="link">Mikke!</div>
        <div className="header-content-right">
          <Link className="link" to="/home">Home</Link>
          <Link className="link" to="/search">Search</Link>
          <Link className="link" to="/kanji">All Kanji</Link>
          {!isLoggedIn && (
            <>
              <Link className="link" to="/login">Log In</Link>
              <Link className="link" to="/signup">Sign Up</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link className="link" to={`/profile/${userId}`}>Profile</Link>
              <button className="link" onClick={handleUserLogout}>Log Out</button>
            </>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
  );
}

export default App;