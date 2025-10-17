import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useSelector, useDispatch } from '../store';
import { toggleTheme, setThemeMode } from '../store/themeSlice';
import { ThemeMode } from '../theme/theme';

interface ReduxThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  showTooltip?: boolean;
}

const ReduxThemeToggle: React.FC<ReduxThemeToggleProps> = ({ 
  size = 'medium', 
  color = 'inherit', 
  showTooltip = true 
}) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const muiTheme = useMuiTheme();

  const isDark = themeMode === 'dark';
  const tooltipText = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  const Icon = isDark ? Brightness7 : Brightness4;

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const handleSetMode = (mode: ThemeMode) => {
    dispatch(setThemeMode(mode));
  };

  const toggleButton = (
    <IconButton
      onClick={handleToggle}
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

export default ReduxThemeToggle;
