import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, Box, Zoom, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem('licenseNumber');
    setLicenseNumber(storedLicenseNumber || '');

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/products/getproducts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'),
          },
          body: JSON.stringify({ licenseNumber: storedLicenseNumber }),
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

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`http://localhost:5050/api/products/${productToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productToDelete));
        toast.success('Product deleted successfully');
      } else {
        const responseText = await response.text();
        console.error('Failed to delete product:', responseText);
        toast.error(`Failed to delete product: ${responseText}`, { style: { backgroundColor: 'red' } });
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
      toast.error('Error deleting product. Please try again.', { style: { backgroundColor: 'red' } });
    } finally {
      setOpen(false);
      setProductToDelete(null);
    }
  };

  const handleUpdate = (product) => {
    navigate(`update/${product._id}`);
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #008080, #00b3b3)',
    color: 'white',
    transition: 'background 0.5s ease',
    backgroundSize: '200% 100%',
  };

  const hoverStyle = {
    backgroundPosition: 'right center',
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: 40 }}>
      <Typography style={{ fontFamily: "Poppins" }} variant="h4" component="h2" align="center" gutterBottom color="teal">
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
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                          aria-label="edit"
                          sx={{ color: 'teal' }}
                          onClick={() => handleUpdate(product)}
                        >
                          <EditIcon />
                        </IconButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "error.main" }}
                          onClick={() => handleDeleteClick(product._id)}
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
              backgroundPosition: 'left center',
            }
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addproducts")}
        >
          Add New Products
        </Button>
      </motion.div>
      <ToastContainer autoClose={2000} />

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpen(false)} 
            color="primary" 
            sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }} // Light grey on hover
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }} // Light grey on hover
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
