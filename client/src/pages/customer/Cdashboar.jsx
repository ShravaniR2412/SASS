import React from 'react';
import Csidebar from '../../components/Csidebar';
import { Favorite, AddShoppingCart, Person, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';

// Example dishes data
const dishes = [
  {
    name: 'Eyeliner',
    price: '500',
    description: 'Smudge proof, long lasting',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRpRWaxNTsXr2J0PdwLQvSIKY7LA0xvKYRapf7JeyCVNFaismY_zVuzwz5zcgAN3SzeRi3lWCvl1H3jHe-HQiQ0e66m6Gs1uTijA0T6BS7WASJ4qAUIKBU_rg', // replace with actual image URL
  },
  {
    name: 'Eyeliner',
    price: '500',
    description: 'Smudge proof, long lasting',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRpRWaxNTsXr2J0PdwLQvSIKY7LA0xvKYRapf7JeyCVNFaismY_zVuzwz5zcgAN3SzeRi3lWCvl1H3jHe-HQiQ0e66m6Gs1uTijA0T6BS7WASJ4qAUIKBU_rg', // replace with actual image URL
  },
];

const Cdashboard = () => {
  const handleDelete = (index) => {
    // Implement delete functionality here
    console.log(`Delete item at index: ${index}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Csidebar />

      {/* Main Dashboard Content */}
      <motion.div
        className="flex-grow p-5 bg-gray-100 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Cart 😊</h2>
          <IconButton sx={{ color: 'teal', background: 'white' }}>
            <Person />
          </IconButton>
        </div>
        
        {/* Search bar */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-full border border-gray-300 rounded-lg"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-4">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              className="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow relative"
              whileHover={{ scale: 1.05 }}
            >
              <img src={dish.image} alt={dish.name} className="w-full h-32 object-cover mb-3 rounded" />
              <h3 className="text-lg font-bold">{dish.name}</h3>
              <p className="text-sm">{dish.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">{dish.price}</span>
                <IconButton 
                  aria-label="delete" 
                  onClick={() => handleDelete(index)} 
                  color="error"
                  size="small"
                >
                  <Delete />
                </IconButton>
              </div>
            </motion.div>
          ))}
        </div>
        
      </motion.div>
    </div>
  );
};

export default Cdashboard;
