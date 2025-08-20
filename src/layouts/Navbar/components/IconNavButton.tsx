import React, { memo } from 'react';
import { IconButton } from '@mui/material';

interface IconNavButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const IconNavButton: React.FC<IconNavButtonProps> = ({ icon, onClick, isActive }) => (
  <IconButton
    onClick={onClick}
    sx={{
      color: isActive ? 'primary.main' : 'text.secondary',
      bgcolor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
      p: 1.5,
      borderRadius: 2,
      '&:hover': {
        bgcolor: 'rgba(25, 118, 210, 0.08)',
        color: 'primary.main',
      },
    }}
  >
    {icon}
  </IconButton>
);

export default memo(IconNavButton);
