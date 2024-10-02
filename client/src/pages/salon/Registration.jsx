import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png';
import '../../register.css';

// Fix the default icon for Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const Registration = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    salonName: '',
    licenseNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [mapVisible, setMapVisible] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([0, 0]); // State to hold marker position

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.salonName) {
      formErrors.salonName = 'Salon name is required';
    }
    if (!formData.licenseNumber) {
      formErrors.licenseNumber = 'License number is required';
    } else if (!/^[A-Za-z0-9]+$/.test(formData.licenseNumber)) {
      formErrors.licenseNumber = 'License number must be alphanumeric';
    }
    if (!formData.location) {
      formErrors.location = 'Location is required';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    return formErrors;
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setFormData({
          ...formData,
          location: `${lat},${lon}`, // Set location as lat,lon
        });
        setMarkerPosition([lat, lon]); // Update marker position
        setMapVisible(true);
      }, (error) => {
        console.error("Error fetching location: ", error);
        alert("Unable to retrieve your location.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5050/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error submitting the form');
        }

        const data = await response.json();
        console.log('Form submitted successfully', data);
        console.log('Submitting form with data:', formData);
      } catch (error) {
        console.error('There was an error submitting the form!', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-2xl font-bold text-customTeal mb-6">Shape the Future of Beauty: Register Your Salon</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Salon Owner Name:</label>
            <input 
              type="text" 
              id="ownerName"
              name="ownerName" 
              value={formData.ownerName} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="salonName" className="block text-sm font-medium text-gray-700">Salon Name:</label>
            <input 
              type="text" 
              id="salonName"
              name="salonName" 
              value={formData.salonName} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.salonName && <p className="text-red-500 text-sm mt-1">{errors.salonName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">Salon License Number:</label>
            <input 
              type="text" 
              id="licenseNumber"
              name="licenseNumber" 
              value={formData.licenseNumber} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
          </div>

          {/* Location Field */}
          <div className="form-group">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
            <input 
              type="text" 
              id="location"
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              readOnly 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Use Current Location:</label>
            <button 
              type="button"
              onClick={getCurrentLocation}
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-700"
            >
              Get Current Location
            </button>
            {formData.location && (
              <p className="mt-2 text-gray-600">Current Location: {formData.location}</p>
            )}
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Leaflet Map Component */}
          {mapVisible && formData.location && (
            <MapContainer center={markerPosition} zoom={15} style={{ height: "400px", width: "100%" }} scrollWheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={markerPosition}>
                <Popup>
                  Your salon location.
                </Popup>
              </Marker>
            </MapContainer>
          )}

          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password:</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button 
            type="submit" 
            className="bg-teal-500 text-white px-4 py-2 rounded-md w-full hover:bg-teal-700"
          >
            Register
          </button>
        </form>
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Registration;
