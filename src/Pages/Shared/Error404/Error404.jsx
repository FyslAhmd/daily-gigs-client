import React, { useEffect } from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import notFoundAnimation from "../../../assets/Animation.json";

const Error404 = () => {
  useEffect(() => {
    document.title = "Daily Gigs | Error";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-base-100 text-base-content">
      <div className="max-w-md w-full text-center">
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
          className="w-full h-40 md:h-72 mx-auto"
        />
        <h1 className="text-4xl font-bold mt-4">Oops! Page Not Found</h1>
        <p className="text-lg mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="my-10 btn bg-primary text-black text-xl">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
