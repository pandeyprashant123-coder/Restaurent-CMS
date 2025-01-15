import React, { useState } from "react";
import { BsEye, BsPersonFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { PiRowsFill } from "react-icons/pi";
import { RiUploadCloudFill } from "react-icons/ri";

const AddEmployee = () => {
  const [formData, setFormData] = useState({});

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleSubmit = () => {};
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center gap-2 p-6 font-bold text-xl">
        <IoIosPeople />
        <h1>Add New Food</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="">
          <div className=" flex flex-col gap-3 m-3 bg-white shadow-sm rounded-lg">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b p-3">
              <BsPersonFill />
              <h1>General Information</h1>
            </div>
            <div className="flex gap-3 mx-3">
              <div className="mr-auto flex flex-col gap-2 w-1/2 p-6 ">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder=""
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                />
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder=""
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                />
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                />
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value=""> </option>
                  <option value="Percent">Manager</option>
                  <option value="Amount">Delivary man</option>
                </select>
              </div>
              <div className="w-1/2 p-4 m-4 flex flex-col items-center justify-center border rounded-md shadow-sm bg-white">
                <h4 className="text-gray-700 font-semibold text-lg mb-2">
                  Employee Image{" "}
                  <span className="text-red-500 text-sm">(Ratio 1:1)</span>
                </h4>
                <div className="border-dashed border-2 border-gray-300 p-12 mt-16 rounded-md flex flex-col items-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md mb-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <RiUploadCloudFill className="text-3xl" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="fileInput"
                      />
                      <label
                        htmlFor="fileInput"
                        className="rounded cursor-pointer absolute px-10 py-10 "
                      >
                        Upload Image
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-3 m-3 border bg-white shadow-sm rounded-lg">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b p-3">
                <BsPersonFill />
                <h1>Account Info</h1>
              </div>
              <div className="flex m-6 gap-2">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="name"
                    placeholder="........@....com"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="hs-toggle-password"
                      type={isPasswordVisible ? "text" : "password"}
                      className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
                    >
                      {isPasswordVisible ? <BsEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="hs-toggle-password"
                      type={isPasswordVisible ? "text" : "password"}
                      className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
                    >
                      {isPasswordVisible ? <BsEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 m-3">
              <button className="bg-gray-200 font-semibold text-gray-700 rounded-md py-2 px-8">
                Reset
              </button>
              <button className="btnBlue py-2 px-8">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
