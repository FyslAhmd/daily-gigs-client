import React from "react";
import Marquee from "react-fast-marquee";

import fiverr from "../../../assets/brands/Fiverr.png";
import upwork from "../../../assets/brands/Upwork.png";
import slack from "../../../assets/brands/Slack.png";
import stripe from "../../../assets/brands/Stripe.svg";
import linkedin from "../../../assets/brands/LinkedIn.png";
import payoneer from "../../../assets/brands/Payoneer.png";

const brands = [fiverr, upwork, stripe, payoneer, slack, linkedin];

const SupportedBrand = () => {
  return (
    <div className="my-8 md:my-12 lg:my-16">
      <h2 className="text-3xl font-extrabold text-center mb-4">
        Trusted by Startups, Marketplaces & Freelance Platforms
      </h2>
      <p className="text-center text-gray-600 mb-8 w-11/12 md:w-4/5 mx-auto">
        We’re backed by leading platforms and tools that support global gig
        workers and digital taskers. Our connections power your productivity.
      </p>

      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {brands.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`brand-${index}`}
            className="h-12 md:h-14 mx-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default SupportedBrand;
