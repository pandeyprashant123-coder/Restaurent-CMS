"use client";
import React, { useEffect, useState } from "react";
import { BsEyeFill, BsFiletypeCsv, BsPrinter } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdFileDownload, MdKeyboardArrowDown } from "react-icons/md";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { format } from "date-fns";

import Link from "next/link";

const AllOrders = ({ orders, restroName }) => {
  const [showExport, setShowExport] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  //   const [allOrders, setAllOrders] = useState([]);

  const columns = [
    { key: "index", label: "SI", sortable: true },
    { key: "name", label: "Order ID", sortable: true },
    { key: "category", label: "Order Date", sortable: true },
    { key: "unitPrice", label: "Customer Information", sortable: true },
    { key: "totalAmount", label: "Total Amount", sortable: true },
    { key: "orderStatus", label: "Order Status", sortable: true },
    { key: "action", label: "Action", sortable: false },
  ];

  //   const sortedList = React.useMemo(() => {
  //     if (!sortConfig.key) return allOrders;

  //     return [...allOrders].sort((a, b) => {
  //       const key = sortConfig.key;
  //       if (a[key] < b[key]) {
  //         return sortConfig.direction === "ascending" ? -1 : 1;
  //       }
  //       if (a[key] > b[key]) {
  //         return sortConfig.direction === "ascending" ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevState) => {
      if (prevState.key === key && prevState.direction === "ascending") {
        return { key, direction: "descending" };
      }
      return { key, direction: "ascending" };
    });
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 p-3 ">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <LuBadgeDollarSign />
        <h1>All Orders</h1>
        <p className="px-1 bg-gray-300 rounded-sm text-sm font-semibold">
          {orders?.length}
        </p>
      </div>
      <div className="m-6 shadow-sm rounded-md bg-white">
        <div className="p-3 flex gap-4 justify-end relative border-b">
          <div className="flex items-center border rounded-md bg-white">
            <input
              type="search"
              placeholder="Ex : Search food Name"
              className="text-sm text-gray-700 border-none"
            />
            <IoSearchOutline className="bg-slate-300 p-3 h-10 w-10 text-white rounded-e-md cursor-pointer hover:bg-gray-400" />
          </div>
          <div
            className="flex gap-2 items-center border rounded-md p-2 text-gray-500 hover:text-blue-600 hover:shadow-md cursor-pointer"
            onClick={() => setShowExport((prev) => !prev)}
          >
            <MdFileDownload />
            <h1 className="">Export</h1>
            <MdKeyboardArrowDown />
          </div>
          <div
            className={`flex flex-col gap-3 p-3 bg-white rounded-md shadow absolute top-16 overflow-hidden duration-200 ${
              showExport ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <h1 className="text-gray-500 font-semibold">Download Options</h1>
            <div className="flex items-center gap-2">
              <PiMicrosoftExcelLogo />
              <h1>Excel</h1>
            </div>
            <div className="flex items-center gap-2">
              <BsFiletypeCsv />
              <h1>CSV</h1>
            </div>
          </div>
        </div>
        <div className="my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => column.sortable && handleSort(column.key)}
                    className={`py-2 text-center font-semibold text-base ${
                      column.sortable ? "cursor-pointer " : ""
                    }`}
                  >
                    {column.label}
                    {column.sortable && sortConfig.key === column.key && (
                      <span className="ml-2 text-xs">
                        {sortConfig.direction === "ascending" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* name: "100105",
    category: "31 May 2023 06:39 PM",
    customerInfo: "Munam ShahariEr Test\n+8*********",
    totalAmount: "$1,316.85",
    orderStatus: "Unpaid",
    deliveryStatus: "Pending Delivery", */}
              {orders?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 duration-200">
                  <td className="pl-2 text-center">{index + 1}</td>
                  <td className="pl-2 text-center">
                    {" "}
                    {restroName ? (
                      <Link href={`orders/view-order?id=${item._id}`}>
                        {item.id.slice(0, 6).toUpperCase()}
                      </Link>
                    ) : (
                      <p> {item.id.slice(0, 6).toUpperCase()}</p>
                    )}
                  </td>
                  <td className="pl-2 text-center">
                    {format(new Date(item.updatedAt), "PPpp")}
                  </td>
                  <td className="pl-2 text-left font-semibold">
                    <p>{item.user.email}</p>
                    <p>{item.user.mobile}</p>
                  </td>
                  <td className="pr-4 text-right">
                    ${item.totalAmount}
                    <br />
                    <p className="text-green-400 font-bold">
                      {item.paymentStatus}
                    </p>
                  </td>
                  <td className="pl-2 text-center flex flex-col items-center justify-center mt-3">
                    <p
                      className={`font-semibold text-blue-500 bg-blue-50 py-1 w-20 rounded-md ${
                        item.status === "Delivered" &&
                        "text-green-500 bg-green-50"
                      } ${
                        item.status === ("Handover" || "Cancelled") &&
                        "text-red-500 bg-red-50"
                      } `}
                    >
                      {item.status}
                    </p>
                    <p className="text-base text-gray-600">
                      {item.delivaryOption}
                    </p>
                  </td>
                  <td className="text-center ">
                    <div className="flex justify-center gap-2">
                      {restroName ? (
                        <Link
                          href={`orders/view-order?id=${item._id}`}
                          className="text-orange-400 p-2 my-5 border border-orange-300 hover:text-white hover:bg-orange-400 duration-150 rounded-md"
                        >
                          <BsEyeFill className="text-lg" />
                        </Link>
                      ) : (
                        ""
                      )}
                      <button className="text-blue-500 p-2 my-5 border border-blue-300 hover:text-white hover:bg-blue-600 duration-150 rounded-md">
                        <BsPrinter className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-3 items-center border-t p-6">
            <IoIosArrowBack className="p-2 rounded-md duration-100 hover:bg-blue-100 text-3xl cursor-pointer" />
            <h1 className="px-3 py-1 rounded-md duration-100 cursor-pointer bg-blue-600 text-white">
              1
            </h1>
            <h1 className="px-3 py-1 rounded-md duration-100 hover:bg-blue-100 cursor-pointer">
              2
            </h1>
            <h1 className="px-3 py-1 rounded-md duration-100 hover:bg-blue-100 cursor-pointer">
              3
            </h1>
            <IoIosArrowForward className="p-2 rounded-md duration-100 hover:bg-blue-100 text-3xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
