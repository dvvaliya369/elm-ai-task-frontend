import React, { memo } from 'react';
import { Box } from '@mui/material';
import elmLogo from '../../../assets/elm-logo.png';

const Logo: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img
      src={elmLogo}
      alt="Elm Logo"
      style={{
        height: '32px',
        width: 'auto',
        objectFit: 'contain',
        maxWidth: '120px',
      }}
    />
  </Box>
);

export default memo(Logo);
