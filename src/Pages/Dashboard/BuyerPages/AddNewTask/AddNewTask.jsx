import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const AddNewTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [taskImage, setTaskImage] = useState(null);
  const [uploading, setUploading] = useState(false);

   useEffect(() => {
    document.title = "Daily Gigs | Add Task";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await res.json();
      setTaskImage(imgData.secure_url);
    } catch (err) {
      console.error("Image Upload Failed", err);
      Swal.fire("Image upload failed", "", "error");
    }
    setUploading(false);
  };

  const onSubmit = async (data) => {
    if (!taskImage) {
      Swal.fire("Please upload a task image", "", "warning");
      return;
    }

    const totalPayable =
      parseInt(data.required_workers) * parseInt(data.payable_amount);

    try {
      const res = await axiosSecure.get(`/users/byEmail?email=${user?.email}`);
      const userData = res.data;
      console.log(userData);
      if (userData.coins < totalPayable) {
        Swal.fire({
          icon: "error",
          title: "Not enough coins",
          text: "Please purchase more coins to post this task.",
          confirmButtonText: "Go to Purchase Page",
        }).then((result) => {
          if (result.isConfirmed) navigate("/purchase-coins");
        });
        return;
      }

      const taskInfo = {
        task_title: data.task_title,
        task_detail: data.task_detail,
        required_workers: parseInt(data.required_workers),
        payable_amount: parseInt(data.payable_amount),
        total_payable: totalPayable,
        completion_date: data.completion_date,
        submission_info: data.submission_info,
        image: taskImage,
        status: "active",
        buyer_name: user?.displayName,
        created_by: user?.email,
        created_at: new Date().toISOString(),
      };

      const taskRes = await axiosSecure.post("/tasks", taskInfo);
      if (taskRes.data.insertedId) {
        Swal.fire("Task Added Successfully!", "", "success");
        navigate("/dashboard/myTasks");
      }
    } catch (error) {
      console.log("Task Submission Error:", error);
      Swal.fire("Something went wrong!", "", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Task Title & Completion Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Task Title</label>
            <input
              type="text"
              className="border border-gray-400 p-2 w-full rounded-lg"
              {...register("task_title", { required: "Title is required" })}
              placeholder="Watch and comment on my video"
            />
            {errors.task_title && (
              <p className="text-red-500 text-sm">
                {errors.task_title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Completion Deadline
            </label>
            <input
              type="date"
              className="border border-gray-400 p-2 w-full rounded-lg"
              min={new Date().toISOString().split("T")[0]} // today's date
              {...register("completion_date", {
                required: "Completion date is required",
              })}
            />
            {errors.completion_date && (
              <p className="text-red-500 text-sm">
                {errors.completion_date.message}
              </p>
            )}
          </div>
        </div>

        {/* Task Detail */}
        <div>
          <label className="block font-medium mb-1">Task Detail</label>
          <textarea
            className="border border-gray-400 p-2 w-full h-32 rounded-lg"
            {...register("task_detail", {
              required: "Task detail is required",
            })}
            placeholder="Describe what the worker needs to do..."
          />
          {errors.task_detail && (
            <p className="text-red-500 text-sm">{errors.task_detail.message}</p>
          )}
        </div>

        {/* Required Workers & Payable Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Required Workers</label>
            <input
              type="number"
              className="border border-gray-400 p-2 w-full rounded-lg"
              {...register("required_workers", {
                required: "Required workers is required",
                min: { value: 1, message: "Must be at least 1 worker" },
              })}
              placeholder="e.g. 100"
            />
            {errors.required_workers && (
              <p className="text-red-500 text-sm">
                {errors.required_workers.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Payable Amount Per Worker
            </label>
            <input
              type="number"
              className="border border-gray-400 p-2 w-full rounded-lg"
              {...register("payable_amount", {
                required: "Payable amount is required",
                min: { value: 1, message: "Amount must be at least 1 coin" },
              })}
              placeholder="e.g. 10"
            />
            {errors.payable_amount && (
              <p className="text-red-500 text-sm">
                {errors.payable_amount.message}
              </p>
            )}
          </div>
        </div>

        {/* Submission Info & Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block font-medium mb-1">Submission Info</label>
            <input
              type="text"
              className="border border-gray-400 p-2 w-full rounded-lg"
              {...register("submission_info", {
                required: "Submission info is required",
              })}
              placeholder="e.g. Screenshot / Proof"
            />
            {errors.submission_info && (
              <p className="text-red-500 text-sm">
                {errors.submission_info.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Task Image</label>
            <label className="cursor-pointer inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg border border-blue-300 hover:bg-blue-200 transition">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {uploading && (
              <p className="text-blue-500 text-sm mt-1">Uploading...</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-black mt-4 w-full text-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading Image..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;
