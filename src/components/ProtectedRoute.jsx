import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated")) || false;

  if (!isAuthenticated) {
    // Redirect to login with a state message
    return <Navigate to="/" state={{ message: "Please log in to access this page." }} />;
  }

  // If authenticated, render the children
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
