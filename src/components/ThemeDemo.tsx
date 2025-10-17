import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const ThemeDemo: React.FC = () => {
  const { themeMode, toggleTheme, setThemeMode } = useAppTheme();

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom align="center">
        Theme Demo
      </Typography>
      
      <Typography variant="body1" paragraph align="center">
        Current theme: <strong>{themeMode}</strong>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <ThemeToggle size="large" />
        <Button
          variant="outlined"
          startIcon={<Brightness7 />}
          onClick={() => setThemeMode('light')}
          disabled={themeMode === 'light'}
        >
          Light Mode
        </Button>
        <Button
          variant="outlined"
          startIcon={<Brightness4 />}
          onClick={() => setThemeMode('dark')}
          disabled={themeMode === 'dark'}
        >
          Dark Mode
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Colors Demo
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="contained" color="primary">Primary Button</Button>
            <Button variant="contained" color="secondary">Secondary Button</Button>
            <Button variant="contained" color="success">Success Button</Button>
            <Button variant="contained" color="error">Error Button</Button>
            <Button variant="contained" color="warning">Warning Button</Button>
            <Button variant="contained" color="info">Info Button</Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Typography Demo
          </Typography>
          <Typography variant="h1" sx={{ fontSize: '1.5rem' }}>Heading 1</Typography>
          <Typography variant="h2" sx={{ fontSize: '1.25rem' }}>Heading 2</Typography>
          <Typography variant="h3" sx={{ fontSize: '1.1rem' }}>Heading 3</Typography>
          <Typography variant="body1">Body text primary</Typography>
          <Typography variant="body2" color="text.secondary">Body text secondary</Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Button Variants
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Background Colors
          </Typography>
          <Typography variant="body2" paragraph>
            This card demonstrates the current theme's background and text colors.
            The background adapts automatically based on the selected theme.
          </Typography>
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'background.default', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography>Default Background</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ThemeDemo;
