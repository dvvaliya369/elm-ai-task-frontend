import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "../store";
import { createAppTheme } from "../theme/theme";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = createAppTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};