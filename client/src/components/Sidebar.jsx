import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ links }) => {
  return (
    <div className="w-64 h-screen bg-teal-600 text-white flex flex-col">
      <div className="p-4 text-xl font-semibold bg-teal-600">
        <h2 className="text-white">Salon Dashboard</h2>
      </div>
      <ul className="flex-1">
        {links.map((link, index) => (
          <li key={index} className="hover:bg-gray-700">
            <Link to={link.path} className="block p-4 hover:bg-gray-800 rounded-md">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="p-4 border-t border-gray-700">
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
