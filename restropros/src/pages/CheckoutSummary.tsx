import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import subPlan from "../data/planDetails.json";

// Define a type for allowed billing durations
type BillingDuration = "Monthly" | "Annually";

interface PlanDetails {
  plan: string;
  BillingDuration: BillingDuration;
  noOfHotels: string;
  price: string;
  totalPrice: string;
}

const CheckoutSummary: React.FC = () => {
  const location = useLocation();
  const { name, price, billingFrequency } = location.state;

  const [planDetails, setPlanDetails] = useState<PlanDetails>({
    plan: name || "Basic", // Default plan
    BillingDuration: (billingFrequency as BillingDuration) || "Annually", // Default duration
    noOfHotels: "1",
    price: price,
    totalPrice: "",
  });

  // Dynamically calculate `currentPlan` based on `planDetails.plan`
  const currentPlan = subPlan.find((plan) => plan.name === planDetails.plan);

  // Update the price whenever the plan or billing duration changes
  useEffect(() => {
    if (currentPlan) {
      const total = (+planDetails.price * +planDetails.noOfHotels).toFixed(2);
      setPlanDetails((prev) => ({
        ...prev,
        price: currentPlan.prices[prev.BillingDuration] || "0",
        totalPrice: total,
      }));
    }
  }, [currentPlan, planDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handlePlanChange = (newPlan: string) => {
    setPlanDetails((prev) => ({
      ...prev,
      plan: newPlan,
    }));
  };

  const handleBillingDurationChange = (newDuration: BillingDuration) => {
    setPlanDetails((prev) => ({
      ...prev,
      BillingDuration: newDuration,
    }));
  };

  const handleHotelCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanDetails((prev) => ({
      ...prev,
      noOfHotels: e.target.value,
    }));
  };

  return (
    <div className="text-center h-screen p-6 bg-gray-50 border rounded-md shadow-md mt-16">
      <div className="flex justify-between mt-10">
        {/* Plan Details Section */}
        <div className="flex gap-5 justify-between flex-col w-2/4">
          <h1 className="text-xl font-bold">Plan Details</h1>
          <div className="flex justify-between items-center">
            <h1>Plan</h1>
            <div className="flex gap-2">
              <button
                onClick={() => handlePlanChange("Basic")}
                className={`px-4 py-2 rounded-md ${
                  planDetails.plan === "Basic"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => handlePlanChange("Standard")}
                className={`px-4 py-2 rounded-md ${
                  planDetails.plan === "Standard"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => handlePlanChange("Enterprise")}
                className={`px-4 py-2 rounded-md ${
                  planDetails.plan === "Enterprise"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                Enterprise
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1>Billing Duration</h1>
            <div className="flex gap-2">
              <button
                onClick={() => handleBillingDurationChange("Annually")}
                className={`px-4 py-2 rounded-md ${
                  planDetails.BillingDuration === "Annually"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                Annually
              </button>
              <button
                onClick={() => handleBillingDurationChange("Monthly")}
                className={`px-4 py-2 rounded-md ${
                  planDetails.BillingDuration === "Monthly"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1>No of Hotels</h1>
            <input
              type="number"
              placeholder="Number of hotels..."
              min={0}
              value={planDetails.noOfHotels}
              onChange={handleHotelCountChange}
              className="px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="flex gap-5 flex-col w-1/3 justify-between">
          <h1 className="text-xl font-bold">Order Summary</h1>
          <div className="p-4 border rounded-md shadow-md flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>Preferred Plan</h1>
              <p className="bg-green-100 text-green-500 font-bold px-2 rounded-md">
                {planDetails.plan}
              </p>
            </div>
            <div className="flex justify-between">
              <h1>Per User Cost</h1>
              <p>${planDetails.price}</p>
            </div>
            <div className="flex justify-between">
              <h1>Total No of Hotels</h1>
              <p>{planDetails.noOfHotels}</p>
            </div>
            <div className="flex justify-between">
              <h1>Billing Details</h1>
              <p>
                {planDetails.BillingDuration}
                {`(x${planDetails.BillingDuration === "Monthly" ? "1" : "12"})`}
              </p>
            </div>
            <div className="flex justify-between font-bold text-green-600">
              <h1>Total Cost</h1>
              <p>${planDetails.totalPrice}</p>
            </div>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Proceed To Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
