import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Palette as PaletteIcon,
  InvertColors as InvertColorsIcon,
  Brightness6 as Brightness6Icon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useTheme, useThemeCSSVariables } from "../../hooks/useThemeHooks";
import { useTheme as useContextTheme } from "../../context/ThemeContext";

// Theme showcase component
const ThemeShowcase: React.FC = () => {
  const { themeMode, toggleTheme } = useContextTheme();
  const { primaryColor, backgroundColor, textColor, paperColor } = useThemeCSSVariables();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Theme System Showcase
      </Typography>
      
      <Typography variant="body1" paragraph>
        Current theme: <Chip label={themeMode} color="primary" />
      </Typography>

      <Grid container spacing={3}>
        {/* Theme Controls */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <PaletteIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Theme Controls
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Toggle between light and dark themes to see the dynamic changes.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                startIcon={<InvertColorsIcon />}
                onClick={toggleTheme}
              >
                Switch to {themeMode === "light" ? "Dark" : "Light"} Theme
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* CSS Variables Display */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SettingsIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                CSS Variables
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        width: 20, 
                        height: 20, 
                        backgroundColor: primaryColor,
                        borderRadius: 1 
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Primary Color" 
                    secondary={primaryColor} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        width: 20, 
                        height: 20, 
                        backgroundColor: backgroundColor,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1 
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Background" 
                    secondary={backgroundColor} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        width: 20, 
                        height: 20, 
                        backgroundColor: textColor,
                        borderRadius: 1 
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Text Color" 
                    secondary={textColor} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Component Examples */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Brightness6Icon sx={{ mr: 1, verticalAlign: "middle" }} />
              Component Examples
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Sample Card</Typography>
                    <Typography variant="body2" color="text.secondary">
                      This card demonstrates the theme's card styling with proper contrast ratios.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Action</Button>
                    <Button size="small" variant="outlined">Outlined</Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 1 }}>
                  <Typography variant="h6">Primary Background</Typography>
                  <Typography variant="body2">
                    Text with proper contrast on primary color background.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ p: 2, bgcolor: "secondary.main", color: "secondary.contrastText", borderRadius: 1 }}>
                  <Typography variant="h6">Secondary Background</Typography>
                  <Typography variant="body2">
                    Text with proper contrast on secondary color background.
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" paragraph>
              <strong>Typography Examples:</strong>
            </Typography>
            
            <Typography variant="h2" component="h2" gutterBottom>
              Heading 2
            </Typography>
            <Typography variant="h4" component="h4" gutterBottom>
              Heading 4
            </Typography>
            <Typography variant="body1" paragraph>
              Body text that demonstrates the theme's typography system. This text should be 
              easily readable with proper contrast in both light and dark modes.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secondary text with reduced opacity for less important content.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThemeShowcase;
