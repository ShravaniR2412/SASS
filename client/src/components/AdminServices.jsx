import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

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
              "x-auth-token": localStorage.getItem("authToken"), // Include the token if needed
            },
            body: JSON.stringify({ licenseNumber: storedLicenseNumber }), // Send license number in body
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
    const licenseNumber = localStorage.getItem('licenseNumber');
    
    try {
      // Step 1: Fetch the service ID by name and license number
      const fetchIdResponse = await fetch('http://localhost:5050/api/services/getservicebyname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ licenseNumber, serviceName }),
      });
  
      if (!fetchIdResponse.ok) {
        throw new Error('Failed to fetch service ID');
      }
  
      const fetchIdData = await fetchIdResponse.json();
      const serviceId = fetchIdData.service._id;
  
      // Step 2: Delete the service using the fetched service ID
      const deleteResponse = await fetch(`http://localhost:5050/api/services/deleteservice/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
  
      if (deleteResponse.ok) {
        // Remove deleted service from the list
        setServices(services.filter((service) => service.serviceName !== serviceName));
        alert('Service deleted successfully');
      } else {
        console.error('Failed to delete service');
        alert('Failed to delete service. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting service:', error.message);
      alert('Error deleting service. Please try again later.');
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Service List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Service Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Cost</th>
            <th className="py-2 px-4 border-b">Duration</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="py-2 px-4 border-b">{service.serviceName}</td>
              <td className="py-2 px-4 border-b">{service.category}</td>
              <td className="py-2 px-4 border-b">{service.cost}</td>
              <td className="py-2 px-4 border-b">{service.duration}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleUpdate(service.serviceName)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(service.serviceName)} // Pass the service ID
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
