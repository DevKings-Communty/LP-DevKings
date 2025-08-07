import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = React.useContext(AuthContext);

  console.log('ProtectedRoute → Authenticated?', isAuthenticated);
  console.log('ProtectedRoute → User:', user);

  if (loading) {
    // Show loading indicator while restoring user from storage
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
