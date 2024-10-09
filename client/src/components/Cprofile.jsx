import React from 'react';
import { Button, TextField } from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Cprofile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div
        className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full"
        style={{
          transition: 'transform 0.5s, opacity 0.5s',
          transform: 'translateY(0)',
          opacity: 1,
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-teal-600 text-center">Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-teal-600">Full Name</label>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="Anushka Shahane"
              className="mb-6 transition duration-300 hover:shadow-md"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-teal-600">Email</label>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="anushka@example.com"
              className="mb-6 transition duration-300 hover:shadow-md"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-teal-600">Phone Number</label>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="+1234567890"
              className="mb-6 transition duration-300 hover:shadow-md"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-teal-600">Street Address</label>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="123 Main St"
              className="mb-6 transition duration-300 hover:shadow-md"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-teal-600">City</label>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="Springfield"
              className="mb-6 transition duration-300 hover:shadow-md"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-teal-600">Zip Code</label>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="12345"
              className="mb-6 transition duration-300 hover:shadow-md"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="contained"
            style={{
              backgroundColor: '#008080', // Teal color
              color: 'white',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#006666')} // Darker teal on hover
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#008080')} // Original teal color
            className="flex items-center border-none rounded-md"
          >
            <Edit className="mr-2" /> Edit Profile
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#008080', // Teal color
              color: 'white',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#006666')} // Darker teal on hover
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#008080')} // Original teal color
            className="flex items-center border-none rounded-md"
          >
            <Save className="mr-2" /> Save Changes
          </Button>
        </div>

       
         
      </div>
    </div>
  );
};

export default Cprofile;
