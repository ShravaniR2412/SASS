import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import Zoom from "@mui/material/Zoom"; 
import AddIcon from "@mui/icons-material/Add";

export default function AdminService() {
  const [services, setServices] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    setLicenseNumber(storedLicenseNumber || "");

    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/api/services/getservices",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("authToken"),
            },
            body: JSON.stringify({ licenseNumber: storedLicenseNumber }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setServices(data.data); // Adjust based on your API response structure
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchServices();
  }, []);

  const handleUpdate = async (serviceName) => {
    const licenseNumber = localStorage.getItem("licenseNumber");

    try {
      const response = await fetch(
        "http://localhost:5050/api/services/getservicebyname",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ licenseNumber, serviceName }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const serviceId = data.service._id;
        navigate(`/admin/services/update/${serviceId}`);
      } else {
        console.error("Failed to find service ID");
        alert("Service not found. Please check the service name and try again.");
      }
    } catch (error) {
      console.error("Error finding service ID:", error.message);
      alert("Error finding service. Please try again later.");
    }
  };

  const handleDelete = async (serviceName) => {
    const licenseNumber = localStorage.getItem("licenseNumber");

    try {
      const fetchIdResponse = await fetch(
        "http://localhost:5050/api/services/getservicebyname",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ licenseNumber, serviceName }),
        }
      );

      if (!fetchIdResponse.ok) {
        throw new Error("Failed to fetch service ID");
      }

      const fetchIdData = await fetchIdResponse.json();
      const serviceId = fetchIdData.service._id;

      const deleteResponse = await fetch(
        `http://localhost:5050/api/services/deleteservice/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      );

      if (deleteResponse.ok) {
        setServices(services.filter((service) => service.serviceName !== serviceName));
        alert("Service deleted successfully");
      } else {
        console.error("Failed to delete service");
        alert("Failed to delete service. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting service:", error.message);
      alert("Error deleting service. Please try again later.");
    }
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
    <Container maxWidth="md" sx={{ mt: 3 ,ml:40 }}>
      <Typography style={{ fontfamily: "Poppins" }} variant="h4" component="h2" align="center" gutterBottom color="teal">
        Service List
      </Typography>
      {(!services || services.length === 0) ? (
        <Typography align="center">No services available.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#008080" }}>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Service Name</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Cost</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Duration</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service, index) => (
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={service._id}>
                  <TableRow hover>
                    <TableCell>{service.serviceName}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.cost}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="space-between">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <IconButton 
                          aria-label="edit" 
                          sx={{ color: 'teal' }} 
                          onClick={() => handleUpdate(service.serviceName)}>
                            <Edit />
                          </IconButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <IconButton 
                           aria-label="delete"
                           sx={{ color: "error.main" }} 
                           onClick={() => handleDelete(service.serviceName)}>
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
      )}
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
        onClick={() => navigate("/admin/addservices")}
      >
        Add New Service
      </Button>
    </motion.div>
    </Container>
  );
}
