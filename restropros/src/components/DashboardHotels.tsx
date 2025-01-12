import React, { useState } from "react";
import UserForm from "./UserForm";

import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

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

const DashboardHotels = () => {
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
  const [userCards, setUserCards] = useState<UserData[]>([]);
  console.log(userCards);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setFormData(userCards[index]); // Pre-fill form with selected card data
    setEditingIndex(index); // Track the index being edited
    setShowForm(true); // Open the form
  };
  const handleDelete = (index: number) => {
    setUserCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  const handleSave = (updatedData: UserData) => {
    if (editingIndex !== null) {
      const updatedCards = [...userCards];
      updatedCards[editingIndex] = updatedData; // Update the edited card
      setUserCards(updatedCards);
      setEditingIndex(null); // Reset editing index
    } else {
      setUserCards((prevCards) => [...prevCards, updatedData]); // Add new card
    }
  };

  return (
    <div>
      <div className="flex gap-4 justify-center items-center">
        <h1 className="text-3xl">Hotels</h1>
        <button
          className="bg-gray-50 rounded-full p-2 border text-center flex flex-row justify-center items-center gap-2 shadow-md hover:shadow-lg translate-y-1 duration-75"
          onClick={() => setShowForm(true)}
        >
          <span className="text-xl"> + </span> <p>Add Hotels</p>
        </button>
      </div>

      {/* Display User Cards */}
      <div className="mt-8 flex flex-wrap gap-3">
        {userCards.map((user, index) => (
          <div
            key={index}
            className="p-4 flex flex-col gap-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
          >
            <h1 className="h-0 text-right -translate-y-4 translate-x-3 p-1 text-green-400 text-lg shadow-lg">
              {user.plan}
            </h1>
            <h3 className="text-xl font-bold text-gray-800 uppercase mb-2">
              {user.hotelName}
            </h3>
            <p className="bg-green-100 p-2 text-center font-bold text-green-700 border rounded-md mb-2">
              Is Active
            </p>
            <p className="text-gray">Full Name:</p>
            <p className="text-lg">{user.fullName}</p>
            <p className="text-gray">Address:</p>
            <p className="text-lg">{user.address}</p>
            <p className="text-gray">Email:</p>
            <p className="text-lg">{user.email}</p>
            <p className="text-gray">Phone:</p>
            <p className="text-lg">{user.phone}</p>
            <p className="text-gray">Duration:</p>
            <p className="text-lg">{user.duration}</p>

            <div className="flex gap-2">
              <button
                className="btnGreen mt-4 flex items-center gap-1"
                onClick={() => handleEdit(index)}
              >
                <MdEdit />
                <span>Edit</span>
              </button>
              <button
                className="btnGreen mt-4 flex items-center gap-1"
                onClick={() => handleDelete(index)}
              >
                <MdDeleteForever className="text-xl" />
                <span>delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <UserForm
          setShowForm={setShowForm}
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default DashboardHotels;
