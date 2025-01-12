import React, { useState } from "react";
import hotels from "../data/hotels.json";
import ApproveForm from "./ApproveForm";

interface UserData {
  hotelName: string;
  address: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  duration: string;
  plan: string;
}
const SubscriptionPending = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserData>({
    hotelName: "",
    address: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    duration: "",
    plan: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const handleEdit = (index: number) => {
    setFormData(hotels[index]); // Pre-fill form with selected card data
    setEditingIndex(index); // Track the index being edited
    setShowForm(true); // Open the form
  };
  const handleDelete = (index: number) => {
    const updatedHotels = hotels.filter((_, i) => i !== index);
  };
  const handleSave = () => {};
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <table className="min-w-full border-collapse text-left text-sm text-gray-700">
        <thead className="sticky">
          <tr className="bg-gray-100">
            <th className="px-6 py-3">SN</th>
            <th className="px-6 py-3">Hotel Name</th>
            <th className="px-6 py-3">Subscription No</th>
            <th className="px-6 py-3">Payment Status</th>
            <th className="px-6 py-3">Approve/Edit</th>
            <th className="px-6 py-3">Terminate</th>
          </tr>
        </thead>
        <tbody>
          {hotels
            .filter((hotel) => hotel.pendingStatus === "Pending")
            .map((hotel, index) => (
              <tr
                key={hotel.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{hotel.hotelName}</td>
                <td className="px-6 py-4">{hotel.subscriptionNo}</td>
                <td
                  className={`px-6 py-4 ${
                    hotel.pendingStatus === "Pending"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {hotel.pendingStatus}
                </td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(index)}
                  >
                    Approve
                  </button>
                </td>
                <td className="px-6 py-4 space-x-4">
                  <button className="text-blue-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showForm && (
        <ApproveForm
          setShowForm={setShowForm}
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default SubscriptionPending;
