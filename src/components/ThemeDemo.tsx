import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import { ThemeToggle, AnimatedThemeToggle } from "./ThemeToggle";
import { useThemeToggle } from "../hooks/useThemeToggle";

export const ThemeDemo: React.FC = () => {
  const theme = useTheme();
  const { mode, isDark } = useThemeToggle();

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Theme Toggle Demo
      </Typography>
      
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          marginBottom: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Current Theme: {isDark ? "Dark" : "Light"} Mode
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Theme preference is automatically saved to localStorage and will persist across browser sessions.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Icon Toggle
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Simple icon button with tooltip
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <ThemeToggle variant="icon" size="small" />
                <ThemeToggle variant="icon" size="medium" />
                <ThemeToggle variant="icon" size="large" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Switch Toggle
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Material-UI switch with label
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <ThemeToggle variant="switch" size="small" />
                <ThemeToggle variant="switch" size="medium" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Icon with Text
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Clickable area with icon and text
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <ThemeToggle variant="icon-with-text" size="small" />
                <ThemeToggle variant="icon-with-text" size="medium" />
                <ThemeToggle variant="icon-with-text" size="large" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Animated Toggle
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Rotating icon with smooth animation
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <AnimatedThemeToggle size="small" />
                <AnimatedThemeToggle size="medium" />
                <AnimatedThemeToggle size="large" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Theme Colors Preview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                textAlign: "center",
              }}
            >
              Primary
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                textAlign: "center",
              }}
            >
              Secondary
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                textAlign: "center",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              Background
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                textAlign: "center",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              Paper
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};