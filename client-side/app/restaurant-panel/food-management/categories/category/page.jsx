import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import axios from "../../../../axios";

const Category = async () => {
  const res = await axios.get("/categories");

  const list = res.data.data;
  console.log(list);
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex gap-2 items-center text-xl">
        <LuListFilter />
        <h1>Category List</h1>
        <h1 className="font-normal text-sm px-1 ml-4 rounded-md bg-gray-300">
          3
        </h1>
      </div>
      <div className="m-6 border rounded-sm">
        {/* search and categories */}
        <div className="p-3 flex gap-3 justify-end">
          <div className="flex items-center border rounded-md  bg-white">
            <input
              type="search"
              placeholder=""
              className="m-2 text-sm text-gray-700"
            />
            <IoSearchOutline className="bg-slate-300 m-0 p-3 h-10 w-10 text-white rounded-e-md cursor-pointer hover:bg-gray-400" />
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
                  Image
                </th>
                <th className="text-center py-2 pl-5  font-semibold text-base">
                  Category ID
                </th>
                <th className="text-center py-2 pl-5  font-semibold text-base">
                  Category Name
                </th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="pl-2 text-center">{index}</td>
                  <td className="p-2 text-center flex items-center justify-center">
                    <img src={item.cImage} alt="" className="h-14 w-14" />
                  </td>
                  <td className="pl-2 text-center ">
                    {item._id.slice(5, 7).toUpperCase()}
                  </td>
                  <td className="pl-2 text-center text-blue-500 text-base ">
                    <h1>{item.cName}</h1>
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

export default Category;
