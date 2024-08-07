import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './pages/salon/Registration';
import Dashboard from './pages/salon/Dashboard';
import Profile from './pages/salon/Profile';
import AddServices from './pages/salon/AddServices'
import AddPackages from './pages/salon/AddPackages';  
import AddProducts from './pages/salon/AddProducts';  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addservices" element={<AddServices />} />
        <Route path="/addpackages" element={<AddPackages />} />
        <Route path="/addproducts" element={<AddProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
