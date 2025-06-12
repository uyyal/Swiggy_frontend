// src/vendorDashboard/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('loginToken');
  const firmId = localStorage.getItem('firmId');

  if (!token || !firmId) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
