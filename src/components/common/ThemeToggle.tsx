import React from "react";
import {
  IconButton,
  Tooltip,
  Box,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Brightness6 as Brightness6Icon,
} from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";

// Theme toggle component props
interface ThemeToggleProps {
  variant?: "icon" | "button" | "switch";
  size?: "small" | "medium" | "large";
  showTooltip?: boolean;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}

// Theme toggle component
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "icon",
  size = "medium",
  showTooltip = true,
  tooltipPlacement = "bottom",
}) => {
  const { themeMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  // Icon based on current theme
  const getIcon = () => {
    if (themeMode === "dark") {
      return <DarkModeIcon />;
    }
    return <LightModeIcon />;
  };

  // Tooltip text
  const tooltipText = themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode";

  // Handle theme toggle
  const handleToggle = () => {
    toggleTheme();
  };

  // Render icon button variant
  if (variant === "icon") {
    const iconButton = (
      <IconButton
        onClick={handleToggle}
        size={size}
        sx={{
          color: muiTheme.palette.mode === "dark" ? "primary.main" : "primary.main",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: muiTheme.palette.action.hover,
            transform: "scale(1.1)",
          },
        }}
        aria-label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
      >
        {getIcon()}
      </IconButton>
    );

    if (showTooltip) {
      return (
        <Tooltip title={tooltipText} placement={tooltipPlacement}>
          {iconButton}
        </Tooltip>
      );
    }

    return iconButton;
  }

  // Render button variant (could be extended for other variants)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {variant === "icon" && (
        <IconButton
          onClick={handleToggle}
          size={size}
          sx={{
            color: muiTheme.palette.primary.main,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: muiTheme.palette.action.hover,
              transform: "scale(1.1)",
            },
          }}
        >
          <Brightness6Icon />
        </IconButton>
      )}
    </Box>
  );
};

export default ThemeToggle;
