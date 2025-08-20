import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import authReducer from "./authSlice";
import postReducer from "./postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelector = <T>(selector: (state: RootState) => T): T =>
  useReduxSelector(selector);

export const useDispatch = (): AppDispatch => useReduxDispatch<AppDispatch>();
