import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const MySubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: submissionData = {}, isLoading } = useQuery({
    queryKey: ["my-submissions", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions/${user.email}?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!user?.email,
  });

  const { submissions = [], totalPages = 0 } = submissionData;

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
                <td>{(page - 1) * limit + index + 1}</td>
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
        <div className="flex justify-center gap-4 my-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="btn btn-sm btn-outline"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-sm btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MySubmission;
