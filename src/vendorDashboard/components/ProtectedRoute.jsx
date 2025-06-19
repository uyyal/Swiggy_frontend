import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('loginToken');
  const location = useLocation();

  if (!token) {
    // Not authenticated → redirect to login page
    return <Navigate to="/Login" replace state={{ from: location }} />;
  }

  // Authenticated → allow access
  return children;
};

export default ProtectedRoute;
