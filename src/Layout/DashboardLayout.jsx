import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../Pages/Shared/Logo/Logo";
import {
  FaBoxOpen,
  FaHistory,
  FaHome,
  FaTruck,
  FaUserCircle,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-white flex flex-col">
        <div className="navbar w-full lg:hidden">
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
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        <div>
          <div className="flex items-center justify-end gap-4 border">
            <div className="flex flex-col items-end">
              <p>Available coin | userImage</p>
              <p>userRole | userName</p>
            </div>
            <div>
              <a href="">Notification</a>
            </div>
          </div>
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
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/addNewTask">
              <FaBoxOpen className="mr-2" />
              Add new Tasks
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/myTasks">
              <FaHistory className="mr-2" />
              My Tasks
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/purchaseCoins">
              <FaTruck className="mr-2" />
              Purchase Coin
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/paymentHistory">
              <FaUserCircle className="mr-2" />
              Payment history
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/taskList">
              <FaUserCircle className="mr-2" />
              Task Lists
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/mySubmissions">
              <FaUserCircle className="mr-2" />
              My Submissions
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/withdrawals">
              <FaUserCircle className="mr-2" />
              Withdrawals
            </NavLink>
          </li>
          <li className="text-xl font-bold">
            <NavLink to="/dashboard/manageUsers">
              <FaUserCircle className="mr-2" />
              Manage Users
            </NavLink>
          </li>

          {/* riders links */}
          {/* {!isLoading && role === "rider" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/pendingDelivaries">
                  <FaTasks className="mr-2" />
                  Pending Delivaries
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/completeDelivaries">
                  <FaCheckCircle className="mr-2" />
                  Complete Delivaries
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/myEarnings">
                  <FaWallet className="mr-2" />
                  My Earnings
                </NavLink>
              </li>
            </>
          )} */}

          {/* admin links */}
          {/* {!isLoading && role === "admin" && (
            <>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/activeRiders">
                  <FaUserCheck className="mr-2" />
                  Active Riders
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/pandingRiders">
                  <FaUserClock className="mr-2" />
                  Pending Riders
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/makeAdmin">
                  <FaUserShield className="mr-2" />
                  Make Admin
                </NavLink>
              </li>
              <li className="text-xl font-bold">
                <NavLink to="/dashboard/assignRiders">
                  <FaMotorcycle className="mr-2" />
                  Assign Riders
                </NavLink>
              </li>
            </>
          )} */}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
