import { createTheme, type Theme } from "@mui/material/styles";
import type { ThemeMode } from "../store/themeSlice";

export const createAppTheme = (mode: ThemeMode): Theme => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Light theme colors
            primary: {
              main: "#1976d2",
            },
            secondary: {
              main: "#dc004e",
            },
            background: {
              default: "#fafafa",
              paper: "#ffffff",
            },
            text: {
              primary: "#212121",
              secondary: "#757575",
            },
          }
        : {
            // Dark theme colors
            primary: {
              main: "#90caf9",
            },
            secondary: {
              main: "#f48fb1",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0b0b0",
            },
          }),
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
    components: {
      // Customize components for better dark/light theme support
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          },
        },
      },
    },
  });
};

// Default theme (light mode)
const theme = createAppTheme("light");

export default theme;
