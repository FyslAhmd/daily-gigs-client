import React from "react";
import { motion } from "framer-motion";
import icon1 from "../../../assets/HowItWork/1.png";
import icon2 from "../../../assets/HowItWork/2.png";
import icon3 from "../../../assets/HowItWork/3.png";
import icon4 from "../../../assets/HowItWork/4.png";

const howItWorksSteps = [
  {
    title: "Browse Tasks",
    icon: icon1,
    description:
      "Explore available micro-jobs across various categories that match your skills and interests.",
  },
  {
    title: "Complete the Task",
    icon: icon2,
    description:
      "Follow the client's instructions and submit the required proof to complete the job.",
  },
  {
    title: "Get Verified",
    icon: icon3,
    description:
      "The client will review your submission and verify if it meets the task requirements.",
  },
  {
    title: "Earn Money",
    icon: icon4,
    description:
      "Once approved, your earnings are credited to your wallet. Withdraw anytime!",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const HowItWork = () => {
  return (
    <div className="my-8 md:my-12 lg:my-16 px-4 lg:px-16">
      <h1 className="font-bold text-3xl mb-4 text-center">How It Works</h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {howItWorksSteps.map((step, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-secondary rounded-2xl p-6 shadow-lg shadow-accent space-y-4 hover:shadow-xl transition-all"
          >
            <img
              src={step.icon}
              alt="Step icon"
              className="w-12 h-12 object-contain"
            />
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="font-medium text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWork;
