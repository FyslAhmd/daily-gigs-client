import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MIN_COIN = 200;
const CONVERSION_RATE = 20;

const paymentOptions = ["Bkash", "Rocket", "Nagad", "Upay", "Bank"];

const WithDrawals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [withdrawCoin, setWithdrawCoin] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    document.title = "Daily Gigs | Withdrawals";
  }, []);

  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userCoins", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/byEmail?email=${user.email}`);
      return res.data;
    },
  });

  const currentCoin = userData.coins || 0;
  const withdrawAmount = (withdrawCoin / CONVERSION_RATE).toFixed(2);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (
      !withdrawCoin ||
      withdrawCoin < MIN_COIN ||
      withdrawCoin > currentCoin ||
      withdrawCoin % 20 !== 0
    ) {
      return Swal.fire(
        "Error",
        "Enter a valid withdrawable coin amount.",
        "error"
      );
    }

    const withdrawal = {
      worker_email: user.email,
      worker_name: user.displayName,
      withdrawal_coin: parseInt(withdrawCoin),
      withdrawal_amount: parseFloat(withdrawAmount),
      payment_system: paymentMethod,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/withdrawals", withdrawal);
      if (res.data.insertedId) {
        Swal.fire(
          "Success!",
          "Your withdrawal request is pending approval.",
          "success"
        );
        setWithdrawCoin("");
        setPaymentMethod("");
        setAccountNumber("");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Withdraw Earnings</h2>

      <div className="mb-6 text-lg bg-gray-50 p-4 rounded-lg border">
        <p>
          <strong>Current Coin:</strong> {currentCoin}
        </p>
        <p>
          <strong>Equivalent Dollar:</strong> $
          {(currentCoin / CONVERSION_RATE).toFixed(2)}
        </p>
      </div>

      {currentCoin >= MIN_COIN ? (
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="block font-medium">Coin to Withdraw</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={withdrawCoin}
              onChange={(e) => setWithdrawCoin(e.target.value)}
              min={MIN_COIN}
              max={currentCoin}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Withdraw Amount ($)</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100"
              value={withdrawAmount}
              readOnly
            />
          </div>

          <div>
            <label className="block font-medium">Payment Method</label>
            <select
              className="select select-bordered w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Payment Option
              </option>
              {paymentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Account Number</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary text-lg w-full text-black">
            Withdraw
          </button>
        </form>
      ) : (
        <div className="text-center text-red-600 font-semibold mt-4">
          🚫 Insufficient coin. You need at least 200 coins to withdraw.
        </div>
      )}
    </div>
  );
};

export default WithDrawals;
