import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use for navigation
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import Zoom from "@mui/material/Zoom";
import { Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem('licenseNumber');
    setLicenseNumber(storedLicenseNumber || '');

    // Fetch packages from the server
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/packages/getpackages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
          body: JSON.stringify({ licenseNumber: storedLicenseNumber }), // Send license number in body
        });

        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        } else {
          console.error('Failed to fetch packages');
        }
      } catch (error) {
        console.error('Error fetching packages:', error.message);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (packageId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/packages/${packageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
        },
      });
  
      // Check for successful response
      if (response.ok) {
        setPackages(packages.filter((pkg) => pkg._id !== packageId));
        alert('Package deleted successfully');
      } else {
        const responseText = await response.text();
        console.error('Failed to delete package:', responseText);
      }
    } catch (error) {
      console.error('Error deleting package:', error.message);
    }
  };

  const handleUpdate = (pkg) => {
    navigate(`update/${pkg._id}`); // Navigate to the update form with package ID
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #008080, #00b3b3)', // Initial gradient
    color: 'white',
    transition: 'background 0.5s ease', // Smooth transition for background
    backgroundSize: '200% 100%', // Allows the gradient to move
  };
  
  const hoverStyle = {
    backgroundPosition: 'right center', // Moves the gradient on hover
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Typography style={{ fontfamily: "Poppins" }} variant="h4" component="h2" align="center" gutterBottom color="teal">
        Package List
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 1 }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#008080" }}>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Package Name</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg, index) => (
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={pkg._id}>
                <TableRow hover>
                  <TableCell>{pkg.packageName}</TableCell>
                  <TableCell>{pkg.description}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-between">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                          aria-label="edit"
                          sx={{ color: "teal" }}
                          onClick={() => handleUpdate(pkg)}
                        >
                          <Edit />
                        </IconButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "error.main" }}
                          onClick={() => handleDelete(pkg._id)}
                        >
                          <Delete />
                        </IconButton>
                      </motion.div>
                    </Box>
                  </TableCell>
                </TableRow>
              </Zoom>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <motion.div whileHover={{ ...hoverStyle }}>
      <Button
        variant="contained"
        sx={{
          ...buttonStyle,
          marginTop: 2,
          '&:hover': {
            backgroundPosition: 'left center', // Change position on hover
          }
        }}
        startIcon={<AddIcon />}
        onClick={() => navigate("/admin/addpackages")}
      >
        Add New Packages
      </Button>
      </motion.div>
    </Container>
  );
}
