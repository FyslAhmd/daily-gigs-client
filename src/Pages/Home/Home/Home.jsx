import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import Review from "../Review/Review";
import HowItWork from "../HowItWork/HowItWork";
import SupportedBrand from "../SupportedBrand/SupportedBrand";
import FAQ from "../FAQ/FAQ";
import BestWorkers from "../BestWorkers/BestWorkers";

const Home = () => {
  useEffect(() => {
    document.title = "Daily Gigs | Home";
  }, []);

  return (
    <div className="">
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
