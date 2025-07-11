import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/Loading/LoadingPage";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks/all");
      return res.data;
    },
  });

  const handleDeleteTask = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/tasks/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Task has been removed.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete the task.", "error");
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  const filteredTasks = tasks.filter((task) =>
    task.created_by?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Tasks</h2>

      {/* Search Input */}
      <div className="mb-4 max-w-sm ml-auto">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border border-gray-400 p-2 w-full rounded-full"
          placeholder="Search by email..."
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table w-full table-zebra">
          <thead className="text-lg text-black bg-gray-100">
            <tr>
              <th>Title</th>
              <th>Buyer Email</th>
              <th>Payable</th>
              <th>Required Workers</th>
              <th>Completion Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task._id}>
                  <td className="font-semibold">
                    {task.task_title?.split(" ").slice(0, 3).join(" ")}
                  </td>
                  <td>{task.created_by}</td>
                  <td>{task.payable_amount} Coins</td>
                  <td>{task.required_workers}</td>
                  <td>{task.completion_date}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-red-500 py-4">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
