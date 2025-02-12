"use client";
import React from "react";

import { LuListFilter } from "react-icons/lu";
import { FaCirclePlus, FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import Link from "next/link";
import list from "../../../../data/addedFood.json";
import useSWR from "swr";
import { format } from "date-fns";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const AdsList = () => {
  const { data, error } = useSWR(
    `${process.env.API_BASE_URL}/advertisement`,
    fetcher
  );
  //  const highlights = data.filter((item) => item.status === "Approved");
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/advertisement/${id}`);
      toast("Ad deleted successfully");
    } catch (error) {
      toast("Error deleting Ad:", error);
    }
  };
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center justify-between gap-2 p-6 font-bold ">
        <div className="flex gap-2 items-center text-xl">
          <LuListFilter />
          <h1>Ads List</h1>
          <h1 className="font-normal text-sm px-1 ml-4 rounded-md bg-gray-300">
            3
          </h1>
        </div>
        <Link
          href="../food-management/Addnew"
          replace={true}
          className="flex gap-2 items-center text-white font-semibold bg-indigo-400 p-2 rounded-md"
        >
          <FaCirclePlus />
          <span>Add New Advertisement</span>
        </Link>
      </div>
      <div className="m-6 border rounded-sm">
        {/* search and categories */}
        <div className="p-3 flex gap-3 justify-end">
          <div className="flex items-center border rounded-md  bg-white">
            <input
              type="search"
              placeholder="Ex : Search by ads id"
              className="m-2 text-sm text-gray-700"
            />
            <IoSearchOutline className="bg-slate-300 m-0 p-3 h-10 w-10 text-white rounded-e-md cursor-pointer hover:bg-gray-400" />
          </div>
          <div>
            <select
              name="filter"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">All Ads</option>
              <option value="Running">Running</option>
              <option value="Approved">Approved</option>
              <option value="Expired">Expired</option>
              <option value="Denied">Denied</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className=" bg-slate-100 ">
                <th className="py-5 text-center  font-semibold text-base">
                  SI
                </th>
                <th className="text-center py-2 pl-5  font-semibold text-base">
                  Ads ID
                </th>
                <th className="text-center py-2 pl-5  font-semibold text-base">
                  Ads Type
                </th>
                <th className="text-center py-2  font-semibold text-base">
                  Ads Title
                </th>
                <th className="text-center py-2  font-semibold text-base">
                  Duration
                </th>
                <th className="text-center py-2  font-semibold text-base">
                  Status{" "}
                </th>
                <th className="text-center py-2  font-semibold text-base">
                  Action{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="pl-2 text-center">{index}</td>
                  <td className="pl-2 text-center text-blue-500 text-base ">
                    <h1>{item._id.slice(4, 9)}</h1>
                  </td>
                  <td className="pl-2 text-center">{item.adType}</td>
                  <td className="pl-2 text-center">{item.title}</td>
                  <td className="pl-2 text-center ">
                    {format(new Date(item.startDate), "PPpp")}-
                    {format(new Date(item.endDate), "PPpp")}
                  </td>
                  <td className="pl-2 text-center">{item.status}</td>

                  <td className="text-center flex justify-center gap-2">
                    <button
                      className="text-red-500 p-1 my-5 border border-red-300 hover:bg-red-500 hover:text-white  duration-150 rounded-md"
                      onClick={() => handleDelete(item._id)}
                    >
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

export default AdsList;
