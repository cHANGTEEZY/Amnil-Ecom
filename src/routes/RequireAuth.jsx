import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../lib/context/AuthContext";

const RequireAuth = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
