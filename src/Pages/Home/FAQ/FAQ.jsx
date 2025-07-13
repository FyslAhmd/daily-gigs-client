import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I join as a tasker?",
    answer:
      "Click on 'Join as Developer' or 'Sign Up' from the homepage. Fill in your profile details and start browsing available tasks once your account is verified.",
  },
  {
    question: "How do I get paid for completed tasks?",
    answer:
      "Payments are securely processed through Stripe. After a client approves your task, your balance will be updated and can be withdrawn to your preferred payment method.",
  },
  {
    question: "Can I post a task as a client?",
    answer:
      "Absolutely! Create a client account and click on 'Post a Task'. Provide all the required details, budget, and deadline — and let qualified taskers apply.",
  },
  {
    question: "What happens if a tasker doesn't deliver on time?",
    answer:
      "You can contact the tasker or escalate the issue through our support center. We will either resolve the dispute or refund the amount if eligible.",
  },
  {
    question: "Is there a rating or review system?",
    answer:
      "Yes. After a task is completed, both the tasker and client can rate each other. This helps maintain trust and transparency across the platform.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FAQ = () => {
  return (
    <motion.div
      className="w-full space-y-6 mt-8 md:my-12 lg:my-16 px-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className="text-4xl text-center font-extrabold"
        variants={item}
      >
        Frequently Asked Questions (FAQ)
      </motion.h1>
      <motion.p
        className="text-center w-11/12 md:w-4/6 mx-auto text-gray-600"
        variants={item}
      >
        Get answers to common questions about our platform, tasking process, and
        how you can start earning or outsourcing work today.
      </motion.p>

      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="collapse collapse-arrow border border-base-300 bg-white transition-all duration-300"
          variants={item}
        >
          <input
            type="radio"
            name="faq-accordion"
            className="peer"
            defaultChecked={index === 0}
          />
          <div className="collapse-title font-semibold peer-checked:bg-gray-200">
            {faq.question}
          </div>
          <div className="collapse-content text-sm text-gray-700 peer-checked:bg-gray-200">
            {faq.answer}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQ;
