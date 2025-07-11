import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import { useQuery } from "@tanstack/react-query";

const TaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState("");

  const {
    data: task,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionDetails.trim()) {
      return Swal.fire("Error", "Submission details required", "error");
    }

    const submission = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email,
      submission_details: submissionDetails,
      worker_name: user.displayName,
      buyer_name: task.buyer_name,
      buyer_email: task.created_by,
      current_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      setSubmitting(true);
      const res = await axiosSecure.post("/submissions", submission);
      if (res.data.insertedId) {
        Swal.fire(
          "Submitted!",
          "Your task submission is pending review.",
          "success"
        );
        setSubmissionDetails("");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!task || isLoading) return <LoadingPage />;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Task Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div>
          <img
            src={task.image}
            alt="Task"
            className="w-full h-[350px] object-cover rounded-lg"
          />
        </div>
        <div className="space-y-3 text-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            {task.task_title}
          </h2>
          <p>
            <span className="font-semibold">Buyer:</span> {task.buyer_name}
          </p>
          <p>
            <span className="font-semibold">Completion Date:</span>{" "}
            {task.completion_date}
          </p>
          <p>
            <span className="font-semibold">Payable: </span>
            {task.payable_amount} Coins
          </p>
          <p>
            <span className="font-semibold">Required Workers:</span>{" "}
            {task.required_workers}
          </p>
          <p>
            <span className="font-semibold">Instructions:</span>{" "}
            {task.submission_info}
          </p>
          <p>
            <span className="font-semibold">Task Detail:</span>{" "}
            {task.task_detail}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-10">
        <label className="block text-lg font-semibold mb-2">
          Submission Details <span className="text-red-500">*</span>
        </label>
        <textarea
          rows="4"
          required
          className="border border-gray-400 p-2 w-full h-32 rounded-lg mb-4"
          placeholder="Explain how you completed the task or provide links/screenshots..."
          value={submissionDetails}
          onChange={(e) => setSubmissionDetails(e.target.value)}
        ></textarea>
        <div className="flex justify-center">
          <button
            disabled={submitting}
            className="btn btn-primary text-black text-lg rounded-full"
            type="submit"
          >
            {submitting ? "Submitting..." : "Submit Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
