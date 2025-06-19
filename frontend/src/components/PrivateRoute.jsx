import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();
  const location          = useLocation();

  if (loading) {
    return <div className="spinner">Loading…</div>;
  }

  if (!user) {
    // not logged in
    return (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
