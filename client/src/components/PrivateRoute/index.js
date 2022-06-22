import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ token, children }) => {
  console.log("u");
  console.log(token);
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const LoginPrivateRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
