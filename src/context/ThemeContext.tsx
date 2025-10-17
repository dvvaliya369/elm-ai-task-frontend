import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../theme/theme";

// Theme mode type
export type ThemeMode = "light" | "dark";

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme context provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Local storage key for theme preference
const THEME_STORAGE_KEY = "theme-preference";

// Detect system theme preference
const getSystemTheme = (): ThemeMode => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

// Get saved theme preference or system preference
const getSavedTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  }
  return getSystemTheme();
};

// Theme context provider component
export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getSavedTheme);
  const [theme, setTheme] = useState<Theme>(themeMode === "dark" ? darkTheme : lightTheme);

  // Update theme when themeMode changes
  useEffect(() => {
    const newTheme = themeMode === "dark" ? darkTheme : lightTheme;
    setTheme(newTheme);
    
    // Save preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [themeMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if no preference is saved
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (!savedTheme) {
          setThemeMode(e.matches ? "dark" : "light");
        }
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      }
      // Legacy browsers
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === "light" ? "dark" : "light");
  };

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};

export default ThemeContext;
