"use client";
import React, { useState } from "react";
import { FaPeopleLine } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";

// interface PermissionProps {
//   permissions: string[];
// }

const permissions = [
  "Food",
  "Order",
  "Restaurant setup",
  "Addon",
  "Wallet",
  "Employee",
  "My shop",
  "Chat",
  "Campaign",
  "Reviews",
  "Pos",
  "Coupon",
  "Report",
];

const EmployeeRole = () => {
  const [selectedPermissions, setSelectedPermissions] = useState(
    permissions.reduce((acc, permission) => {
      acc[permission] = false; // Default all to true
      return acc;
    }, {})
  );

  const togglePermission = (permission) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const toggleAllPermissions = () => {
    const allSelected = Object.values(selectedPermissions).every(
      (value) => value
    );
    const newPermissions = Object.keys(selectedPermissions).reduce(
      (acc, key) => {
        acc[key] = !allSelected;
        return acc;
      },
      {}
    );
    setSelectedPermissions(newPermissions);
  };

  const handleResetPermission = () => {
    const newState = Object.keys(selectedPermissions).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setSelectedPermissions(newState);
  };
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center gap-2 p-6 font-semibold text-xl">
        <IoIosPeople />
        <h1>Employee Role</h1>
      </div>
      <div className=" flex flex-col gap-3 m-3 bg-white shadow-sm rounded-lg">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b p-3">
          <IoDocumentTextOutline />
          <h1>Role Form</h1>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Role name (Default)
            </label>
            <input
              type="text"
              name="roleName"
              placeholder="Role name Example"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="">
            <div className="flex items-center mb-4">
              <h2 className=" font-semibold mr-4">Module Permission:</h2>
              <button
                onClick={toggleAllPermissions}
                className="flex items-center  hover:underline"
              >
                <input
                  type="checkbox"
                  className="mr-2 text-orange-400 rounded-sm"
                  checked={Object.values(selectedPermissions).every(
                    (value) => value
                  )}
                />
                Select All
              </button>
            </div>

            <div className="grid grid-cols-5 gap-7">
              {permissions.map((permission) => (
                <label
                  key={permission}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="text-orange-400 rounded-sm"
                    checked={selectedPermissions[permission]}
                    onChange={() => togglePermission(permission)}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="bg-gray-200 font-semibold text-gray-700 rounded-md py-2 px-8"
              onClick={handleResetPermission}
            >
              Reset
            </button>
            <button className="btnBlue py-2 px-8">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRole;
