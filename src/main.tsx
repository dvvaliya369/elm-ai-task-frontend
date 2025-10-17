import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import { store } from "./store/index.ts";
import { ToastProvider } from "./context/ToastContext.tsx";
import { ThemeContextProvider, useTheme } from "./context/ThemeContext.tsx";
import Router from "./Router.tsx";
import "./index.css";

// font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// App wrapper component that uses the theme context
const AppWrapper: React.FC = () => {
  const { theme } = useTheme();
  
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
      <ToastProvider>
        <ThemeContextProvider>
          <AppWrapper />
        </ThemeContextProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
