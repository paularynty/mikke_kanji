import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Function to toggle dark mode manually
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
      return newMode;
    });
  };

  // Detect system's dark/light mode on mount
  useEffect(() => {
    // Check for saved user preference in localStorage
    const savedPreference = localStorage.getItem("darkMode");

    if (savedPreference === "enabled") {
      setDarkMode(true); // If user prefers dark mode
    } else if (savedPreference === "disabled") {
      setDarkMode(false); // If user prefers light mode
    } else {
      // If no preference is saved, check the system's theme
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemPrefersDark); // Apply system preference
    }

    // Listen for system theme changes
    const systemThemeListener = (e) => {
      setDarkMode(e.matches); // Update darkMode if the system theme changes
    };

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeListener);

    // Cleanup listener on unmount
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", systemThemeListener);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};