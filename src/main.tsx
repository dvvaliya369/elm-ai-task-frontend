import React, { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import { createAppTheme } from "./theme/theme.ts";
import { store } from "./store/index.ts";
import { ToastProvider } from "./context/ToastContext.tsx";
import { ThemeModeProvider, useThemeMode } from "./context/ThemeContext.tsx";
import Router from "./Router.tsx";
import "./index.css";

// font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const AppContent: React.FC = () => {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeModeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeModeProvider>
    </Provider>
  </React.StrictMode>
);
