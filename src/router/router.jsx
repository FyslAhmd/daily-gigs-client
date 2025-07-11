import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import LoadingPage from "../Pages/Shared/Loading/LoadingPage";
import Home from "../Pages/Home/Home/Home";
import BeADev from "../Pages/BeADev/BeADev";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Forbidden from "../Pages/Shared/Forbidden/Forbidden";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddNewTask from "../Pages/Dashboard/BuyerPages/AddNewTask/AddNewTask";
import MyTasks from "../Pages/Dashboard/BuyerPages/MyTasks/MyTasks";
import Payment from "../Pages/Dashboard/BuyerPages/PurchaseCoin/Payment";
import PaymentHistory from "../Pages/Dashboard/BuyerPages/PaymentHistory/PaymentHistory";
import TaskList from "../Pages/Dashboard/WorkerPages/TaskList/TaskList";
import TaskDetails from "../Pages/Dashboard/WorkerPages/TaskDetails/TaskDetails";
import MySubmission from "../Pages/Dashboard/WorkerPages/MySubmission/MySubmission";
import WithDrawals from "../Pages/Dashboard/WorkerPages/WithDrawals/WithDrawals";
import ManageUser from "../Pages/Dashboard/AdminPages/ManageUser/ManageUser";
import ManageTasks from "../Pages/Dashboard/AdminPages/ManageTasks/ManageTasks";
import PrivateRoute from "../Routes/PrivateRoute";
import BuyerRoute from "../Routes/BuyerRoute";
import WorkerRoute from "../Routes/WorkerRoute";
import AdminRoute from "../Routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "beADev",
        Component: BeADev,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "addNewTask",
        element: (
          <BuyerRoute>
            <AddNewTask />
          </BuyerRoute>
        ),
      },
      {
        path: "myTasks",
        element: (
          <BuyerRoute>
            <MyTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "purchaseCoins",
        element: (
          <BuyerRoute>
            <Payment />
          </BuyerRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <BuyerRoute>
            <PaymentHistory />
          </BuyerRoute>
        ),
      },
      {
        path: "taskList",
        element: (
          <WorkerRoute>
            <TaskList />
          </WorkerRoute>
        ),
      },
      {
        path: "taskDetails/:id",
        element: (
          <WorkerRoute>
            <TaskDetails />
          </WorkerRoute>
        ),
      },
      {
        path: "mySubmissions",
        element: (
          <WorkerRoute>
            <MySubmission />
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            <WithDrawals />
          </WorkerRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "manageTasks",
        element: (
          <AdminRoute>
            <ManageTasks />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
