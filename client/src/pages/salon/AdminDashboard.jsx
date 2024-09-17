import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  const sidebarSections = [
    {
      heading: 'Appointments',
      subHeadings: [
        { path: '/admin/appointments', name: 'Manage Appointments' },
        { path: '/admin/calendar', name: 'Profile' },
      ],
    },
    {
      heading: 'New',
      subHeadings: [
        { path: '/admin/addproducts', name: 'Add Products' },
        { path: '/admin/addservices', name: 'Add Services' },
        { path: '/admin/addpackages', name: 'Add Packages' },
      ],
    },
   
    {
      heading: 'General',
      subHeadings: [
        { path: '/admin/products', name: 'Products' },
        { path: '/admin/packages', name: 'Packages' },
        { path: '/admin/services', name: 'Services' },
        { path: '/admin/reports', name: 'Reports' },
        { path: '/admin/settings', name: 'Settings' },
      ],
    },
  ];

  return (
    <div className="flex">
      <Sidebar sections={sidebarSections} />
      <div className="flex-1 p-6 bg-gray-100">
        {/* <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-teal-600">
            Welcome to the Salon Admin Dashboard
          </h1>
        </div> */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
