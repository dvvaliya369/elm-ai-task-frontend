import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import { store } from "./store/index.ts";
import { ToastProvider } from "./context/ToastContext.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import Router from "./Router.tsx";
import "./index.css";

// font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>
);
