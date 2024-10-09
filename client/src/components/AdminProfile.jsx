import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Get token from local storage
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        console.log(data); // Log the response to check the structure
        
        setUserData(data.data); // Assuming data is in a "data" field
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-800">
      {/* Close Button on the outer div */}
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white', zIndex: 10 }}
        onClick={() => navigate('/admin')} // Navigate back to dashboard
      >
        <CloseIcon />
      </IconButton>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full flex items-center justify-center"
        >
          <Card
            sx={{
              width: '100%',
              maxWidth: 600,
              height: '80%',
              padding: 4,
              borderRadius: '16px',
              boxShadow: 5,
              backgroundColor: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Avatar
                alt="User Avatar"
                src={userData.logo || 'https://via.placeholder.com/150'} // Default logo if none available
                sx={{ width: 150, height: 150, margin: '0 auto' }}
              />
              <Typography variant="h5" align="center" color="teal" sx={{ mt: 4, fontWeight: 'bold', fontSize: '1.75rem' }}>
                <strong>Owner Name:</strong> <span className="text-teal-600">{userData.ownerName || 'Owner Name Not Available'}</span>
              </Typography>
              <Typography variant="h5" align="center" color="teal" sx={{ mt: 4, fontWeight: 'bold', fontSize: '1.75rem' }}>
                <strong>Salon Name:</strong> <span className="text-teal-600">{userData.salonName || 'Salon Name Not Available'}</span>
              </Typography>

              <Typography variant="body1" color="gray" sx={{ mt: 2 }} textAlign={'center'}>
                <strong>License No:</strong> <span className="text-teal-600">{userData.licenseNumber || 'N/A'}</span>
              </Typography>
              <Typography variant="body1" color="gray" sx={{ mt: 1 }} textAlign={'center'}>
                <strong>Email:</strong> <span className="text-teal-600">{userData.email || 'N/A'}</span>
              </Typography>
              <Typography variant="body1" color="gray" sx={{ mt: 1 }} textAlign={'center'}>
                <strong>Location:</strong> <span className="text-teal-600">{userData.location || 'N/A'}</span>
              </Typography>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-teal-500 text-white rounded-full py-2 px-6 hover:bg-teal-600 transition duration-200"
                  onClick={() => window.location.href = '/edit-profile'} // Redirect to edit profile
                >
                  Edit
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
