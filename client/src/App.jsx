import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './pages/salon/Registration';
import Dashboard from './pages/salon/Dashboard';
import Profile from './pages/salon/Profile';
import AddServices from './pages/salon/AddServices';
import AddPackages from './pages/salon/AddPackages';
import AddProducts from './pages/salon/AddProducts';
import Login from './pages/salon/Login';
import AdminDashboard from './pages/salon/AdminDashboard';
import AdminProfile from './components/AdminProfile';
import AdminProduct from './components/AdminProduct';
import AdminServices from './components/AdminServices';
import UpdateService from './components/UpdateService';
import EditProduct from './components/EditProduct'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="addservices" element={<AddServices />} />
          <Route path="addpackages" element={<AddPackages />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="services/update/:id" element={<UpdateService />} />
          <Route path="products/update/:id" element={<EditProduct />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
