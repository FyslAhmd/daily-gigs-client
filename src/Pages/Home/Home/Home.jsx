import React from "react";
import Banner from "../Banner/Banner";
import Review from "../Review/Review";
import HowItWork from "../HowItWork/HowItWork";
import SupportedBrand from "../SupportedBrand/SupportedBrand";

const Home = () => {
  return (
    <div>
      <Banner />
      <Review />
      <HowItWork />
      <SupportedBrand />
    </div>
  );
};

export default Home;
