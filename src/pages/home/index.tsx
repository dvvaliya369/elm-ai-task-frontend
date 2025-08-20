import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { Navbar } from "../../layouts";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Home Page
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
