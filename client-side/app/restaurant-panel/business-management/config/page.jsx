"use client";
import React, { useState } from "react";

import { RiRestaurantLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { LiaHamburgerSolid } from "react-icons/lia";
import { GiSettingsKnobs } from "react-icons/gi";
import { BiSolidDashboard } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";

// type Schedule = {
//   day: string;
//   slots: { startTime: string; endTime: string }[];
// };

const generalSetting = [
  "Scheduled Delivery",
  "Home Delivery",
  "Takeaway",
  "Veg",
  "Non veg",
  "Subscription based Order",
  "Cutlery",
  "Instant order",
  "Halal tag status",
  "Extra Packaging Charge",
  "Dine-In",
];
const RestaurantConfig = () => {
  const [gstActive, setGstActive] = useState(true);

  //time schedules
  const [schedules, setSchedules] = useState([
    { day: "Monday", slots: [{ startTime: "06:00 AM", endTime: "11:59 PM" }] },
    { day: "Tuesday", slots: [] },
    { day: "Wednesday", slots: [] },
    { day: "Friday", slots: [] },
    { day: "Saturday", slots: [] },
    { day: "Sunday", slots: [] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const openModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStartTime("");
    setEndTime("");
  };

  const handleAddSlot = () => {
    if (startTime && endTime) {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.day === selectedDay
            ? {
                ...schedule,
                slots: [...schedule.slots, { startTime, endTime }],
              }
            : schedule
        )
      );
      closeModal();
    } else {
      alert("Please select both start and end times.");
    }
  };

  const handleDeleteSlot = (day, index) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.day === day
          ? {
              ...schedule,
              slots: schedule.slots.filter((_, i) => i !== index),
            }
          : schedule
      )
    );
  };
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center gap-2 p-6 font-semibold text-xl ">
        <RiRestaurantLine />
        <h1>Restaurant Setup</h1>
      </div>
      <div>
        <div className="m-6 border rounded-md bg-white p-6 flex justify-between">
          <div className="flex items-center gap-1 text-lg font-semibold">
            <IoIosSettings className="text-2xl" />
            <h1 className="">Close Restaurant Temporarily</h1>
            <CiCircleInfo />
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-[3.25rem] h-7 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className=" flex flex-col gap-3 mx-6 bg-white shadow-sm rounded-lg">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b p-3">
            <LiaHamburgerSolid />
            <h1>Restaurants & Category Info</h1>
          </div>
          <div className="p-2 grid grid-cols-3 gap-4">
            {generalSetting.map((item) => (
              <div className="border rounded-md  p-3 flex justify-between">
                <div className="flex items-center gap-1 ">
                  <h1 className="">{item}:</h1>
                  <CiCircleInfo />
                </div>

                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <form action="">
          <div className=" flex flex-col gap-3 m-6 p-3 bg-white shadow-sm rounded-lg">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b">
              <GiSettingsKnobs />
              <h1>Basic Settings</h1>
            </div>
            <div className="bg-gray-100 rounded-md ">
              <div className="flex items-center gap-1 border-b">
                <fieldset className="w-full  p-4 rounded-md ">
                  <div className="flex items-center gap-2">
                    <legend className="">Extra packaging charge </legend>
                    <CiCircleInfo />
                  </div>
                  <div className="flex justify-end gap-12 items-center py-3 pr-16">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="packaging"
                        id="optional"
                        value="optional"
                        defaultChecked
                        className="mt-1 p-3 border border-gray-300 text-orange-300 rounded-md shadow-sm"
                      />
                      <label
                        htmlFor="optional"
                        className="block text-sm  text-gray-700"
                      >
                        Optional
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="packaging"
                        value="mandatory"
                        id="mandatory"
                        className="mt-1 p-3 border border-gray-300 text-orange-300 rounded-md shadow-sm"
                      />
                      <label
                        htmlFor="mandatory"
                        className="block text-sm  text-gray-700"
                      >
                        Mandatory
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="w-full p-4">
                <label className="block   text-gray-700">
                  Extra packaging charge amount
                </label>
                <input
                  type="numer"
                  name="extraPackagingAmount"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="w-full p-4">
                <div className="flex items-center gap-2">
                  <label className="">Minimum order amount </label>
                  <CiCircleInfo />
                </div>
                <input
                  type="numer"
                  name="extraPackagingAmount"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              <div className="w-full p-4">
                <div className="flex items-center gap-2">
                  <label className="">Minimum Time for Dine-In order </label>
                  <CiCircleInfo />
                </div>
                <input
                  type="numer"
                  name="extraPackagingAmount"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                />
              </div>
              <div className="w-full p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <label className="">GST </label>
                    <CiCircleInfo />
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onChange={() => {
                        setGstActive((prev) => !prev);
                      }}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <input
                  type="numer"
                  name="extraPackagingAmount"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  disabled={gstActive}
                />
              </div>
              <div className="w-full p-4">
                <div className="flex items-center gap-2">
                  <label className="">Cuisine</label>
                  <CiCircleInfo />
                </div>
                <select
                  name="filter"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">All Ads</option>
                  <option value="Running">Running</option>
                  <option value="Approved">Approved</option>
                  <option value="Expired">Expired</option>
                  <option value="Denied">Denied</option>
                </select>
              </div>
            </div>
            <div className="bg-gray-100 rounded-md ">
              <div className="w-full p-4">
                <div className="flex flex-col gap-2">
                  <label className="">Set Restaurant Characteristics</label>
                  <p className="text-sm text-gray-600">
                    Select the Restaurant Type that Best Represents Your
                    Establishment
                  </p>
                </div>
                <select
                  name="filter"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">All Ads</option>
                  <option value="Running">Running</option>
                  <option value="Approved">Approved</option>
                  <option value="Expired">Expired</option>
                  <option value="Denied">Denied</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 w-full justify-end p-3">
              <button
                type="button"
                className="bg-gray-300 py-1 font-semibold px-5 rounded-lg"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-indigo-700 text-white py-1 font-semibold px-5 rounded-lg "
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <div className=" flex flex-col gap-3 m-6  border rounded-lg">
          <div className="flex items-center gap-2 p-3 text-lg font-semibold text-slate-500 border-b">
            <h1>Restaurant meta Data</h1>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full  p-3">
            <div className="flex flex-col gap-5 shadow-sm p-3 rounded-lg bg-white">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title (Default)
                </label>
                <input
                  type="text"
                  name="nutrition"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Meta description (Default)
                </label>
                <textarea
                  name="nutrition"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className=" flex flex-col gap-3 p-3 bg-white shadow-sm rounded-lg">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b">
                <BiSolidDashboard />
                <h1>Restaurent Meta Image</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full justify-end p-3">
            <button
              type="submit"
              className="bg-indigo-700 flex text-white py-1 font-semibold px-5 rounded-lg "
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className=" flex flex-col gap-3 m-6 p-3 bg-white shadow-sm rounded-lg">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b">
            <SlCalender />
            <h1>Restaurant Opening & Closing Schedules</h1>
          </div>
          <div className="p-6 ">
            {schedules.map((schedule) => (
              <div key={schedule.day} className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-medium">{schedule.day}:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {schedule.slots.map((slot, index) => (
                    <div key={index} className="flex items-center  py-2 gap-2">
                      <div className="border border-gray-300  text-center rounded-md p-2">
                        🕒 Opening Time <br /> {slot.startTime}
                      </div>
                      <div className="border border-gray-300 text-center  rounded-md p-2">
                        🕒 Closing Time <br /> {slot.endTime}
                      </div>
                      <button
                        onClick={() => handleDeleteSlot(schedule.day, index)}
                        className="text-red-500 border border-red-500 p-1 rounded-full text-sm"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                  <div>
                    <button
                      onClick={() => openModal(schedule.day)}
                      className="text-blue-500 border border-blue-300 rounded-md px-2 py-1"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-lg font-semibold mb-4">
              Create Schedule for {selectedDay}
            </h2>

            {/* Start Time */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time:
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* End Time */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time:
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 rounded-md px-4 py-2"
              >
                Reset
              </button>
              <button
                onClick={handleAddSlot}
                className="bg-blue-500 text-white rounded-md px-4 py-2"
              >
                Submit
              </button>
            </div>

            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantConfig;
