import React from "react";
import { Outlet } from "react-router";
import Lottie from "lottie-react";
import Logo from "../Pages/Shared/Logo/Logo";
import workingAnimation from "../assets/AuthAnimation.json";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden p-8">
      <div className="hidden lg:block absolute top-0 right-0 w-1/2 min-h-[200vh] bg-[#edeffa] z-0" />
      <Logo className="absolute top-4 left-4 z-10" />
      <div className="flex flex-col lg:flex-row-reverse relative z-10 min-h-[80vh] mt-20 lg:mt-0">
        <div className="flex-1 hidden lg:flex justify-center items-start">
          <Lottie
            animationData={workingAnimation}
            loop={true}
            className="w-96 mt-10"
          />
        </div>
        <div className="flex-1 flex justify-center items-start mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
