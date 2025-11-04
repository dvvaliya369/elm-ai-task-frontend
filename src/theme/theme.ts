import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material/styles";

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1976d2",
            },
            background: {
              default: "#fafafa",
              paper: "#ffffff",
            },
          }
        : {
            primary: {
              main: "#90caf9",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });
};

const theme = createAppTheme("light");

export default theme;
