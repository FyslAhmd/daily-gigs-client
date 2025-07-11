import React from "react";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";
import LoadingPage from "../Pages/Shared/Loading/LoadingPage";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) {
    return <LoadingPage />;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default AdminRoute;
