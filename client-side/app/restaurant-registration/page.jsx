"use client";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RestaurantRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    vatTax: "",
    tin: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerPhone: "",
    restaurantLogo: null,
    restaurantCover: null,
    licenseDocument: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here if needed
    if (step === 1) {
      setStep(2); // Move to Business Plan step
    } else {
      console.log("Form submitted:", formData);
      // Final form submission logic here
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Join as a Restaurant</h1>
        <div className="flex justify-between mb-6">
          <div
            className={`flex-1 ${
              step >= 1 ? "text-orange-500" : "text-gray-400"
            }`}
          >
            General Information
          </div>
          <div
            className={`flex-1 ${
              step >= 2 ? "text-orange-500" : "text-gray-400"
            }`}
          >
            Business Plan
          </div>
          <div
            className={`flex-1 ${
              step >= 3 ? "text-orange-500" : "text-gray-400"
            }`}
          >
            Complete
          </div>
        </div>

        {step === 1 && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="restaurantName"
              >
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="restaurantAddress"
              >
                Restaurant Address
              </label>
              <input
                type="text"
                id="restaurantAddress"
                name="restaurantAddress"
                value={formData.restaurantAddress}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="vatTax"
              >
                VAT/Tax
              </label>
              <input
                type="text"
                id="vatTax"
                name="vatTax"
                value={formData.vatTax}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Upload Restaurant Logo
              </label>
              <input
                type="file"
                name="restaurantLogo"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Upload Restaurant Cover
              </label>
              <input
                type="file"
                name="restaurantCover"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Business Plan</h2>
            <p>Business plan details form goes here...</p>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 mt-4"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Complete</h2>
            <p>Thank you for registering your restaurant!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantRegistration;
