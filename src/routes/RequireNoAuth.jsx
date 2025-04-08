import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../lib/context/AuthContext";

const RequireNoAuth = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default RequireNoAuth;
