import React, { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import subscriptionPlans from "../data/planDetails.json";

// const subscriptionPlans = [
//   {
//     id: "basic",
//     name: "Basic",
//     prices: { Monthly: "5", Annually: "50" },
//     features: [
//       "Dashboard",
//       "POS",
//       "Orders",
//       "Customers",
//       "Invoices",
//       "Menu items",
//       "Tax setup",
//       "Settings: Menu items, Tax setup",
//     ],
//   },
//   {
//     id: "standard",
//     name: "Standard",
//     prices: { Monthly: "10", Annually: "100" },
//     features: [
//       "Dashboard",
//       "POS",
//       "Orders",
//       "Kitchen",
//       "Reservations",
//       "Customers",
//       "Invoices",
//       "Reports",
//       "Menu items",
//       "Tables",
//       "Tax setup",
//       "Generate QR menu",
//       "Settings: Menu items, Tables, Tax setup, Generate QR menu",
//     ],
//   },
//   {
//     id: "enterprise",
//     name: "Enterprise",
//     prices: { Monthly: "15", Annually: "150" },
//     features: [
//       "Dashboard",
//       "POS",
//       "Orders",
//       "Kitchen",
//       "Reservations",
//       "Customers",
//       "Invoices",
//       "Reports",
//       "Menu items",
//       "Tables",
//       "Tax setup",
//       "Generate QR menu",
//       "Generate digital menu",
//       "Settings: Menu items, Tables, Tax setup, Generate QR menu, Generate digital menu",
//     ],
//   },
// ];

const Pricing = () => {
  const [billingOptions, setBillingOptions] = useState<Record<string, string>>({
    basic: "Billed Annually",
    standard: "Billed Annually",
    enterprise: "Billed Annually",
  });

  const [dropdownVisible, setDropdownVisible] = useState<
    Record<string, boolean>
  >({
    basic: false,
    standard: false,
    enterprise: false,
  });

  const navigate = useNavigate();

  const handleOptionSelect = (planId: string, option: string) => {
    // const plan = subscriptionPlans.find((plan) => plan.id === planId);
    setBillingOptions((prev) => ({
      ...prev,
      [planId]: option,
    }));
    setDropdownVisible((prev) => ({
      ...prev,
      [planId]: false, // Close the dropdown after selection
    }));
  };

  const toggleDropdown = (planId: string) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const handleClick = (
    name: string,
    id: string,
    price: string,
    billingType: string
  ) => {
    // console.log(id, price, billingType);
    navigate("/checkout", {
      state: {
        name: name,
        duration: id,
        price: price,
        billingFrequency: billingType,
      },
    });
  };

  return (
    <div
      className="text-center flex flex-col gap-6 justify-evenly items-center"
      id="pricing"
    >
      <h1 className="text-4xl font-bold flex-between">Pricing</h1>
      <div className="flex gap-5 w-full">
        {subscriptionPlans.map((plan) => {
          const billingType =
            billingOptions[plan.id] === "Billed Monthly"
              ? "Monthly"
              : "Annually";
          const price = plan.prices[billingType];

          return (
            <div
              key={plan.id}
              className="flex flex-col gap-3 items-center justify-between p-7 border rounded-2xl w-1/3 hover:-translate-y-2 duration-500 cursor-pointer"
            >
              <div className="flex flex-col gap-3 items-center justify-start">
                <h1 className="text-3xl font-bold">{plan.name}</h1>
                <h1 className="text-4xl font-bold text-[#70b56a]">${price}</h1>
                <h6 className="text-2xl font-bold">
                  {billingOptions[plan.id]}
                </h6>
                <div className="relative w-full">
                  {/* Dropdown */}
                  <button
                    onClick={() => toggleDropdown(plan.id)}
                    className="w-full text-left px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex justify-between items-center focus:outline-none"
                  >
                    <span>{billingOptions[plan.id]}</span>
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownVisible[plan.id] && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-2">
                      <div
                        onClick={() =>
                          handleOptionSelect(plan.id, "Billed Monthly")
                        }
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Billed Monthly
                      </div>
                      <div
                        onClick={() =>
                          handleOptionSelect(plan.id, "Billed Annually")
                        }
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Billed Annually
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="btnGreen"
                  onClick={() =>
                    handleClick(plan.name, plan.id, price, billingType)
                  }
                >
                  Subscribe Now
                </button>
                <div className="flex flex-col items-start w-full border-t p-2">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-lg"
                    >
                      <div className="">
                        <FaCheckSquare className="text-green-400 " />
                      </div>
                      <p className="pl-5 text-left">{feature} </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
