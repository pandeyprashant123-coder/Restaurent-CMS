import React from "react";

import { LuListFilter } from "react-icons/lu";
import { FaCirclePlus, FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import list from "../../../../data/addedFood.json";

const Basic = () => {
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center justify-between gap-2 p-6 font-bold ">
        <div className="flex gap-2 items-center text-xl">
          <LuListFilter />
          <h1>Campaign</h1>
          <h1 className="font-normal text-sm px-1 ml-4 rounded-md bg-gray-300">
            1
          </h1>
        </div>
      </div>
      <div className="m-6 border rounded-sm">
        {/* search and categories */}
        <div className="p-3 flex justify-end">
          <div className="flex items-center border rounded-md bg-white">
            <input
              type="search"
              placeholder="Ex : Search by ads id"
              className="border-none text-sm text-gray-700"
            />
            <IoSearchOutline className="bg-slate-300 p-3 h-10 w-10 text-white rounded-e-md cursor-pointer hover:bg-gray-400" />
          </div>
        </div>
        <div className="mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className=" bg-slate-100 ">
                <th className="pl-5 text-left  font-semibold text-base">SI</th>
                <th className="text-left py-2 pl-5  font-semibold text-base">
                  Title
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Image
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Date Duration
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Time Duration{" "}
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Status{" "}
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Action{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="pl-5 text-left">{index}</td>
                  <td className="pl-2 text-left text-blue-500 text-base ">
                    <h1>{item.name}</h1>
                  </td>
                  <td className="pl-2 text-left">{item.category}</td>
                  <td className="pl-2 text-left ">{item.unitPrice}</td>
                  <td className="pl-2 text-left"></td>
                  <td className="pl-2 text-left"></td>
                  <td className="text-left flex gap-2">
                    <button className="py-1 px-2 text-base my-5 text-white bg-orange-500  rounded-md">
                      Leave Campaign
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

export default Basic;
