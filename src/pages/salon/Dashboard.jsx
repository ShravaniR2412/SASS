// src/SalonDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6">
      <nav className="bg-teal-600 text-white p-4 mb-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Welcome to Glamease</h1>
      </nav>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link to="/profile">
          <div className="cursor-pointer p-4 bg-white shadow-md rounded-md transition-all duration-300 hover:bg-teal-200">
            <h3 className="text-lg font-semibold">1. Add Your Profile</h3>
          </div>
        </Link>
        <Link to="/addservices">
          <div className="cursor-pointer p-4 bg-white shadow-md rounded-md transition-all duration-300 hover:bg-teal-200">
            <h3 className="text-lg font-semibold">2. Add Your Service</h3>
          </div>
        </Link>
        <Link to="/addpackages">
          <div className="cursor-pointer p-4 bg-white shadow-md rounded-md transition-all duration-300 hover:bg-teal-200">
            <h3 className="text-lg font-semibold">3. Add Package</h3>
          </div>
        </Link>
        <Link to="/addproducts">
          <div className="cursor-pointer p-4 bg-white shadow-md rounded-md transition-all duration-300 hover:bg-teal-200">
            <h3 className="text-lg font-semibold">4. Add Products</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
