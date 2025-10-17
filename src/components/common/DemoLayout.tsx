import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { ThemeToggle } from "../components";
import { useDocumentTheme } from "../hooks/useThemeHooks";

interface DemoLayoutProps {
  children: React.ReactNode;
}

// Demo layout component to showcase theme functionality
const DemoLayout: React.FC<DemoLayoutProps> = ({ children }) => {
  // Apply theme to document
  useDocumentTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Theme Demo App
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default DemoLayout;
