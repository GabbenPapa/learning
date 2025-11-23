import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { MovieSearch } from "../components/SearchMovies";

const menuItems = [
  { text: "Home", path: "/" },
  { text: "Popular Movies", path: "/popular" },
  { text: "Now Playing", path: "/now-playing" },
  { text: "Top Rated", path: "/top-rated" },
  { text: "Upcoming Movies", path: "/upcoming" },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1200,
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <GiHamburgerMenu size={22} />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <Box
            sx={{
              p: 3,
              bgcolor: "primary.main",
              color: "white",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Movie App
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Browse your favorite movies
            </Typography>
          </Box>

          <Divider />

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container sx={{ mt: 6 }}>
        <MovieSearch
          onSearch={() => {
            console.log("search");
          }}
        />
      </Container>
    </>
  );
};
