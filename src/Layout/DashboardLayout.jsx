import React, { useRef, useState } from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Pages/Shared/Logo/Logo";
import useUserRole from "../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import useOutsideClick from "../Hooks/useOutsideClick";
import { IoNotifications } from "react-icons/io5";
import {
  FaHome,
  FaClipboardList,
  FaRegPaperPlane,
  FaMoneyBillWave,
  FaTasks,
  FaClipboardCheck,
  FaCoins,
  FaReceipt,
  FaUsersCog,
  FaListAlt,
} from "react-icons/fa";
import Footer from "../Pages/Shared/Footer/Footer";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role, isLoading } = useUserRole();

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  useOutsideClick(notificationRef, () => setShowNotifications(false));

  // Get user info
  const { data: userData = {} } = useQuery({
    queryKey: ["userCoins", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/byEmail?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-white flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar w-full bg-base-100 shadow px-4">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="text-lg md:text-3xl font-extrabold flex-1">
            <p className="hidden md:block">Dashboard</p>
          </div>
          <div className="flex items-center gap-4 relative">
            {/* User Info */}
            <div className="flex flex-col items-end">
              <p className="font-medium">{userData.coins} Coins</p>
              <p className="font-medium">
                {userData.name?.split(" ")[0]} | {userData.role}
              </p>
            </div>
            <div>
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full border"
              />
            </div>
            {/* Notification Button */}
            <div className="relative">
              <button onClick={() => setShowNotifications((prev) => !prev)}>
                <IoNotifications size={28} className="text-red-600" />
              </button>
              {/* Notification Popup */}
              {showNotifications && (
                <div
                  ref={notificationRef}
                  className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 shadow-xl rounded-lg z-50 max-h-96 overflow-y-auto"
                >
                  <div className="p-4 border-b font-bold text-lg">
                    Notifications
                  </div>
                  {notifications.length > 0 ? (
                    notifications.map((note, index) => (
                      <div
                        key={index}
                        className="p-4 text-sm border-b hover:bg-gray-100"
                      >
                        <p className="mb-1">{note.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(note.time).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-gray-500">
                      No notifications yet
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-300 min-h-full w-72 p-4 space-y-3">
          <Logo />
          <li className="text-lg font-bold">
            <NavLink to="/dashboard" end>
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>

          {/* Worker */}
          {!isLoading && role === "worker" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/taskList">
                  <FaClipboardList className="mr-2" />
                  Task Lists
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/mySubmissions">
                  <FaRegPaperPlane className="mr-2" />
                  My Submissions
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/withdrawals">
                  <FaMoneyBillWave className="mr-2" />
                  Withdrawals
                </NavLink>
              </li>
            </>
          )}

          {/* Buyer */}
          {!isLoading && role === "buyer" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/addNewTask">
                  <FaTasks className="mr-2" />
                  Add new Tasks
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/myTasks">
                  <FaClipboardCheck className="mr-2" />
                  My Tasks
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/purchaseCoins">
                  <FaCoins className="mr-2" />
                  Purchase Coin
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/paymentHistory">
                  <FaReceipt className="mr-2" />
                  Payment history
                </NavLink>
              </li>
            </>
          )}

          {/* Admin */}
          {!isLoading && role === "admin" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/manageUsers">
                  <FaUsersCog className="mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/manageTasks">
                  <FaListAlt className="mr-2" />
                  Manage Tasks
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
