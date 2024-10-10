import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { Person, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

// Import Google Fonts
import '@fontsource/dancing-script'; // Cursive font
import '@fontsource/poppins'; // Simple modern font

// Import the logo image
import logo from '../../src/assets/logo1.png'; 

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); 
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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

              <Link
                to="/booking"
                style={linkStyle}
                onMouseOver={linkHoverStyle}
                onMouseOut={linkOutStyle}
              >
                Appointment
              </Link>

              {/* Profile Icon with Dropdown */}
              <IconButton
                sx={{ color: 'white' }}
                onClick={handleClick} // Opens the dropdown
              >
                <PersonIcon />
              </IconButton>

              {/* Dropdown Menu for Profile Icon */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)} // Boolean check to open the menu
                onClose={handleClose} // Close the menu when clicked outside
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {/* Dropdown Option: Customer Dashboard */}
                <MenuItem onClick={handleClose}>
                  <Link to="/customerdashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Customer
                  </Link>
                </MenuItem>

                {/* Dropdown Option: Salon Dashboard */}
                <MenuItem onClick={handleClose}>
                  <Link to="/login
                  " style={{ textDecoration: 'none', color: 'inherit' }}>
                    Salon
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            // Hamburger Menu for Mobile
            <IconButton edge="end" onClick={toggleDrawer} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/services" onClick={toggleDrawer}>
            <ListItemText primary="Services" sx={{ fontFamily: 'Poppins, sans-serif' }} />
          </ListItem>
          <ListItem button component={Link} to="/packages" onClick={toggleDrawer}>
            <ListItemText primary="Packages" sx={{ fontFamily: 'Poppins, sans-serif' }} />
          </ListItem>
          <ListItem button component={Link} to="/products" onClick={toggleDrawer}>
            <ListItemText primary="Products" sx={{ fontFamily: 'Poppins, sans-serif' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
