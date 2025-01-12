import React, { useState } from "react";
import { BsEyeFill, BsFiletypeCsv, BsPrinter } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LuBadgeDollarSign } from "react-icons/lu";
import {
  MdArrowBack,
  MdArrowForward,
  MdDeleteForever,
  MdFileDownload,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { RiDownloadLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const list = [
  {
    name: "100105",
    category: "31 May 2023 06:39 PM",
    customerInfo: "Munam ShahariEr Test\n+8*********",
    totalAmount: "$1,316.85",
    orderStatus: "Unpaid",
    deliveryStatus: "Pending Delivery",
  },
  {
    name: "100103",
    category: "31 May 2023 03:16 PM",
    customerInfo: "Munam ShahariEr Test\n+8*********",
    totalAmount: "$535.80",
    orderStatus: "Unpaid",
    deliveryStatus: "Pending Delivery",
  },
  {
    name: "100099",
    category: "30 May 2023 06:35 PM",
    customerInfo: "Fufh Cgchc\n+8*********",
    totalAmount: "$130.35",
    orderStatus: "Unpaid",
    deliveryStatus: "Pending Delivery",
  },
  {
    name: "100074",
    category: "26 Nov 2022 02:51 PM",
    customerInfo: "Jane Cooper\n+8*********",
    totalAmount: "$4,095.00",
    orderStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    name: "100053",
    category: "17 Oct 2021 03:56 PM",
    customerInfo: "Zubair Jamil\n+9*********",
    totalAmount: "$99.75",
    orderStatus: "Unpaid",
    deliveryStatus: "Accepted Delivery",
  },
];

// Define the type for each item in the table list
interface TableItem {
  name: string;
  category: string;
  unitPrice: number;
  totalAmount: number;
  orderStatus: string;
}

// Define the type for each column
interface TableColumn {
  key: keyof TableItem | "index" | "action";
  label: string;
  sortable: boolean;
}

interface TableProps {
  list: TableItem[];
}

const AllOrders = () => {
  const [showExport, setShowExport] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableItem | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });

  // Column configurations
  const columns: TableColumn[] = [
    { key: "index", label: "SI", sortable: true },
    { key: "name", label: "Order ID", sortable: true },
    { key: "category", label: "Order Date", sortable: true },
    { key: "unitPrice", label: "Customer Information", sortable: true },
    { key: "totalAmount", label: "Total Amount", sortable: true },
    { key: "orderStatus", label: "Order Status", sortable: true },
    { key: "action", label: "Action", sortable: false },
  ];

  // Sort the list based on the sortConfig
  const sortedList = React.useMemo(() => {
    if (!sortConfig.key) return list;

    return [...list].sort((a, b) => {
      const key = sortConfig.key as keyof TableItem;
      if (a[key] < b[key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [list, sortConfig]);

  const handleSort = (key: keyof TableItem) => {
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
        <p className="px-1 bg-gray-300 rounded-sm text-sm font-semibold">65</p>
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
        {/* tables */}
        <div className="my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() =>
                      column.sortable &&
                      handleSort(column.key as keyof TableItem)
                    }
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
              {sortedList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 duration-200">
                  <td className="pl-2 text-center">{index + 1}</td>
                  <td className="pl-2 text-center">
                    {" "}
                    <Link to="../order-management/order/view">{item.name}</Link>
                  </td>
                  <td className="pl-2 text-center">{item.category}</td>
                  <td className="pl-2 text-center">{item.unitPrice}</td>
                  <td className="pl-2 text-center">{item.totalAmount}</td>
                  <td className="pl-2 text-center">{item.orderStatus}</td>
                  <td className="text-center flex justify-center gap-2">
                    <button className="text-orange-400 p-2 my-5 border border-orange-300 hover:text-white hover:bg-orange-400 duration-150 rounded-md">
                      <BsEyeFill className="text-lg" />
                    </button>
                    <button className="text-blue-500 p-2 my-5 border border-blue-300 hover:text-white hover:bg-blue-600 duration-150 rounded-md">
                      <BsPrinter className="text-lg" />
                    </button>
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
