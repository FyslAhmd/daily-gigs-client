import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import demoPerson from "../../../assets/demoPerson.png";

const reviews = [
  {
    name: "Sadia Rahman",
    location: "Dhaka",
    description:
      "I was able to earn money in my free time while studying. The tasks are simple and the platform is very easy to navigate. I highly recommend it to anyone looking for micro-jobs online.",
  },
  {
    name: "Tanvir Ahmed",
    location: "Chattogram",
    description:
      "As a part-time freelancer, I found this platform extremely helpful. I love the fast payment process and the transparency in how tasks are verified and rewarded.",
  },
  {
    name: "Nusrat Jahan",
    location: "Sylhet",
    description:
      "Great experience overall! The UI is clean and responsive. I didn’t expect to complete so many tasks in just one evening. The best part is how smooth everything works.",
  },
  {
    name: "Fahim Hossain",
    location: "Khulna",
    description:
      "Posting jobs as a business owner has never been this convenient. I could hire multiple people in minutes and track progress easily through the dashboard.",
  },
  {
    name: "Mehjabin Khan",
    location: "Rajshahi",
    description:
      "Very intuitive platform! From account creation to withdrawing my earnings, the entire process was seamless. This is exactly what freelancers in Bangladesh need.",
  },
  {
    name: "Jahidul Islam",
    location: "Barisal",
    description:
      "I completed over 50 tasks in just one week and got paid directly to my account. It’s rare to find such a reliable micro-tasking site. Love the automated feedback system!",
  },
  {
    name: "Afsana Akter",
    location: "Mymensingh",
    description:
      "This site is a gem for students. I was able to make some side income while attending university. Also, the support team is quick to respond to any issues.",
  },
  {
    name: "Rafiq Hasan",
    location: "Cumilla",
    description:
      "Simple, clean, and to the point. I posted a data entry task and got 10 qualified submissions within an hour. Would definitely recommend it to other entrepreneurs.",
  },
  {
    name: "Sumaiya Sultana",
    location: "Rangpur",
    description:
      "Being a stay-at-home mom, this platform gave me the opportunity to contribute financially without compromising on my daily responsibilities. Super useful!",
  },
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + cardsPerView >= reviews.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? reviews.length - cardsPerView : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const cardWidth = 335;
  const offset = -currentIndex * (cardWidth + 48);

  return (
    <div className="my-8 md:my-12 lg:my-16 px-4 bg-transparent text-black overflow-hidden">
      <h2 className="text-3xl font-bold text-center">Customer Reviews</h2>
      <p className="font-medium w-4/6 mx-auto text-center my-4">
        See what users are saying about their experience with our platform.
      </p>
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaArrowLeft />
        </button>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-2 md:gap-12"
            animate={{ x: offset }}
            transition={{ type: "tween", duration: 1 }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="min-w-[250px] md:min-w-[335px] bg-[url(assets/reviewQuote.png)] bg-no-repeat bg-left-top rounded-xl p-6 shadow-md bg-[#b0b8df] flex flex-col gap-4"
              >
                <p className="text-sm line-clamp-5 flex-1">
                  "{review.description}"
                </p>
                <hr className="border-dashed" />
                <div className="flex gap-6 items-center">
                  <div className="h-8 w-8 rounded-full bg-white">
                    <img src={demoPerson} alt="" />
                  </div>
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-xs text-gray-500">
                      {review.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Review;
