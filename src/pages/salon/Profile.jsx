
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    salonLogo: '',
    salonName: '',
    tagline: '',
    address: '',
    salonPictures: []
  });
  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProfileData({
        ...profileData,
        [name]: files
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
  };

  const handleNext = () => {
    // You may want to add validation and save data here
    navigate('/addservices');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">1. Add Your Profile</h3>
      <form>
        <div className="mb-4">
          <label htmlFor="salonLogo" className="block text-lg font-medium mb-2">Salon Logo</label>
          <input
            type="file"
            id="salonLogo"
            name="salonLogo"
            onChange={handleProfileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salonName" className="block text-lg font-medium mb-2">Salon Name</label>
          <input
            type="text"
            id="salonName"
            name="salonName"
            value={profileData.salonName}
            onChange={handleProfileChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter salon name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tagline" className="block text-lg font-medium mb-2">Tagline</label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={profileData.tagline}
            onChange={handleProfileChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter tagline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-medium mb-2">Address</label>
          <textarea
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleProfileChange}
            rows="3"
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salonPictures" className="block text-lg font-medium mb-2">Salon Pictures</label>
          <input
            type="file"
            id="salonPictures"
            name="salonPictures"
            multiple
            onChange={handleProfileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200"
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Profile;
