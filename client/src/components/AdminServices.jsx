import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
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
} from "@mui/material";

export default function AdminService() {
  const [services, setServices] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem("licenseNumber");
    setLicenseNumber(storedLicenseNumber || "");

    // Fetch services from the server
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
        navigate(`/admin/services/update/${serviceId}`); // Navigate to the update page with service ID
      } else {
        console.error("Failed to find service ID");
        alert(
          "Service not found. Please check the service name and try again."
        );
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
        setServices(
          services.filter((service) => service.serviceName !== serviceName)
        );
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

  return (
    <div style={{ padding: "24px", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <Typography variant="h4" gutterBottom align="center" color="teal">
        Service List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#008080" }}>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Service Name
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Cost
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Duration
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service._id} hover>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.cost}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdate(service.serviceName)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(service.serviceName)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/admin/services/add")}
      >
        Add New Service
      </Button>
    </div>
  );
}
