import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notFoundStyles } from './styles';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box sx={notFoundStyles.container}>
      <Typography variant="h1" component="h1" sx={notFoundStyles.title}>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={notFoundStyles.description}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
