import React from "react";

import { LuListFilter } from "react-icons/lu";
import { FaCirclePlus, FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

import list from "../../../data/addedFood.json";

const List = () => {
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center gap-2 p-6 font-bold text-xl">
        <LuListFilter />
        <h1>Food List</h1>
      </div>
      <div className="flex justify-end gap-3 text-white font-semibold px-6">
        <button className="bg-red-400 p-2 rounded-md">
          Out of Stock Foods{" "}
        </button>
        <Link
          to="../food-management/Addnew"
          replace={true}
          className="flex gap-2 items-center bg-indigo-400 p-2 rounded-md"
        >
          <FaCirclePlus />
          <span>Add New Food</span>
        </Link>
      </div>
      <div className="m-6 border rounded-sm">
        {/* search and categories */}
        <div className="p-3 flex justify-end">
          <div className="flex items-center border rounded-md bg-white">
            <input
              type="search"
              placeholder="Ex : Search food Name"
              className="text-sm text-gray-700 border-none"
            />
            <IoSearchOutline className="bg-slate-300 p-3 h-10 w-10 text-white rounded-e-md cursor-pointer hover:bg-gray-400" />
          </div>
        </div>
        {/* tables */}
        <div className="mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className=" bg-slate-100 ">
                <th className="py-5 text-center  font-semibold text-base">
                  SI
                </th>
                <th className="text-center py-2 pl-5  font-semibold text-base">
                  Name
                </th>
                <th className="text-center py-2 pl-5  font-semibold text-base">
                  Category
                </th>
                <th className="text-center py-2  font-semibold text-base">
                  Price
                </th>
                <th className="text-center py-2  font-semibold text-base">
                  Recommended
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
                  <td className="pl-2 text-center">
                    <img src="" alt="" />
                    <h1>{item.name}</h1>
                  </td>
                  <td className="pl-2 text-center">{item.category}</td>
                  <td className="pl-2 text-center">{item.unitPrice}</td>
                  <td className="pl-2 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="pl-2 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="text-center flex justify-center gap-2">
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

export default List;
