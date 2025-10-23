import { useCallback } from "react";
import { useSelector, useDispatch } from "../store";
import { toggleTheme, setTheme, type ThemeMode } from "../store/themeSlice";

export const useThemeToggle = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const setMode = useCallback(
    (mode: ThemeMode) => {
      dispatch(setTheme(mode));
    },
    [dispatch]
  );

  return {
    mode: themeMode,
    isDark: themeMode === "dark",
    isLight: themeMode === "light",
    toggle,
    setMode,
    setLight: useCallback(() => setMode("light"), [setMode]),
    setDark: useCallback(() => setMode("dark"), [setMode]),
  };
};