import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ThemeToggle } from '../../components';
import { useTheme } from '../../context/ThemeContext';

const ThemeTestPage: React.FC = () => {
  const { mode, setTheme } = useTheme();

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto' }}>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Theme Test Page
        </Typography>
        <Typography variant="body1" paragraph>
          Current theme mode: <strong>{mode}</strong>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginTop: 2 }}>
          <Typography variant="body2">Toggle Theme:</Typography>
          <ThemeToggle />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => setTheme('light')}
            color={mode === 'light' ? 'primary' : 'inherit'}
          >
            Light Theme
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setTheme('dark')}
            color={mode === 'dark' ? 'primary' : 'inherit'}
          >
            Dark Theme
          </Button>
        </Box>

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Theme Preview:
          </Typography>
          <Paper elevation={2} sx={{ padding: 2, marginTop: 1 }}>
            <Typography variant="body1">
              This is how the theme looks with different components.
            </Typography>
            <Button variant="outlined" sx={{ marginTop: 1, marginRight: 1 }}>
              Outlined Button
            </Button>
            <Button variant="text" sx={{ marginTop: 1 }}>
              Text Button
            </Button>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default ThemeTestPage;
