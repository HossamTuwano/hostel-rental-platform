import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ token, children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  console.log(isAuth);
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const LoginPrivateRoute = ({ token, children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
