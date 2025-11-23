import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { GlobalSearchBar } from "./GlobalSearchBar";

const menuItems = [
  { text: "Home", path: "/" },
  { text: "Popular Movies", path: "/popular" },
  { text: "Now Playing", path: "/now-playing" },
];

export const Layout: React.FC = () => {
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
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hamburger Menu Button */}
      {!drawerOpen && (
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            position: "fixed",
            top: 32,
            left: 16,
            zIndex: 1200,
            // bgcolor: "primary.main",
            color: "black",
            
          }}
        >
          <GiHamburgerMenu size={22} />
        </IconButton>
      )}

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }}>
          <Box sx={{ p: 3, bgcolor: "primary.main", color: "white" }}>
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
                  sx={{ py: 1.5, "&:hover": { bgcolor: "action.hover" } }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Global Search Bar */}
      <GlobalSearchBar />

      {/* Page Content */}
      <Box component="main" sx={{ flexGrow: 1, pt: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
