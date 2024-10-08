import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { CalendarToday, Person, AddShoppingCart, Build, Category, Report, Settings, ShoppingCart, Dashboard } from '@mui/icons-material';


const AdminDashboard = () => {
  const sidebarSections = [
    {
      heading: 'Appointments',
      icon: CalendarToday,
      subHeadings: [
        { path: '/admin/appointments', name: 'Manage Appointments', icon: CalendarToday },
        { path: '/admin/profile', name: 'Profile', icon: Person },
      ],
    },
    {
      heading: 'New',
      icon: AddShoppingCart,
      subHeadings: [
        { path: '/admin/addproducts', name: 'Add Products', icon: ShoppingCart },
        { path: '/admin/addservices', name: 'Add Services', icon: Build },
        { path: '/admin/addpackages', name: 'Add Packages', icon: Category },
      ],
    },
    {
      heading: 'General',
      icon: Dashboard,
      subHeadings: [
        { path: '/admin/products', name: 'Products', icon: ShoppingCart },
        { path: '/admin/services', name: 'Services', icon: Build },
        { path: '/admin/packages', name: 'Packages', icon: Category },
        { path: '/admin/reports', name: 'Reports', icon: Report },
        { path: '/admin/settings', name: 'Settings', icon: Settings },
      ],
    },
  ];
  
  return (
    <div className="flex h-screen">
    <Sidebar sections={sidebarSections} />
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
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
