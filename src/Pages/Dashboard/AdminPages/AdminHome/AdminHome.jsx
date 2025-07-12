// ==== Frontend: AdminHome.jsx ====
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin-stats");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure
        .patch(`/dashboard/approve/${id}`)
        .then((res) => {
          Swal.fire("Success!", "Withdrawal approved.", "success");
          refetch();
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status) {
            Swal.fire("Error!", `${err.response?.data?.error}`, "error");
          }
        });
    } catch (err) {
      Swal.fire("Error!", "Failed to approve withdrawal.", "error");
    }
  };

  if (isLoading) return <LoadingPage />;

  const pieData = [
    { name: "Workers", value: stats.totalWorkers || 0 },
    { name: "Buyers", value: stats.totalBuyers || 0 },
  ];
  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, Admin</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Workers</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalWorkers}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Buyers</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalBuyers}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Available Coins</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.totalCoins}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Payments</h3>
          <p className="text-3xl font-bold text-red-600">
            {stats.totalPayment} Coins
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-xl font-bold mb-4">User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Pending Withdrawal Requests</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="text-lg text-black">
              <tr>
                <th>Worker</th>
                <th>Email</th>
                <th>Coins</th>
                <th>Amount ($)</th>
                <th>Payment System</th>
                <th>Account No</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {stats.pendingWithdrawals?.map((w) => (
                <tr key={w._id}>
                  <td>{w.worker_name}</td>
                  <td>{w.worker_email}</td>
                  <td>{w.withdrawal_coin}</td>
                  <td>${w.withdrawal_amount}</td>
                  <td>{w.payment_system}</td>
                  <td>{w.account_number}</td>
                  <td>
                    <span className="badge badge-warning capitalize">
                      {w.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleApprove(w._id)}
                      className="btn btn-sm bg-green-500 text-white"
                    >
                      Payment
                    </button>
                  </td>
                </tr>
              ))}
              {!stats.pendingWithdrawals?.length && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No pending requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
