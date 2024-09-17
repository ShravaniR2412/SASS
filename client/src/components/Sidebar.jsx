import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ sections }) => {
  return (
    <div className="w-64 h-screen bg-teal-600 text-white flex flex-col">
      <div className="p-4 text-xl font-semibold bg-teal-600">
        <h2 className="text-white">Salon Dashboard</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3"> {/* Add overflow-y-auto for scrolling */}
        <ul className="space-y-1">
          {sections.map((section, index) => (
            <li key={index} className="group">
              {/* Main Heading */}
              <div className="block p-3 w-full text-left rounded-md text-sm font-bold transition-colors duration-150">
                {section.heading}
              </div>

              {/* Sub-Headings */}
              {section.subHeadings && (
                <ul className="pl-6 space-y-1">
                  {section.subHeadings.map((subLink, subIndex) => (
                    <li key={subIndex} className="group">
                      <Link
                        to={subLink.path}
                        className="block py-3 px-7 hover:bg-gray-700 rounded-md text-xs transition-colors duration-150"
                      >
                        {subLink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

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
