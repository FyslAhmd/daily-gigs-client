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
]);
export default router;
