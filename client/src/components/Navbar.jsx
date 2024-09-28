import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Person, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query for mobile screens

  const linkStyle = {
    textDecoration: 'none',
    color: '#0B7D7D',
    marginRight: '20px',
    transition: 'color 0.3s ease',
    fontWeight: 'bold', // Make the font bold
  };

  const linkHoverStyle = (e) => {
    e.currentTarget.style.color = '#004D40'; // Change color on hover
  };

  const linkOutStyle = (e) => {
    e.currentTarget.style.color = '#0B7D7D'; // Restore color when not hovered
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#EAEAEA', 
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.9)', // Increased box shadow
        }}
      >
        <Toolbar>
          {/* Brand Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#0B7D7D' }}>
            GLAMEASE
          </Typography>

          {/* Navigation Links for Desktop */}
          {!isMobile ? (
            <Box>
              <Link
                to="/services"
                style={linkStyle}
                onMouseOver={linkHoverStyle}
                onMouseOut={linkOutStyle}
              >
                Services
              </Link>
              <Link
                to="/packages"
                style={linkStyle}
                onMouseOver={linkHoverStyle}
                onMouseOut={linkOutStyle}
              >
                Packages
              </Link>
              <Link
                to="/products"
                style={linkStyle}
                onMouseOver={linkHoverStyle}
                onMouseOut={linkOutStyle}
              >
                Products
              </Link>
            </Box>
          ) : (
            // Hamburger Menu for Mobile
            <IconButton edge="end" onClick={toggleDrawer} sx={{ color: '#0B7D7D' }}>
              <Menu />
            </IconButton>
          )}

          {/* Profile Icon */}
          <IconButton sx={{ color: '#0B7D7D' }}>
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/services" onClick={toggleDrawer}>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem button component={Link} to="/packages" onClick={toggleDrawer}>
            <ListItemText primary="Packages" />
          </ListItem>
          <ListItem button component={Link} to="/products" onClick={toggleDrawer}>
            <ListItemText primary="Products" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
