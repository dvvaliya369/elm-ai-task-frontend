import { createTheme } from "@mui/material/styles";

type ThemeMode = "light" | "dark" | "dark-blue" | "deep-yellow";

export const createAppTheme = (mode: ThemeMode) => {
  const getPaletteConfig = () => {
    if (mode === "light") {
      return {
        mode: "light" as const,
        primary: {
          main: "#1976d2",
        },
        background: {
          default: "#fafafa",
          paper: "#ffffff",
        },
      };
    }
    
    if (mode === "dark-blue") {
      return {
        mode: "dark" as const,
        primary: {
          main: "#64b5f6",
        },
        secondary: {
          main: "#42a5f5",
        },
        background: {
          default: "#0a1929",
          paper: "#132f4c",
        },
        text: {
          primary: "#e3f2fd",
          secondary: "#b3d9ff",
        },
      };
    }
    
    if (mode === "deep-yellow") {
      return {
        mode: "light" as const,
        primary: {
          main: "#F5A623",
        },
        secondary: {
          main: "#FF9800",
        },
        background: {
          default: "#FFF9E6",
          paper: "#FFF4D6",
        },
        text: {
          primary: "#2C2416",
          secondary: "#5C4A2F",
        },
      };
    }
    
    // default dark mode
    return {
      mode: "dark" as const,
      primary: {
        main: "#90caf9",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
    };
  };

  return createTheme({
    palette: getPaletteConfig(),
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });
};

const theme = createAppTheme("light");

export default theme;
