import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import { createAppTheme } from "./theme/theme.ts";
import { store } from "./store/index.ts";
import { ToastProvider } from "./context/ToastContext.tsx";
import { CustomThemeProvider, useTheme } from "./context/ThemeContext.tsx";
import Router from "./Router.tsx";
import "./index.css";

// font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// App wrapper component to use the theme context
const AppWithTheme: React.FC = () => {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);

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
      <CustomThemeProvider>
        <ToastProvider>
          <AppWithTheme />
        </ToastProvider>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>
);
