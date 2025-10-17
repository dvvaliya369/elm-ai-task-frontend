import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  showTooltip?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'medium', 
  color = 'inherit', 
  showTooltip = true 
}) => {
  const { themeMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  const isDark = themeMode === 'dark';
  const tooltipText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  const Icon = isDark ? Brightness7 : Brightness4;

  const toggleButton = (
    <IconButton
      onClick={toggleTheme}
      color={color}
      size={size}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      sx={{
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Icon />
    </IconButton>
  );

  if (!showTooltip) {
    return toggleButton;
  }

  return (
    <Tooltip title={tooltipText} placement="bottom">
      {toggleButton}
    </Tooltip>
  );
};

export default ThemeToggle;
