import React from "react";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "../Pages/Shared/Loading/LoadingPage";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingPage />;

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }
  return children;
};

export default PrivateRoute;
