import type { SxProps, Theme } from '@mui/material/styles';

export const themeToggleStyles = {
  toggleButton: {
    borderRadius: '50%',
    padding: 1,
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'action.hover',
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  } as SxProps<Theme>,

  icon: {
    fontSize: '1.25rem',
    transition: 'transform 0.3s ease-in-out',
  } as SxProps<Theme>,

  rotateIcon: {
    transform: 'rotate(180deg)',
  } as SxProps<Theme>,
};
