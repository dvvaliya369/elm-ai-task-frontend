import React, { memo } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  LightModeOutlined as LightModeIcon,
  DarkModeOutlined as DarkModeIcon,
} from '@mui/icons-material';
import { useThemeToggle } from '../../hooks/useThemeToggle';
import { themeToggleStyles } from './styles';

interface ThemeToggleProps {
  showTooltip?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showTooltip = true,
  size = 'medium',
  className,
}) => {
  const { mode, toggleTheme } = useThemeToggle();
  
  const isDark = mode === 'dark';
  const tooltipTitle = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const ariaLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  const button = (
    <IconButton
      onClick={toggleTheme}
      size={size}
      className={className}
      aria-label={ariaLabel}
      sx={themeToggleStyles.toggleButton}
    >
      {isDark ? (
        <LightModeIcon sx={themeToggleStyles.icon} />
      ) : (
        <DarkModeIcon sx={themeToggleStyles.icon} />
      )}
    </IconButton>
  );

  if (showTooltip) {
    return (
      <Tooltip title={tooltipTitle} arrow>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default memo(ThemeToggle);
