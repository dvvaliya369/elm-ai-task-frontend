import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material/styles";

export const createAppTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light theme colors
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: '#ffffff',
            paper: '#f5f5f5',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
          },
        }
      : {
          // Dark theme colors
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
          },
        }),
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  components: {
    // Customize component styles for both themes
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#1976d2' : '#1e1e1e',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
      },
    },
  },
});

// Default theme (will be replaced by dynamic theme)
const theme = createAppTheme('light');

export default theme;
