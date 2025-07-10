import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const UpdateTaskModal = ({ task, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    submission_info: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        task_title: task.task_title,
        task_detail: task.task_detail,
        submission_info: task.submission_info,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.patch(`/tasks/${task._id}`, formData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Task updated successfully.", "success");
        refetch();
        onClose();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <dialog
      id="update_task_modal"
      open
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center mb-4">Update Task</h3>

        <div className="space-y-3">
          <div>
            <label>Task Title</label>
            <input
              type="text"
              name="task_title"
              value={formData.task_title}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="Task Title"
            />
          </div>
          <div>
            <label className="label">Task Detail</label>
            <textarea
              name="task_detail"
              value={formData.task_detail}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full h-32 rounded-lg"
              placeholder="Task Details"
            />
          </div>
          <div>
            <label className="label">Submission Info</label>
            <input
              type="text"
              name="submission_info"
              value={formData.submission_info}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded-lg"
              placeholder="e.g. Screenshot/Link"
            />
          </div>
        </div>
        <div className="modal-action">
          <button onClick={handleUpdate} className="btn btn-primary text-black">
            Update
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateTaskModal;
