import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "./authContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("islogin");
  return isAuthenticated === "true" ? Element : <Navigate to="/login" />;
};

export default ProtectedRoute;
