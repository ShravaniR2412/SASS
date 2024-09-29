import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#0B7D7D', color: 'white', py: 4, textAlign: 'center' }}>
      <Typography variant="body1" sx={{  }}>
        © 2024 Glamease - All Rights Reserved
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <IconButton sx={{ color: 'white' }}>
          <Facebook />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <Twitter />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <Instagram />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
