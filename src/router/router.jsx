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
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "addNewTask",
        Component: AddNewTask,
      },
      {
        path: "myTasks",
        Component: MyTasks,
      },
      {
        path: "purchaseCoins",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "taskList",
        Component: TaskList,
      },
      {
        path: "taskDetails/:id",
        Component: TaskDetails,
      },
      {
        path: "mySubmissions",
        Component: MySubmission,
      },
      {
        path: "withdrawals",
        Component: WithDrawals,
      },
    ],
  },
]);
export default router;
