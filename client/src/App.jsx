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
import AdminPackage from './components/AdminPackage';
import AdminServices from './components/AdminServices';
import UpdateService from './components/UpdateService';
import EditProduct from './components/EditProduct';
import EditPackage from './components/EditPackage';
import CustomerAppointmentBooking from './pages/customer/CustomerAppointmentBooking';
import Home from './pages/customer/Home';
import Cproduct from './pages/customer/Cproduct';
import Cpackage from './pages/customer/Cpackage';
import Cservices from './pages/customer/Cservices';
import Cdashboard from './pages/customer/Cdashboar';
import OrderHistory from './components/Orderhistory';
import PaymentHistory from './components/Paymenthistory';
import { Settings } from '@mui/icons-material';
import Cprofile from './components/Cprofile';
import AdminReport from './components/AdminReport';
import GlamEaseRecommender from './pages/customer/ProductComparision'; // Import the new component

import ProductDetail from './pages/customer/ProductDetail';
import MBA from './pages/customer/MBA.JSX';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Cproduct/>} />
        <Route path="/packages" element={<Cpackage/>} />
        <Route path="/services" element={<Cservices/>} />
        <Route path="/customerdashboard" element={<Cdashboard/>} />
        <Route path="/order-history" element={<OrderHistory/>} />
        <Route path="/payment" element={<PaymentHistory/>} />
        <Route path="/cprofile" element={<Cprofile/>} />
        <Route path="/product-recommender" element={<GlamEaseRecommender />}/>
        <Route path="/mba" element={<MBA/>}/>
        {/* New skincare recommender route */}
        <Route path="/product/:productId" element={<ProductDetail />} />
        {/* Customer Booking Route */}
        <Route path="/booking" element={<CustomerAppointmentBooking />} /> {/* New booking route */}
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="packages" element={<AdminPackage />} />
          <Route path="addservices" element={<AddServices />} />
          <Route path="addpackages" element={<AddPackages />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="reports" element={<AdminReport />} />
          <Route path="services/update/:id" element={<UpdateService />} />
          <Route path="products/update/:id" element={<EditProduct />} />
          <Route path="packages/update/:id" element={<EditPackage />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;