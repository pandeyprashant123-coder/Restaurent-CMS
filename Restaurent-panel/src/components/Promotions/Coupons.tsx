import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";
import { FaCirclePlus, FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";

interface CouponFormData {
  title: string;
  couponType: string;
  code: string;
  limitPerUser: number | string;
  startDate: string;
  expireDate: string;
  discountType: string;
  discount: number | string;
  maxDiscount: number | string;
  minPurchase: number | string;
}

const Coupons: React.FC = () => {
  const [formData, setFormData] = useState<CouponFormData>({
    title: "",
    couponType: "Default",
    code: "N2ii6CHI",
    limitPerUser: "",
    startDate: "",
    expireDate: "",
    discountType: "Amount ($)",
    discount: "",
    maxDiscount: 0,
    minPurchase: 0,
  });
  const [couponList, setCouponList] = useState<CouponFormData[]>([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      title: "New coupon",
      couponType: "Default",
      code: "N2ii6CHI",
      limitPerUser: "",
      startDate: "",
      expireDate: "",
      discountType: "Amount ($)",
      discount: "",
      maxDiscount: 0,
      minPurchase: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponList((prev) => [...prev, formData]);
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 p-6 font-bold text-xl">
        <FiPlusCircle />
        <h1>Add New Coupon</h1>
      </div>
      <form
        className="p-6 bg-white shadow-md rounded-lg border mx-6"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Title (Default)
            </label>
            <input
              type="text"
              name="title"
              placeholder="New copuon"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
            />
          </div>

          {/* Coupon Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Coupon Type
            </label>
            <select
              name="couponType"
              value={formData.couponType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Default">Default</option>
              <option value="Percentage">Percentage</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Limit Per User */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Limit For Same User
            </label>
            <input
              type="number"
              name="limitPerUser"
              value={formData.limitPerUser}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Ex: 10"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Expire Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expire Date
            </label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Type
            </label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Amount">Amount ($)</option>
              <option value="Percentage">Percentage (%)</option>
            </select>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Max Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Discount
            </label>
            <input
              type="number"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Min Purchase */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Purchase
            </label>
            <input
              type="number"
              name="minPurchase"
              value={formData.minPurchase}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="m-6 border rounded-sm">
        {/* search and categories */}
        <div className="p-3 flex justify-between">
          <div className="flex gap-2 items-center text-lg font-semibold">
            <h1>Coupons List</h1>
            <h1 className="font-normal text-sm px-1 ml-4 rounded-md bg-gray-300">
              1
            </h1>
          </div>
          <div className="flex items-center border rounded-md bg-white">
            <h1></h1>
            <input
              type="search"
              placeholder="Ex : Search by ads id"
              className="m-2 text-sm text-gray-700"
            />
            <IoSearchOutline className="bg-slate-300 p-3 h-10 w-10 text-white rounded-e-md cursor-pointer hover:bg-gray-400" />
          </div>
        </div>
        <div className="mb-4 overflow-x-scroll">
          <table className="w-full text-sm relative">
            <thead>
              <tr className=" bg-slate-100 ">
                <th className="pl-5 text-left  font-semibold text-base">SI</th>
                <th className="text-left py-2 pl-5  font-semibold text-base">
                  Title
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Code
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Type
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Total Uses
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Min purchase
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Max discount
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Discount
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Discount type
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Start date
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Expire date
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Status
                </th>
                <th className="text-left py-2  font-semibold text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {couponList.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="pl-5 text-left">{index}</td>
                  <td className="pl-5 text-left">{item.title}</td>
                  <td className="pl-2 text-left py-5">{item.code}</td>
                  <td className="pl-2 text-left py-5">{item.couponType}</td>
                  <td className="pl-2 text-left py-5">{}</td>
                  <td className="pl-2 text-left py-5">$ {item.minPurchase}</td>
                  <td className="pl-2 text-left py-5">$ {item.maxDiscount}</td>
                  <td className="pl-2 text-left py-5">{item.discount}</td>
                  <td className="pl-2 text-left py-5">{item.discountType}</td>
                  <td className="pl-2 text-left py-5">{item.startDate}</td>
                  <td className="pl-2 text-left py-5">{item.expireDate}</td>
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

export default Coupons;
