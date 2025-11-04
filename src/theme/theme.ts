import { createTheme, type Theme } from "@mui/material/styles";

export const createAppTheme = (mode: "light" | "dark"): Theme => {
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
