import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import LoadingPage from "../Pages/Shared/Loading/LoadingPage";
import Home from "../Pages/Home/Home/Home";
import BeADev from "../Pages/BeADev/BeADev";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Forbidden from "../Pages/Shared/Forbidden/Forbidden";

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
]);
export default router;
