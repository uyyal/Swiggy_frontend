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

// ✅ Layout for protected pages
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Protected Routes wrapped in Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Landingpage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddFirm"
          element={
            <ProtectedRoute>
              <Layout>
                <AddFirm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddProduct"
          element={
            <ProtectedRoute>
              <Layout>
                <Addproduct />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllProducts"
          element={
            <ProtectedRoute>
              <Layout>
                <Allproducts />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserDetails"
          element={
            <ProtectedRoute>
              <Layout>
                <UserDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
