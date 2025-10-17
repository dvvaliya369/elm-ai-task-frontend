// Theme-related exports
export { ThemeContextProvider, useTheme } from "./ThemeContext";
export type { ThemeMode } from "./ThemeContext";

// Component exports
export { default as ThemeToggle } from "../components/common/ThemeToggle";

// Theme exports
export { lightTheme, darkTheme } from "./theme/theme";

// Utility function to get theme mode from localStorage
export const getStoredThemeMode = (): "light" | "dark" | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-preference");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  }
  return null;
};

// Utility function to detect system theme
export const getSystemThemeMode = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

// Utility function to get current theme preference
export const getCurrentThemeMode = (): "light" | "dark" => {
  const stored = getStoredThemeMode();
  return stored || getSystemThemeMode();
};
