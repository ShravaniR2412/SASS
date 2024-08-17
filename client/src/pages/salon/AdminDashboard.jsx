import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  const sidebarLinks = [
    { path: "/admin/appointments", name: "Appointments" },
    { path: "/admin/services", name: "Services" },
    { path: "/admin/profile", name: "Profile" },
    { path: "/admin/products", name: "Products" },
    { path: "/admin/settings", name: "Settings" },
  ];

  return (
    <div className="flex">
      <Sidebar links={sidebarLinks} />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-teal-600">
            Welcome to the Salon Admin Dashboard
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
