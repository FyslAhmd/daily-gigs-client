import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Pages/Shared/Logo/Logo";
import useUserRole from "../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
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

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role, isLoading } = useUserRole();
  const { data: userData = {} } = useQuery({
    queryKey: ["userCoins", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/byEmail?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-white flex flex-col">
        <div className="navbar w-full">
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
                className="inline-block h-6 w-6 stroke-current"
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
          <div className="text-3xl font-extrabold mx-2 flex-1 px-2">
            Dashboard
          </div>
          <div className="flex items-center justify-end gap-4">
            <div className="flex flex-col items-end">
              <p className="font-medium">{userData.coins} Coins</p>
              <p className="font-medium">
                {userData.name} | {userData.role}
              </p>
            </div>
            <div>
              <img
                src={userData.profilePic}
                className="w-12 h-12 rounded-full"
                alt=""
              />
            </div>
            <div>
              <button>
                <IoNotifications size={28} color="red" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-300 min-h-full w-70 p-4 space-y-3">
          <Logo />
          <li className="text-lg font-bold">
            <NavLink to="/dashboard" end>
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>

          {/* worker links */}
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

          {/* buyers links */}
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

          {/* admin links */}
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
