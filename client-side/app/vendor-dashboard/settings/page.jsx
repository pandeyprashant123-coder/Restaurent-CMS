"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

import { MdHomeFilled } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { LuLockKeyhole } from "react-icons/lu";
import { BsPenFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa6";

const Settings = () => {
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleBasicInfoChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    console.log("Basic Info Submitted:", basicInfo);
    toast("Basic information updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.newPassword || !passwords.confirmPassword) {
      toast("Please fill in both password fields.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast("Passwords do not match.");
      return;
    }
    if (passwords.newPassword.length < 8) {
      toast("Password must be at least 8 characters long.");
      return;
    }
    console.log("Password Updated:", passwords.newPassword);
    toast("Password updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          Settings
        </h1>
        <Link
          href="/vendor-dashboard"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <MdHomeFilled />
          Dashboard
        </Link>
      </div>
      <div className="flex gap-6 items-start">
        <div
          className="bg-white sticky top-20 p-6 mt-6 rounded-md shadow-md flex flex-col gap-3 h-28 w-1/4 text-gray-600 cursor-pointer"
          style={{ zIndex: "10000" }}
        >
          <div className="flex items-center gap-2 hover:text-blue-500">
            <IoPerson />
            <h1>Basic information</h1>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-500">
            <LuLockKeyhole />
            <h1>Basic information</h1>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-6 bg-white pb-8 rounded-md shadow-md flex flex-col items-center relative">
            <div className="bg-gray-200 h-44 rounded-t-md w-full"></div>
            <div className="h-32 w-32 bg-red-50 absolute bottom-3 border-2 border-white rounded-full">
              <div className="relative">
                <div className="absolute right-0 bottom-[-7.5rem] bg-white p-2 rounded-full text-xl shadow-md">
                  <FaPen className="p-1" />
                </div>
              </div>
            </div>
          </div>
          {/* Basic Information Section */}
          <div className="mt-6 bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-700 border-b pb-3 mb-4">
              <AiFillInfoCircle className="" />
              Basic Information
            </div>
            <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={basicInfo.firstName}
                    onChange={handleBasicInfoChange}
                    placeholder="First Name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={basicInfo.lastName}
                    onChange={handleBasicInfoChange}
                    placeholder="Last Name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={basicInfo.phone}
                  onChange={handleBasicInfoChange}
                  placeholder="Phone Number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={basicInfo.email}
                  onChange={handleBasicInfoChange}
                  placeholder="Email Address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className=" flex w-full justify-end text-white   transition"
              >
                <h1 className="px-3 hover:bg-blue-700 bg-blue-600 py-2  rounded-md ">
                  Save Changes
                </h1>
              </button>
            </form>
          </div>

          {/* Change Password Section */}
          <div className="mt-6 bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-700 border-b pb-3 mb-4">
              <AiFillInfoCircle className="" />
              Change Your Password
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Password length 8+"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Password length 8+"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className=" flex w-full justify-end text-white   transition"
              >
                <h1 className="px-3 hover:bg-blue-700 bg-blue-600 py-2  rounded-md ">
                  Update Password
                </h1>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
