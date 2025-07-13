import React from "react";
import Banner from "../Banner/Banner";
import Review from "../Review/Review";
import HowItWork from "../HowItWork/HowItWork";
import SupportedBrand from "../SupportedBrand/SupportedBrand";
import FAQ from "../FAQ/FAQ";
import BestWorkers from "../BestWorkers/BestWorkers";

const Home = () => {
  return (
    <div>
      <Banner />
      <BestWorkers />
      <Review />
      <HowItWork />
      <SupportedBrand />
      <FAQ />
    </div>
  );
};

export default Home;
