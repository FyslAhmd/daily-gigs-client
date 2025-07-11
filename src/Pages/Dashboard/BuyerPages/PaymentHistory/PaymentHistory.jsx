import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import dayjs from "dayjs";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/history?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Payment History</h1>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="text-lg text-black">
                <th>#</th>
                <th>Coins</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.coins}</td>
                  <td>${payment.amount}</td>
                  <td className="text-sm text-blue-700">{payment.paymentId}</td>
                  <td>
                    {dayjs(payment.createdAt).format("MMM D, YYYY h:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
