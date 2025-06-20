import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }
  if (adminOnly && user.role !== 'admin') {
    // Logged in but not an admin
    return <Navigate to="/" />;
  }
  return children;
}
