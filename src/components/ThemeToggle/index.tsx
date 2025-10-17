import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'default' | 'primary' | 'secondary';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'medium',
  color = 'inherit'
}) => {
  const { mode, toggleTheme } = useTheme();

  const tooltipTitle = `Switch to ${mode === 'light' ? 'dark' : 'light'} mode`;
  const Icon = mode === 'light' ? Brightness4 : Brightness7;

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        onClick={toggleTheme}
        size={size}
        color={color}
        aria-label="Toggle theme"
        sx={{
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'rotate(20deg)',
          },
        }}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
