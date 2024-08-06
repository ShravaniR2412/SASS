import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SalonRegistrationForm from './SalonRegistrationForm';
import SalonDashboard from './SalonDashboard';
import Profile from './Profile';
import Services from './Services'
import Packages from './Packages';  // Ensure the file is named Packages.jsx
import Products from './Products';  // Ensure the file is named Products.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalonRegistrationForm />} />
        <Route path="/dashboard" element={<SalonDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
