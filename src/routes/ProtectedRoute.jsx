import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../lib/context/AuthContext";


const ProtectedRoute = ({ 
  redirectPath = '/signin',
  isAuthRequired = true
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (isAuthRequired && !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  if (!isAuthRequired && isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;