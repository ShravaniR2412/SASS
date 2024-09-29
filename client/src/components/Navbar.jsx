import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Person, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Import Google Fonts
import '@fontsource/dancing-script'; // Cursive font
import '@fontsource/poppins'; // Simple modern font

// Import the logo image
import logo from '../../src/assets/logo1.png'; // Make sure the path to logo.png is correct

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query for mobile screens

  const linkStyle = {
    textDecoration: 'none',
    color: 'white', // White text color
    fontSize: '17px',
    marginRight: '20px',
    margin: '20px',
    transition: 'all 0.3s ease', // Smooth transition for hover effects
  };

  const linkHoverStyle = (e) => {
    e.currentTarget.style.backgroundColor = '#004D40'; // Dark teal background on hover
    e.currentTarget.style.borderRadius = '5px'; // Add more border radius on hover
    e.currentTarget.style.padding = '2px '; // Increase padding on hover to expand the size
    e.currentTarget.style.transition = 'transform 0.3s ease, background-color 0.3s ease'; // Smooth transition for size, padding, and background
  };

  const linkOutStyle = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'; // Remove background when not hovered
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#008080', // Teal background color
          marginBottom: '10px', // Add margin at the bottom of the navbar
        }}
      >
        <Toolbar>
          {/* Logo and Brand Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img 
                src={logo} 
                alt="GlamEase Logo" 
                style={{ width: '55px', height: '55px', marginRight: '10px' }} // Adjust logo size and spacing
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  color: 'white', // White text color
                  fontFamily: "'Dancing Script', cursive", // Proper cursive font for GLAMEASE
                  fontSize: '1.8rem', // Slightly larger font size
                }}
              >
                GlamEase
              </Typography>
            </Link>
          </Box>

          {/* Navigation Links for Desktop */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/home/services"
                style={linkStyle}
                onMouseOver={linkHoverStyle}
                onMouseOut={linkOutStyle}
              >
                Services
              </Link>
              <Link
                to="/home/packages"
                style={linkStyle}
                onMouseOver={linkHoverStyle}
                onMouseOut={linkOutStyle}
              >
                Packages
              </Link>
              <Link
                to="/home/products"
                style={linkStyle}
                onMouseOver={linkHoverStyle}
                onMouseOut={linkOutStyle}
              >
                Products
              </Link>

              {/* Profile Icon */}
              <IconButton sx={{ color: 'white' }}>
                <Person />
              </IconButton>
            </Box>
          ) : (
            // Hamburger Menu for Mobile
            <IconButton edge="end" onClick={toggleDrawer} sx={{ color: 'white' }}>
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/home/services" onClick={toggleDrawer}>
            <ListItemText primary="Services" sx={{ fontFamily: 'Poppins, sans-serif' }} />
          </ListItem>
          <ListItem button component={Link} to="/home/packages" onClick={toggleDrawer}>
            <ListItemText primary="Packages" sx={{ fontFamily: 'Poppins, sans-serif' }} />
          </ListItem>
          <ListItem button component={Link} to="/home/products" onClick={toggleDrawer}>
            <ListItemText primary="Products" sx={{ fontFamily: 'Poppins, sans-serif' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
