import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";

const BestWorkers = () => {
  const axiosIns = useAxios();

  const { data: topWorkers = [], isLoading } = useQuery({
    queryKey: ["top-workers"],
    queryFn: async () => {
      const res = await axiosIns.get("/users/best-workers");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-6 text-gray-600">Loading top workers...</p>
    );
  }

  return (
    <div className=" p-6 rounded-lg my-8 md:my-12 lg:my-16">
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Top 6 Best Workers
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topWorkers.map((worker, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-xl p-5 bg-[#b0b8df] shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src={worker.profilePic}
                alt={worker.name}
                className="w-16 h-16 rounded-full border-2 border-green-500 shadow-sm object-cover"
              />
              <div>
                <p className="text-xl font-semibold text-gray-800">
                  {worker.name}
                </p>
                <p className="text-green-600 font-medium">
                  {worker.coins} Coins
                </p>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md font-semibold">
              #{idx + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
