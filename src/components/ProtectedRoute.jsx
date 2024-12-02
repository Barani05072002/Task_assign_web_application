import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to login
    localStorage.setItem("isAuthenticated", "False");
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (Dashboard in this case)
  return children;
};

export default ProtectedRoute;
