import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import PurchaseCoin from "./PurchaseCoin";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
   useEffect(() => {
    document.title = "Daily Gigs | Purchase Coins";
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <PurchaseCoin />
    </Elements>
  );
};

export default Payment;
