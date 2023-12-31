import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthorized } = useAuthStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
