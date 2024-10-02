import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { Grid2 } from '@mui/material'; 
import { motion } from 'framer-motion';

const salonData = {
  owner: 'Sannidhi Kailaje',
  name: 'Beautify Salon',
  license: 'SAL123456',
  email: 'beautify@gmail.com',
  location: '123 Beauty St, mumbai',
  logo: 'https://via.placeholder.com/150', // Salon logo
};

const AdminProfile = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
            <Grid2 container justifyContent="center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-4 border-teal-400 rounded-full p-2 neon-effect"
              >
                <Avatar
                  alt="Salon Logo"
                  src={salonData.logo}
                  sx={{ width: 150, height: 150, margin: '0 auto' }}
                />
              </motion.div>
            </Grid2>

            <Typography
              variant="h5"
              align="center"
              color="teal"
              sx={{ mt: 4, fontWeight: 'bold', fontSize: '1.75rem' }}
            >
              {salonData.owner}
            </Typography>

            <Typography
              variant="h6"
              align="center"
              color="gray"
              sx={{ mt: 1, fontSize: '1.25rem' }}
            >
              {salonData.name}
            </Typography>

            <Grid2 container direction="column" spacing={2} sx={{ mt: 4, textAlign: 'center' }}>
              <Grid2 item>
                <Typography
                  variant="body1"
                  color="gray"
                  sx={{ fontWeight: '500' }}
                >
                  <strong>License No:</strong> <span className="text-teal-600">{salonData.license}</span>
                </Typography>
              </Grid2>
              <Grid2 item>
                <Typography
                  variant="body1"
                  color="gray"
                  sx={{ fontWeight: '500' }}
                >
                  <strong>Email:</strong> <span className="text-teal-600">{salonData.email}</span>
                </Typography>
              </Grid2>
              <Grid2 item>
                <Typography
                  variant="body1"
                  color="gray"
                  sx={{ fontWeight: '500' }}
                >
                  <strong>Location:</strong> <span className="text-teal-600">{salonData.location}</span>
                </Typography>
              </Grid2>
            </Grid2>

            <div className="flex justify-center mt-4">
              <button className="bg-teal-500 text-white rounded-full py-2 px-6 hover:bg-teal-600 transition duration-200"
              onClick={() => window.location.href = '/profile'}>
                Edit
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminProfile;
