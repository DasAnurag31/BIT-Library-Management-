import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RequireAuthorization = ({ allowedRole }) => {
  const location = useLocation();
  const { user } = useAuth();
  return user?.role == allowedRole || allowedRole == "both" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuthorization;
