// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user isn't logged in, send to login (root "/")
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
