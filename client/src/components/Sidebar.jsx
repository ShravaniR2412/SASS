import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-teal-600 text-white flex flex-col">
      <div className="p-4 text-xl font-semibold bg-teal-600 ">
        <h2 className="text-white">Salon Dashboard</h2>
      </div>
      <ul className="flex-1">
        <li className="hover:bg-gray-700">
          <a
            href="#appointments"
            className="block p-4 hover:bg-gray-800 rounded-md"
          >
            Appointments
          </a>
        </li>
        <li className="hover:bg-gray-700">
          <a href="#staff" className="block p-4 hover:bg-gray-800 rounded-md">
            Staff Management
          </a>
        </li>
        <li className="hover:bg-gray-700">
          <a
            href="#inventory"
            className="block p-4  hover:bg-gray-800 rounded-md"
          >
            Inventory
          </a>
        </li>
        <li className="hover:bg-gray-700">
          <a
            href="#reports"
            className="block p-4  hover:bg-gray-800 rounded-md"
          >
            Reports
          </a>
        </li>
        <li className="hover:bg-gray-700">
          <a
            href="#settings"
            className="block p-4  hover:bg-gray-800 rounded-md"
          >
            Settings
          </a>
        </li>
        <li className="hover:bg-gray-700">
          <a
            href="#profile"
            className="block p-4  hover:bg-gray-800 rounded-md"
          >
            Profile
          </a>
        </li>
      </ul>
      <div className="p-4 border-t border-gray-700 ">
        <a
          href="#logout"
          className="block text-center text-gray-400 hover:text-white"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
