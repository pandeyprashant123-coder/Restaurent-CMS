"use client";
import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FaFileExcel, FaFileCsv } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "../../../../axios";
import useSWR from "swr";

const password = "pandey123";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const RestaurantsList = () => {
  const { data: restaurantList, error } = useSWR("restaurants", fetcher);
  console.log(restaurantList);

  const [selectAll, setSelectAll] = useState("All");
  const handleAllChange = (e) => {
    setSelectAll(e.target.value);
  };
  const [selectBusiness, setSelectBusiness] = useState("Business model");
  const handleBusinessChange = (e) => {
    setSelectBusiness(e.target.value);
  };
  const [selectCuisine, setSelectCuisine] = useState("Select Cuisine");
  const handleCuisineChange = (e) => {
    setSelectCuisine(e.target.value);
  };
  const [selectZone, setSelectZone] = useState("Select zone");
  const handleZoneChange = (e) => {
    setSelectZone(e.target.value);
  };
  const [showCard, setShowCard] = useState(false);
  const handleToggleCard = () => {
    setShowCard((prev) => !prev);
  };
  return (
    <div className="w-full p-5">
      <div className="flex flex-row items-center gap-2 mt-3 mb-3  ">
        <IoReorderThreeOutline className="text-3xl" />
        <h2 className="text-lg font-semibold">Restaurants</h2>
        <p className="p-1 bg-gray-500 text-black text-sm font-semibold rounded-md">
          {restaurantList?.length}
        </p>
      </div>
      <div className="shadow-md rounded-md mt-3 mb-3 mr-3 p-3">
        <div className="grid grid-cols-4  items-center gap-3">
          <div className="w-full">
            <select
              value={selectAll}
              onChange={handleAllChange}
              className="p-2 outline-none bg-transparent shadow-none border border-gray-200 rounded-md w-full"
            >
              <option value="all">All</option>
              <option value="veg">Veg</option>
            </select>
          </div>
          <div className="w-full">
            <select
              value={selectBusiness}
              onChange={handleBusinessChange}
              className="p-2 outline-none bg-transparent shadow-none border border-gray-200 rounded-md w-full"
            >
              <option value="all">All</option>
              <option value="commission">Commission</option>
            </select>
          </div>
          <div className="w-full">
            <select
              value={selectCuisine}
              onChange={handleCuisineChange}
              className="p-2 outline-none bg-transparent shadow-none border border-gray-200 rounded-md w-full"
            >
              <option value="bengali">Bengali</option>
              <option value="indian">Indian</option>
            </select>
          </div>
          <div className="w-full">
            <select
              value={selectZone}
              onChange={handleZoneChange}
              className="p-2 outline-none bg-transparent shadow-none border border-gray-200 rounded-md w-full"
            >
              <option value="all">All Zones</option>
              <option value="allovertheworld">All over the World</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-3 mr-3  gap-3 flex flex-row w-full">
        <div className="flex flex-row rounded-md bg-blue-200 p-3 hover:shadow w-full relative">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-blue-600">15</h2>
            <p className="font-semibold text-sm">Total restaurants</p>
          </div>
          <div className="absolute top-0 right-0 p-3">
            <img src="/assets/img/map-pin.png" alt="image" />
          </div>
        </div>
        <div className="flex flex-row rounded-md bg-green-200 p-3 hover:shadow w-full relative">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-green-600">15</h2>
            <p className="font-semibold text-sm">Active restaurants</p>
          </div>
          <div className="absolute top-0 right-0 p-3">
            <img src="/assets/img/active-rest.png" alt="image" />
          </div>
        </div>
        <div className="flex flex-row rounded-md bg-red-200 p-3 hover:shadow w-full relative">
          {" "}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-red-600">0 </h2>
            <p className="font-semibold text-sm">Inactive restaurants </p>
          </div>
          <div className="absolute top-0 right-0 p-3">
            <img src="/assets/img/inactive-rest.png" alt="image" />
          </div>
        </div>
        <div className="flex flex-row rounded-md bg-yellow-200 hover:shadow w-full p-3 relative mr-3">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-brown-600">15</h2>
            <p className="font-semibold text-sm">Newly joined restaurants</p>
          </div>
          <div className="absolute top-0 right-0 p-3">
            <img src="/assets/img/new-rest.png" alt="image" />
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-md p-3 mt-4 mb-3 mr-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2 text-blue-500">
            <FaFileAlt className="text-xl" />
            <p>TOTAL TRANSACTIONS</p>
            <span className="font-semibold">51</span>
          </div>
          <div className="h-[60px] p-[1px] text-gray-500 w-auto bg-gray-500 rotate-180"></div>
          <div className="flex flex-row gap-2 text-green-500">
            <FaFileAlt className="text-xl" />
            <p>COMMISSION EARNED</p>
            <span className="font-semibold">$ 10,471.14</span>
          </div>
          <div className="h-[60px] p-[1px] text-gray-500 w-auto bg-gray-500 rotate-180"></div>
          <div className="flex flex-row gap-2 text-red-500">
            <FaFileAlt className="text-xl" />
            <p>TOTAL RESTAURANTS WITHDRAWS</p>
            <span className="font-semibold"> $ 0.00</span>
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-md mt-3 mb-3 mr-3 flex flex-col p-3">
        <div className=" flex flex-row items-center justify-between mb-3">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-lg font-semibold">Restaurant List</h1>
          </div>
          <div className="flex flex-row  items-center justify-between gap-3">
            <div className="flex flex-row  border-2 rounded-md border-gray-500">
              <input
                type="text"
                name="Search by Reference"
                placeholder="Search by Restaurant"
                className="outline-none bg-transparent shadow-none p-2"
              />
              <CiSearch className="p-2 text-5xl bg-gray-500 text-white cursor-pointer" />
            </div>
            <div className="relative  border-2 rounded-md border-blue-500">
              <button
                className="flex flex-row text-blue-400 items-center p-2 outline-none bg-transparent shadow-none"
                onClick={handleToggleCard}
              >
                <IoMdDownload className="p-[5px] text-[25px]" />
                Export
                <RiArrowDropDownLine className="p-0 text-[30px]" />
              </button>

              {showCard && (
                <div className="flex flex-col absolute bottom-10 bg-slate-300 m-3 p-2 w-52 right-0 rounded">
                  <h2 className="text-sm font-semibold flex items-center">
                    Download Option
                  </h2>
                  <div className="export-option">
                    <FaFileExcel
                      style={{ marginRight: "8px", color: "green" }}
                    />
                    <a href="/path-to-excel-file" download="data.xlsx">
                      Download Excel
                    </a>
                  </div>
                  <div className="export-option">
                    <FaFileCsv style={{ marginRight: "8px", color: "blue" }} />
                    <a href="/path-to-csv-file" download="data.csv">
                      Download CSV
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full ">
            <thead>
              <tr className=" bg-slate-100 ">
                <th className="p-2 text-left">SI</th>
                <th className="p-2 text-left">Restaurant Info</th>
                <th className="p-2 text-left">Owner Info</th>
                <th className="p-2 text-left">Zone</th>
                <th className="p-2 text-left">Cuisine</th>
                <th className="p-2 text-left">Status </th>
                <th className="p-2 text-left">Action </th>
              </tr>
            </thead>
            <tbody>
              {restaurantList?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index}</td>
                  <td className="p-2">
                    <div className="flex flex-row  gap-2">
                      <div>
                        <img
                          src={item.logo || null}
                          alt="image"
                          className="h-10 w-10"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <p className="text-black font-semibold text-sm ">
                            Food Fair
                          </p>
                        </div>
                        <div className="flex flex-row items-center">
                          <span className="text-orange-500 font-semibold">
                            {" "}
                            <FaStar />0
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col">
                      <p>
                        {item.ownerFirstName}
                        {item.ownerLastName}
                      </p>
                      <p>{item.phone}</p>
                    </div>
                  </td>
                  <td className="p-2">{item.zone}</td>
                  <td className="p-2">
                    <div className="flex flex-col">
                      <div>
                        {item.categories.map((category) => (
                          <p>{category.cName},</p>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        defaultChecked={item.RestaurantOpen}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-row items-center gap-3">
                      <button className="text-blue-500 p-1 my-5 border border-blue-300 rounded-md">
                        <FaPen className="text-xl" />
                      </button>
                      <button className="text-red-500 p-1 my-5 border border-red-300 rounded-md">
                        <MdDeleteForever className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;
