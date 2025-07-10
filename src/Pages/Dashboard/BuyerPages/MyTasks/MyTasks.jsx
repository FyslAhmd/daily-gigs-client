import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import UpdateTaskModal from "./UpdateTaskModal";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["my-tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?email=${user?.email}`);
      return res.data.sort(
        (a, b) => new Date(b.completion_date) - new Date(a.completion_date)
      );
    },
  });

  const handleDelete = async (task) => {
    const { _id } = task;

    Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tasks/${_id}`);
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Task has been deleted.", "success");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">My Tasks</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead className="bg-gray-100 text-base text-black">
            <tr>
              <th>Title</th>
              <th>Completion Date</th>
              <th>Workers</th>
              <th>Pay/Worker</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_title}</td>
                <td>{dayjs(task.completion_date).format("DD MMM YYYY")}</td>
                <td>{task.required_workers}</td>
                <td>{task.payable_amount} Coins</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.status === "completed"
                        ? "bg-gray-500 text-white"
                        : "bg-green-700 text-white"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="btn btn-primary btn-sm text-black"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task)}
                    className="btn bg-red-700 btn-sm text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <div className="text-center mt-10 text-gray-500">
            You haven't added any tasks yet.
          </div>
        )}
      </div>

      {selectedTask && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MyTasks;
