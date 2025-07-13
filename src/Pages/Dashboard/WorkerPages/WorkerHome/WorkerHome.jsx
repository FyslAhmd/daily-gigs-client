import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const WorkerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Daily Gigs | Worker Home";
  }, []);

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["worker-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/worker-stats?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: approvedSubmissions = [], isLoading: approvedLoading } =
    useQuery({
      queryKey: ["approved-submissions", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/dashboard/approved-submissions?email=${user.email}`
        );
        return res.data;
      },
      enabled: !!user?.email,
    });

  if (statsLoading || approvedLoading) return <LoadingPage />;

  const {
    totalSubmissions = 0,
    pendingSubmissions = 0,
    totalEarning = 0,
  } = stats;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Submissions</h3>
          <p className="text-3xl font-bold text-blue-600">{totalSubmissions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Pending Submissions</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingSubmissions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Total Earning</h3>
          <p className="text-3xl font-bold text-green-500">
            {totalEarning} Coins
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-xl font-bold mb-4">Submission Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Total", value: totalSubmissions },
              { name: "Pending", value: pendingSubmissions },
              { name: "Approved", value: approvedSubmissions.length },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Approved Submissions</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="text-lg text-black">
              <tr>
                <th>Task Title</th>
                <th>Payable</th>
                <th>Buyer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {approvedSubmissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.task_title}</td>
                  <td>{submission.payable_amount} Coins</td>
                  <td>{submission.buyer_name}</td>
                  <td>
                    <span className="badge badge-success capitalize">
                      {submission.status}
                    </span>
                  </td>
                </tr>
              ))}
              {approvedSubmissions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No approved submissions yet.
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

export default WorkerHome;
