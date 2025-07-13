import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaCoins } from "react-icons/fa";

const AvailableCoins = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Daily Gigs | Avaiable Coins";
  }, []);

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user-coins", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/byEmail?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  if (isLoading) {
    return (
      <p className="text-center py-10 text-lg font-semibold">
        Loading coins...
      </p>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-xl w-full text-center"
      >
        <img
          src={userData.profilePic}
          alt={userData.name}
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-200 shadow-md mb-4"
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {userData.name}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{userData.email}</p>

        <div className="flex items-center justify-center gap-3 text-3xl text-yellow-500 font-bold">
          <FaCoins />
          <span>{userData.coins} Coins</span>
        </div>

        <p className="mt-4 text-gray-600">This is your current coin balance.</p>
      </motion.div>
    </div>
  );
};

export default AvailableCoins;
