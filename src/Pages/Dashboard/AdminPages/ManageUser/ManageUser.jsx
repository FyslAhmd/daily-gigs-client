import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import profileImg from "../../../../assets/image-upload-icon.png";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");

   useEffect(() => {
    document.title = "Daily Gigs | Manage Users";
  }, []);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRemove = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${email}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User removed successfully.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${email}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Role updated successfully.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Role update failed.", "error");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

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
        <table className="table w-full table-zebra shadow-2xl">
          <thead className="text-lg text-black">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Coin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.profilePic || profileImg}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td>{user.name || "Unknown"}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value)
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                      <option value="worker">Worker</option>
                    </select>
                  </td>
                  <td>{user.coins || 0}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(user?.email)}
                      className="btn btn-sm bg-primary text-black"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-red-500">
                  No users found with this email.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
