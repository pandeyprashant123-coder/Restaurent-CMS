"use client";
import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FaFileExcel, FaFileCsv } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "../../../axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Cuisine = () => {
  const [showCard, setShowCard] = useState(false);
  const { data } = useSWR("categories", fetcher);
  console.log(data);

  const handleToggleCard = () => {
    setShowCard((prev) => !prev);
  };
  const CuisineData = data?.data;
  return (
    <div className=" m-5">
      <div className="flex gap-2 text-lg font-semibold mt-3 mb-3 items-center">
        <IoLocationSharp className="text-orange-400 text-2xl" />
        <h1 className="text-lg font-semibold">Cuisine</h1>
      </div>
      <div className=" shadow-md rounded-md p-3">
        <div className=" flex flex-row items-center justify-between mb-3">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-lg font-semibold">Cuisine List</h1>
            <p className="text-black p-1 rounded-md bg-gray-400">
              {CuisineData?.length}
            </p>
          </div>
          <div className="flex flex-row  items-center justify-between gap-3">
            <div className="flex flex-row  border rounded-md border-gray-500">
              <input
                type="text"
                name="Search by Reference"
                placeholder="Search by name"
                className="outline-none bg-transparent shadow-none p-2"
              />
              <CiSearch className="p-2 text-5xl bg-gray-500 text-white cursor-pointer" />
            </div>
            <div className="relative  border rounded-md border-blue-500">
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
            <div className="flex flex-row items-center justify-center">
              <button className="text-white font-semibold text-sm bg-blue-500 rounded-md p-3 hover:bg-blue-600 cursor-pointer">
                Add New Cuisine
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className=" bg-slate-100 ">
              <tr>
                <th className="p-2 font-semibold">SI</th>
                <th className="p-2 font-semibold">Cuisine Id</th>
                <th className="p-2 font-semibold">Cuisine Name</th>
                <th className="p-2 font-semibold">Total Restaurant</th>
                <th className="p-2 font-semibold">Status </th>
                <th className="p-2 font-semibold">Action </th>
              </tr>
            </thead>
            <tbody>
              {CuisineData?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-center">{index}</td>
                  <td className="p-2 text-center">
                    {item._id.slice(4, 7).toUpperCase()}
                  </td>
                  <td className="p-2 text-center">{item.cName}</td>
                  <td className="p-2 text-center">1</td>
                  <td className="p-2 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.cStatus === "active"}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="p-2 text-center">
                    <button className="text-blue-500 p-1 my-5 border border-blue-300 rounded-md">
                      <FaPen className="text-xl" />
                    </button>
                    <button className="text-red-500 p-1 my-5 border border-red-300 rounded-md">
                      <MdDeleteForever className="text-xl" />
                    </button>
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

export default Cuisine;
