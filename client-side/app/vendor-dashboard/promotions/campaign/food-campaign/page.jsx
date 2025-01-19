import React from "react";

import { LuListFilter } from "react-icons/lu";
import { FaCirclePlus, FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";

import list from "../../../../data/addedFood.json";

const FoodCampaign = () => {
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center justify-between gap-2 p-6 font-semibold ">
        <div className="flex gap-2 items-center text-xl">
          <HiSpeakerphone />
          <h1>Food Campaign</h1>
          <h1 className="font-normal text-sm px-1 ml-4 rounded-md bg-gray-300">
            2
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
              className="m-2 text-sm text-gray-700"
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
                  Date
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Time
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="pl-5 text-left">{index}</td>
                  <td className="pl-2 text-left py-5"></td>
                  <td className="pl-2 text-left">{item.category}</td>
                  <td className="pl-2 text-left ">{item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodCampaign;
