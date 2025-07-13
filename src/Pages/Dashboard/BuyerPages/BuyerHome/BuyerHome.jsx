import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const BuyerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

   useEffect(() => {
    document.title = "Daily Gigs | Buyer Home";
  }, []);

  const {
    data: stats = {},
    isLoading,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["buyer-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/buyer-stats?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: reviewSubmissions = [], refetch } = useQuery({
    queryKey: ["review-submissions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/review-submissions?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingPage />;

  const handleApprove = async (submissionId) => {
    try {
      await axiosSecure.patch(`/dashboard/approve-submission/${submissionId}`);
      Swal.fire("Approved!", "Submission approved successfully.", "success");
      refetch();
      refetchStats();
    } catch {
      Swal.fire("Error", "Failed to approve submission", "error");
    }
  };

  const handleReject = async (submissionId, taskId) => {
    try {
      await axiosSecure.patch(`/dashboard/reject-submission/${submissionId}`, {
        taskId,
      });
      Swal.fire("Rejected!", "Submission rejected successfully.", "success");
      refetch();
      refetchStats();
    } catch {
      Swal.fire("Error", "Failed to reject submission", "error");
    }
  };

  const pieData = [
    { name: "Total Tasks", value: stats.totalTaskCount || 0 },
    { name: "Pending Workers", value: stats.totalPendingWorkers || 0 },
    { name: "Total Paid", value: stats.totalPaid || 0 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-3xl text-blue-600 font-bold">
            {stats.totalTaskCount}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Pending Workers</h3>
          <p className="text-3xl text-yellow-500 font-bold">
            {stats.totalPendingWorkers}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Paid</h3>
          <p className="text-3xl text-green-600 font-bold">
            {stats.totalPaid} Coins
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h3 className="text-xl font-bold mb-4">Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
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

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Tasks To Review</h3>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="table table-zebra w-full">
            <thead className="text-lg text-black">
              <tr>
                <th>Worker</th>
                <th>Task</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {reviewSubmissions.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.worker_name}</td>
                  <td>{sub.task_title}</td>
                  <td>{sub.payable_amount} Coins</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedSubmission(sub)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(sub._id)}
                      className="btn btn-sm btn-success text-black"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(sub._id, sub.task_id)}
                      className="btn btn-sm bg-red-500"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedSubmission && (
        <dialog
          id="submission_modal"
          open
          className="modal"
          onClose={() => setSelectedSubmission(null)}
        >
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-2">Submission Details</h3>
            <p className="mb-4">{selectedSubmission.submission_details}</p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BuyerHome;
