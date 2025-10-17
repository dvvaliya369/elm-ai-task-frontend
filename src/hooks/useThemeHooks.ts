import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

// Hook to manage document-level theme attributes
export const useDocumentTheme = () => {
  const { themeMode } = useTheme();

  useEffect(() => {
    // Set data-theme attribute on document element
    document.documentElement.setAttribute("data-theme", themeMode);
    
    // Also set a class for additional CSS targeting
    document.documentElement.className = `theme-${themeMode}`;
    
    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }
    
    // Set theme color based on current mode
    metaThemeColor.content = themeMode === "dark" ? "#121212" : "#ffffff";
    
  }, [themeMode]);
};

// Hook for accessing theme CSS custom properties
export const useThemeCSSVariables = () => {
  const { themeMode } = useTheme();

  const getCSSVariable = (variableName: string): string => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }
    return "";
  };

  const setCSSVariable = (variableName: string, value: string): void => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(variableName, value);
    }
  };

  return {
    themeMode,
    getCSSVariable,
    setCSSVariable,
    // Predefined getters for common variables
    primaryColor: getCSSVariable("--color-primary"),
    backgroundColor: getCSSVariable("--color-background"),
    textColor: getCSSVariable("--color-text-primary"),
    paperColor: getCSSVariable("--color-background-paper"),
  };
};

// Hook for theme-aware animations
export const useThemeTransitions = () => {
  const { themeMode } = useTheme();

  const transitionProps = {
    fast: "var(--transition-fast)",
    medium: "var(--transition-medium)", 
    slow: "var(--transition-slow)",
  };

  const getTransitionStyle = (duration: keyof typeof transitionProps = "medium") => ({
    transition: `all ${transitionProps[duration]}`,
  });

  return {
    themeMode,
    transitionProps,
    getTransitionStyle,
  };
};

// Hook for responsive theme detection
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = React.useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      // Set initial value
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
      
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? "dark" : "light");
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

  return systemTheme;
};

// Hook for theme persistence utilities
export const useThemePersistence = () => {
  const { themeMode, setThemeMode } = useTheme();

  const saveThemeToStorage = (mode: "light" | "dark") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-preference", mode);
    }
  };

  const loadThemeFromStorage = (): "light" | "dark" | null => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme-preference");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    }
    return null;
  };

  const clearThemeFromStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("theme-preference");
    }
  };

  const setAndSaveTheme = (mode: "light" | "dark") => {
    setThemeMode(mode);
    saveThemeToStorage(mode);
  };

  return {
    themeMode,
    saveThemeToStorage,
    loadThemeFromStorage,
    clearThemeFromStorage,
    setAndSaveTheme,
  };
};
