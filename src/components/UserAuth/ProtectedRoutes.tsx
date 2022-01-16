import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../../services/authHelpers";

const ProtectedRoutes = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
