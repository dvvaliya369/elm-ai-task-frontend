import React, { memo } from 'react';
import { Chip } from '@mui/material';

interface NavButtonProps {
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, onClick, isActive }) => (
  <Chip
    icon={icon}
    label={label}
    variant="outlined"
    onClick={onClick}
    sx={{
      bgcolor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
      color: isActive ? 'primary.main' : 'text.secondary',
      border: 'none',
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      px: 2.5,
      py: 1,
      height: 'auto',
      '&:hover': {
        bgcolor: 'rgba(25, 118, 210, 0.08)',
        color: 'primary.main',
      },
      '& .MuiChip-icon': {
        color: 'inherit',
        marginLeft: 0,
        marginRight: '8px',
      },
      '& .MuiChip-label': {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        paddingLeft: 0,
        paddingRight: 0,
      },
    }}
  />
);

export default memo(NavButton);
