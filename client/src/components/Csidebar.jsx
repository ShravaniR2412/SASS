import React from 'react';
import { Home, History, Payment, Settings } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Person } from '@mui/icons-material';
const Csidebar = () => {
  return (
    <motion.div
      className="w-64 bg-white h-screen p-5"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <h1 className="text-2xl font-bold mb-5 text-teal-700">Glamease</h1>
      <ul>
        <li className="mb-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 hover:bg-teal-400 p-2 rounded"
            activeClassName="bg-gray-200"
          >
            <Home />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 hover:bg-teal-400 p-2 rounded"
            activeClassName="bg-gray-200"
          >
            <Person />
            <span>Profile</span>
          </NavLink>
        </li>
        
        <li className="mb-4">
          <NavLink
            to="/payment"
            className="flex items-center space-x-3 hover:bg-teal-400 p-2 rounded"
            activeClassName="bg-gray-200"
          >
            <Payment />
            <span>Payment History</span>
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/order-history"
            className="flex items-center space-x-3 hover:bg-teal-400 p-2 rounded"
            activeClassName="bg-gray-200"
          >
            <History />
            <span>Your Orders </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className="flex items-center space-x-3 hover:bg-teal-400  p-2 rounded"
            activeClassName="bg-gray-200"
          >
            <Settings />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </motion.div>
    
  );
};

export default Csidebar;
