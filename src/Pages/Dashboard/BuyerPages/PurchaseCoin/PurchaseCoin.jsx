import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import LoadingPage from "../../../Shared/Loading/LoadingPage";
import { BsCoin } from "react-icons/bs";

const COIN_PACKS = [
  { coins: 10, price: 1 },
  { coins: 150, price: 15 },
  { coins: 500, price: 50 },
  { coins: 1000, price: 100 },
];

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#2d3748",
      fontFamily: "'Segoe UI', sans-serif",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e53e3e",
      iconColor: "#e53e3e",
    },
  },
};

const PurchaseCoin = () => {
  const [selectedPack, setSelectedPack] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements || !selectedPack) return;
    setLoading(true);

    try {
      const res = await axiosSecure.post("/payments/create-payment-intent", {
        amount: selectedPack.price * 100,
        email: user.email,
        coins: selectedPack.coins,
      });

      const clientSecret = res.data.clientSecret;

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) {
        Swal.fire("Error", "Card element not found", "error");
        setLoading(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: { email: user.email },
          },
        }
      );

      if (error) {
        const modal = document.getElementById("coin_modal");
        if (modal) modal.close();
        setSelectedPack(null);
        setTimeout(() => {
          Swal.fire("Payment Failed", error.message, "error");
        }, 300);
      } else if (paymentIntent.status === "succeeded") {
        await axiosSecure.post("/payments/payment-success", {
          email: user.email,
          coins: selectedPack.coins,
          paymentId: paymentIntent.id,
          amount: selectedPack.price,
        });

        const modal = document.getElementById("coin_modal");
        if (modal) modal.close();
        setSelectedPack(null);
        setTimeout(() => {
          Swal.fire(
            "Success!",
            `You purchased ${selectedPack.coins} coins.`,
            "success"
          );
        }, 300);
      }
    } catch (err) {
      const modal = document.getElementById("coin_modal");
      if (modal) modal.close();
      setSelectedPack(null);
      setTimeout(() => {
        Swal.fire("Error!", "Payment processing failed.", "error");
      }, 300);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Purchase Coins</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COIN_PACKS.map((pack) => (
          <div
            key={pack.coins}
            onClick={() => {
              setSelectedPack(pack);
              document.getElementById("coin_modal").showModal();
            }}
            className="relative group bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 group-hover:opacity-20 transition duration-300 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-yellow-500 text-5xl mb-4">
                <BsCoin size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {pack.coins} Coins
              </h2>
              <p className="text-lg font-semibold text-gray-600">
                ${pack.price}
              </p>
              <span className="mt-3 inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1 rounded-full">
                Only ${(pack.price / pack.coins).toFixed(2)} / coin
              </span>
            </div>
          </div>
        ))}
      </div>

      <dialog id="coin_modal" className="modal">
        <div className="modal-box max-w-lg">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle absolute right-4 top-4"
              onClick={() => setSelectedPack(null)}
            >
              ✕
            </button>
          </form>
          {selectedPack && (
            <>
              <h3 className="font-bold text-2xl mb-4">
                Payment for {selectedPack.coins} Coins (${selectedPack.price})
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="font-medium mb-1 block">Card Number</label>
                  <div className="border p-2 rounded-md">
                    <CardNumberElement options={ELEMENT_OPTIONS} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium mb-1 block">
                      Expiry Date
                    </label>
                    <div className="border p-2 rounded-md">
                      <CardExpiryElement options={ELEMENT_OPTIONS} />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium mb-1 block">CVC</label>
                    <div className="border p-2 rounded-md">
                      <CardCvcElement options={ELEMENT_OPTIONS} />
                    </div>
                  </div>
                </div>
                <button
                  disabled={loading}
                  onClick={handlePayment}
                  className="btn btn-primary text-black w-full text-lg"
                >
                  {loading ? "Processing..." : `Pay $${selectedPack?.price}`}
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>

      {loading && <LoadingPage />}
    </div>
  );
};

export default PurchaseCoin;
