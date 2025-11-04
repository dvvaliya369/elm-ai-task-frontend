import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();

  const getTooltipTitle = () => {
    if (mode === "light") return "Switch to dark mode";
    if (mode === "dark") return "Switch to dark blue mode";
    if (mode === "dark-blue") return "Switch to deep yellow mode";
    return "Switch to light mode";
  };

  return (
    <Tooltip title={getTooltipTitle()}>
      <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
