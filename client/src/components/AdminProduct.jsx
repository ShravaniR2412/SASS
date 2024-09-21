import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use for navigation
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, Box, Zoom, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import AddIcon from "@mui/icons-material/Add";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem('licenseNumber');
    setLicenseNumber(storedLicenseNumber || '');

    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/products/getproducts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
          body: JSON.stringify({ licenseNumber: storedLicenseNumber }), // Send license number in body
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
        },
      });
  
      // Check for successful response
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        alert('Product deleted successfully');
      } else {
        const responseText = await response.text();
        console.error('Failed to delete product:', responseText);
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleUpdate = (product) => {
    navigate(`update/${product._id}`); // Navigate to the update form with product ID
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
        Product List
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 1 }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#008080" }}>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={product._id}>
                <TableRow hover>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="space-between">
                      {/* Update Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton 
                          aria-label="edit"
                          sx={{ color: 'teal' }} 
                          onClick={() => handleUpdate(product)}
                        >
                          <EditIcon />
                        </IconButton>
                      </motion.div>

                      {/* Delete Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "error.main" }}
                          onClick={() => handleDelete(product._id)}
                        >
                          <DeleteIcon />
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
        onClick={() => navigate("/admin/addproducts")}
      >
        Add New Products
      </Button>
      </motion.div>
    </Container>
  );
}
