import React from "react";
import useUserRole from "../../../Hooks/useUserRole";
import LoadingPage from "../../Shared/Loading/LoadingPage";
import WorkerHome from "../WorkerPages/WorkerHome/WorkerHome";
import BuyerHome from "../BuyerPages/BuyerHome/BuyerHome";
import AdminHome from "../AdminPages/AdminHome/AdminHome";
import Forbidden from "../../Shared/Forbidden/Forbidden";

const DashboardHome = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <LoadingPage />;

  if (role === "worker") {
    return <WorkerHome />;
  } else if (role === "buyer") {
    return <BuyerHome />;
  } else if (role === "admin") {
    return <AdminHome />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
