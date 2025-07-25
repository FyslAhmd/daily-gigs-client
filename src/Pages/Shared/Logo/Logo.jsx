import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/Logo2.png";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src={logo} alt="" className=" w-10 md:w-16" />
        <p className="md:text-3xl font-bold">Daily Gigs</p>
      </div>
    </Link>
  );
};

export default Logo;
