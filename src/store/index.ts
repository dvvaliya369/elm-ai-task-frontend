import { configureStore } from "@reduxjs/toolkit";
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from "react-redux";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector = <T>(selector: (state: RootState) => T): T =>
  useReduxSelector(selector);

export const useDispatch = (): AppDispatch => useReduxDispatch<AppDispatch>();
