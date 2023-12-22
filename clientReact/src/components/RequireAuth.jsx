import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  let authed = false;
  if (user) {
    authed = true;
  }
  return authed === true ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
