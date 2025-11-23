import React from "react";
import { Container, Typography, Box } from "@mui/material";

export const Home: React.FC = () => {
  return (
    <Container sx={{ mt: 6 }}>
      <Box textAlign="center" sx={{ mt: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Movie App
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          Search for movies above or browse categories from the menu
        </Typography>
      </Box>
    </Container>
  );
};
