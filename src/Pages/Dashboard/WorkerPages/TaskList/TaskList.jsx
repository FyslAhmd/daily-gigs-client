// frontend/src/pages/Worker/TaskList.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["worker-available-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks/available");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Task Lists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-error text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {task.task_title}
                </h3>
                <p className="mb-1">
                  <strong>Buyer:</strong> {task.buyer_name || "Unknown"}
                </p>
                <p className="mb-1">
                  <strong>Deadline:</strong>{" "}
                  {dayjs(task.completion_date).format("DD MMM YYYY")}
                </p>
                <p className="mb-1">
                  <strong>Pay:</strong> {task.payable_amount} coins
                </p>
                <p className="mb-3">
                  <strong>Workers Needed:</strong> {task.required_workers}
                </p>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/dashboard/taskDetails/${task._id}`)}
                  className="btn btn-primary text-black w-full rounded-full"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
