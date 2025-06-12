import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landingpage from './vendorDashboard/pages/Landingpage';
import Login from './vendorDashboard/components/forms/Login';
import Register from './vendorDashboard/components/forms/Register';
import AddFirm from './vendorDashboard/components/forms/AddFirm';
import Addproduct from './vendorDashboard/components/forms/Addproduct';
import Navbar from './vendorDashboard/components/Navbar';
import Sidebar from './vendorDashboard/components/Sidebar';
import Allproducts from './vendorDashboard/components/Allproducts';
import ProtectedRoute from './vendorDashboard/components/ProtectedRoute';
import UserDetails from './vendorDashboard/components/forms/UserDetails';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/Login' || location.pathname === '/Register';

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className="main-container">
        {!hideLayout && <Sidebar />}
        <div className="content">{children}</div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/*" element={<ProtectedRoute><Landingpage /></ProtectedRoute>} />
          <Route path="/AddFirm" element={<ProtectedRoute><AddFirm /></ProtectedRoute>} />
          <Route path="/AddProduct" element={<ProtectedRoute><Addproduct /></ProtectedRoute>} />
          <Route path="/AllProducts" element={<ProtectedRoute><Allproducts /></ProtectedRoute>} />
          <Route path="/UserDetails" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
