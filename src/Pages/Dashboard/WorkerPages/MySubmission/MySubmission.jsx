import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const MySubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["my-submissions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Task Submissions
      </h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table table-zebra w-full">
          <thead className="text-lg text-black">
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Submission</th>
              <th>Payable</th>
              <th>Submitted On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-base font-medium">
            {submissions.map((submission, index) => (
              <tr key={submission._id}>
                <td>{index + 1}</td>
                <td>{submission.task_title}</td>
                <td>{submission.submission_details.slice(0, 40)}...</td>
                <td>{submission.payable_amount} Coins</td>
                <td>{new Date(submission.current_date).toLocaleString()}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      submission.status === "pending"
                        ? "bg-yellow-400 text-black"
                        : submission.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-400 text-black"
                    }`}
                  >
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default MySubmission;
