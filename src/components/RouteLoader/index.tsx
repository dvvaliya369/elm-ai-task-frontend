import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { routeLoaderStyles } from './styles';

const RouteLoader: React.FC = () => {
  return (
    <Box sx={routeLoaderStyles.container}>
      <CircularProgress />
    </Box>
  );
};

export default RouteLoader;
