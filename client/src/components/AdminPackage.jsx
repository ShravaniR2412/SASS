import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { motion } from "framer-motion";
import Zoom from "@mui/material/Zoom";
import { Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem('licenseNumber');
    setLicenseNumber(storedLicenseNumber || '');

    const fetchPackages = async (licenseNumber) => {
      try {
        const response = await fetch('http://localhost:5050/api/packages/getpackages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'),
          },
          body: JSON.stringify({ licenseNumber }),
        });

        if (response.ok) {
          const data = await response.json();
          setPackages(data.data);
        } else {
          console.error('Failed to fetch packages:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching packages:', error.message);
      }
    };

    if (storedLicenseNumber) {
      fetchPackages(storedLicenseNumber);
    }
  }, []);

  const handleDeleteClick = (packageId) => {
    setPackageToDelete(packageId);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!packageToDelete) return;

    try {
      const response = await fetch(`http://localhost:5050/api/packages/${packageToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });

      if (response.ok) {
        setPackages(packages.filter((pkg) => pkg._id !== packageToDelete));
        toast.success('Package deleted successfully');
      } else {
        const responseText = await response.text();
        console.error('Failed to delete package:', responseText);
        toast.error(`Failed to delete package: ${responseText}`, { style: { backgroundColor: 'red' } }); // Red error toast
      }
    } catch (error) {
      console.error('Error deleting package:', error.message);
      toast.error('Error deleting package. Please try again.', { style: { backgroundColor: 'red' } }); // Red error toast
    } finally {
      setOpen(false);
      setPackageToDelete(null);
    }
  };

  const handleUpdate = (pkg) => {
    navigate(`update/${pkg._id}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3, ml: 40 }}>
      <Typography style={{ fontFamily: "Poppins" }} variant="h4" component="h2" align="center" gutterBottom color="teal">
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
                          onClick={() => handleDeleteClick(pkg._id)}
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
      <motion.div>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(90deg, #008080, #00b3b3)',
            color: 'white',
            marginTop: 2,
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addpackages")}
        >
          Add New Packages
        </Button>
      </motion.div>
      <ToastContainer autoClose={2000} />

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this package?
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
