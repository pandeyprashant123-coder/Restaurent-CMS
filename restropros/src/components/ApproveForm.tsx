import React, { useState, Dispatch, SetStateAction } from "react";
import { saveAs } from "file-saver";

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

interface FormProps {
  formData: UserData;
  setShowForm: (arg: boolean) => void;
  setFormData: Dispatch<SetStateAction<UserData>>;
  handleSave: (data: UserData) => void;
}

const ApproveForm: React.FC<FormProps> = ({
  setShowForm,
  formData,
  setFormData,
  handleSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fileSave = (data: UserData) => {
    // Convert form data to a JSON Blob
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    // Save the JSON file
    saveAs(jsonBlob, "hotels.json");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(formData);
    fileSave(formData);
    setShowForm(false);
    setFormData({
      hotelName: "",
      address: "",
      fullName: "",
      email: "",
      password: "",
      phone: "",
      duration: "",
      plan: "",
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#555252b5] fixed top-0 left-0 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        {isEditing && (
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            Edit Hotel
          </h1>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Edit Button */}

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hotel Name <span className="text-red-500">- (Required)</span>
              </label>
              <input
                type="text"
                name="hotelName"
                id="hotelName"
                placeholder="Enter Hotel Name here..."
                value={formData.hotelName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
                disabled={!isEditing}
              />
            </div>
            {/* Address */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address <span className="text-red-500">- (Required)</span>
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter Full Name here..."
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
                disabled={!isEditing}
              />
            </div>
            {/* Full name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name <span className="text-red-500">- (Required)</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Full Name here..."
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
                disabled={!isEditing}
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500">- (Required)</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email here..."
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                required
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number here..."
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label
                htmlFor="scope"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Plan
              </label>
              <select
                name="plan"
                id="plan"
                value={formData.plan}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">Choose a plan</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Enterprise">Enterprice</option>
              </select>
            </div>
          </div>

          {/* Designation and Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Designation */}
            {/* <div>
            <label
              htmlFor="designation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Designation
            </label>
            <input
              type="text"
              name="designation"
              id="designation"
              placeholder="Enter Designation here..."
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div> */}
            {/* Scope */}

            {/* plan */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration
              </label>
              <select
                name="duration"
                id="duration"
                value={formData.duration}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">Choose duration</option>
                <option value="Annually">Annually</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btnGrey"
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btnGrey"
            >
              Close
            </button>
            {isEditing && (
              <button className="btnGreen" onClick={() => setIsEditing(false)}>
                Confirm
              </button>
            )}
            <button type="submit" className="btnGreen" disabled={isEditing}>
              Approve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveForm;
