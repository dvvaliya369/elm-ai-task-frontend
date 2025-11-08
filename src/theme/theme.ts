import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
      "@media (max-width:400px)": {
        fontSize: "1.5rem",
      },
    },
    h2: {
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width:400px)": {
        fontSize: "1.375rem",
      },
    },
    h3: {
      fontSize: "1.75rem",
      "@media (max-width:600px)": {
        fontSize: "1.375rem",
      },
      "@media (max-width:400px)": {
        fontSize: "1.25rem",
      },
    },
    h4: {
      fontSize: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:400px)": {
        fontSize: "1.125rem",
      },
    },
    h5: {
      fontSize: "1.25rem",
      "@media (max-width:600px)": {
        fontSize: "1.125rem",
      },
      "@media (max-width:400px)": {
        fontSize: "1rem",
      },
    },
    h6: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.9375rem",
      },
      "@media (max-width:400px)": {
        fontSize: "0.875rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.9375rem",
      },
      "@media (max-width:400px)": {
        fontSize: "0.875rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      "@media (max-width:600px)": {
        fontSize: "0.8125rem",
      },
      "@media (max-width:400px)": {
        fontSize: "0.8rem",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (max-width:600px)": {
            paddingLeft: "8px",
            paddingRight: "8px",
          },
          "@media (min-width:600px)": {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
          "@media (min-width:960px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minHeight: "36px",
          "@media (max-width:600px)": {
            fontSize: "0.875rem",
            minHeight: "40px",
            padding: "8px 16px",
          },
          "@media (min-width:600px)": {
            minHeight: "36px",
            padding: "6px 16px",
          },
        },
        sizeLarge: {
          "@media (max-width:600px)": {
            minHeight: "44px",
            padding: "10px 20px",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            padding: "10px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            "& .MuiInputBase-input": {
              fontSize: "16px", // Prevents zoom on iOS
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "@media (max-width:600px)": {
            borderRadius: 0,
          },
        },
      },
    },
  },
});

export default theme;
