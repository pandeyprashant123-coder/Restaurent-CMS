"use client";
import React from "react";

import { LuListFilter } from "react-icons/lu";
import { FaCirclePlus, FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import Link from "next/link";
import list from "../../../../data/addedFood.json";

const AdsList = () => {
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
              {list.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="pl-2 text-center">{index}</td>
                  <td className="pl-2 text-center text-blue-500 text-base ">
                    <h1>{item.name}</h1>
                  </td>
                  <td className="pl-2 text-center">{item.category}</td>
                  <td className="pl-2 text-center ">{item.unitPrice}</td>
                  <td className="pl-2 text-center"></td>
                  <td className="pl-2 text-center"></td>
                  <td className="text-center flex justify-center gap-2">
                    <button className="p-1 my-5 border  rounded-md">
                      <BsThreeDotsVertical className="text-xl" />
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
