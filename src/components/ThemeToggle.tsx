import React from "react";
import {
  IconButton,
  Switch,
  FormControlLabel,
  Tooltip,
  Box,
  useTheme,
} from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Brightness4 as Brightness4Icon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "../store";
import { toggleTheme } from "../store/themeSlice";

interface ThemeToggleProps {
  variant?: "switch" | "icon" | "icon-with-text";
  size?: "small" | "medium" | "large";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "icon",
  size = "medium",
}) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = useTheme();
  const isDark = themeMode === "dark";

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  if (variant === "switch") {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={isDark}
            onChange={handleToggle}
            size={size === "large" ? "medium" : "small"}
            color="primary"
          />
        }
        label={isDark ? "Dark Mode" : "Light Mode"}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: size === "small" ? "0.875rem" : "1rem",
          },
        }}
      />
    );
  }

  if (variant === "icon-with-text") {
    return (
      <Box
        onClick={handleToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          padding: 1,
          borderRadius: 1,
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {isDark ? (
          <DarkModeIcon fontSize={size} />
        ) : (
          <LightModeIcon fontSize={size} />
        )}
        <Box
          component="span"
          sx={{
            fontSize: size === "small" ? "0.875rem" : "1rem",
            fontWeight: 500,
          }}
        >
          {isDark ? "Dark" : "Light"}
        </Box>
      </Box>
    );
  }

  // Default icon variant
  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <IconButton
        onClick={handleToggle}
        color="inherit"
        size={size}
        sx={{
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {isDark ? (
          <LightModeIcon fontSize={size} />
        ) : (
          <DarkModeIcon fontSize={size} />
        )}
      </IconButton>
    </Tooltip>
  );
};

// Alternative component with animated icon
export const AnimatedThemeToggle: React.FC<Omit<ThemeToggleProps, "variant">> = ({
  size = "medium",
}) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const isDark = themeMode === "dark";

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <IconButton
        onClick={handleToggle}
        color="inherit"
        size={size}
        sx={{
          transition: "all 0.3s ease",
          transform: isDark ? "rotate(180deg)" : "rotate(0deg)",
          "&:hover": {
            transform: isDark ? "rotate(180deg) scale(1.1)" : "rotate(0deg) scale(1.1)",
          },
        }}
      >
        <Brightness4Icon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};