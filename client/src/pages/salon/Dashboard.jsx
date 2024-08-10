import React from "react";
import { useNavigate } from "react-router-dom";

const SalonDashboard = () => {
  const navigate = useNavigate();

  const handleBoxClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-teal-700 text-white py-2 flex justify-between items-center px-6">
        <h1 className="text-xl font-semibold">Welcome to GlamEase</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-white text-teal-700 p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold">
            A
          </div>
          <div className="text-white text-2xl">≡</div> {/* Three dashes */}
        </div>
      </header>

      {/* Tagline */}
      <p className="text-center text-teal-700 py-6 text-2xl font-semibold">
        Your Salon's Journey Begins Here: Complete Each Step to Success
      </p>

      {/* Main Content Container */}
        {/* Grid Container */}
        <div className="bg-white shadow-2xl rounded-lg p-7 w-full max-w-4xl  mt-10 ">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Box 1 */}
          <div
            className="relative w-full h-56 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center text-center p-4 border border-teal-700 hover:bg-teal-100 hover:translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => handleBoxClick("/profile")}
          >
            <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md">
              1
            </span>
            <h2 className="text-teal-700 font-semibold text-lg mt-4">
              Complete your Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Set up your salon's basic details to get started.
            </p>
          </div>

          {/* Box 2 */}
          <div
            className="relative w-full h-56 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center text-center p-4 border border-teal-700 hover:bg-teal-100 hover:translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => handleBoxClick("/addservices")}
          >
            <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md">
              2
            </span>
            <h2 className="text-teal-700 font-semibold text-lg mt-4">
              Add your Services
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Define the services you offer to attract clients.
            </p>
          </div>

          {/* Box 3 */}
          <div
            className="relative w-full h-56 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center text-center p-4 border border-teal-700 hover:bg-teal-100 hover:translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => handleBoxClick("/addproducts")}
          >
            <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md">
              3
            </span>
            <h2 className="text-teal-700 font-semibold text-lg mt-4">
              Add your Products
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              List the products available at your salon.
            </p>
          </div>

          {/* Box 4 */}
          <div
            className="relative w-full h-56 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center text-center p-4 border border-teal-700 hover:bg-teal-100 hover:translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => handleBoxClick("/addpackages")}
          >
            <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-teal-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md">
              4
            </span>
            <h2 className="text-teal-700 font-semibold text-lg mt-4">
              Add your Packages
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create attractive packages for your clients.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-10 mb-10 flex justify-center">
        <button className="bg-teal-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition-colors duration-300 ease-in-out min-w-max">
          Save Details
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-teal-700 text-white py-2 mt-auto text-center">
        © 2024 GlamEase. All Rights Reserved.
      </footer>
    </div>
  );
};

export default SalonDashboard;
