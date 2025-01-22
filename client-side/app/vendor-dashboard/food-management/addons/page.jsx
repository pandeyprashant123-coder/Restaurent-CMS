"use client";
import React, { useState, useEffect } from "react";

import { FiPlusCircle } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

import addonList from "../../../data/addon.json";

const Addons = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stockType: "",
    stock: "Unlimited Stock",
  });
  const [addons, setAddons] = useState(addonList);
  console.log(JSON.stringify(addons));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Set stock to "Unlimited Stock" only when stockType is explicitly "Unlimited Stock"
    if (formData.stockType === "Unlimited Stock") {
      setFormData((prevState) => ({
        ...prevState,
        stock: "Unlimited Stock",
      }));
    }
  }, [formData.stockType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddons((prevAddon) => [...prevAddon, formData]);
    setFormData({
      name: "",
      price: "",
      stockType: "",
      stock: "",
    });
  };
  const handleReset = () => {};
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center gap-2 p-6 font-bold text-xl">
        <FiPlusCircle />
        <h1>Add New Addons</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 mx-3">
            <div className="mr-auto flex flex-col gap-3 w-full p-6 bg-white shadow-sm rounded-lg">
              <div className="w-full flex gap-8">
                <div className="w-1/2 ">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Ex: 100"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
              </div>
              <div className="w-full flex gap-8">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Type
                  </label>
                  <select
                    name="stockType"
                    value={formData.stockType}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value=""> </option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Medium Stock">Medium Stock</option>
                    <option value="Unlimited Stock">Unlimited Stock</option>
                  </select>
                </div>
                {formData.stockType === "Limited Stock" ||
                formData.stockType === "Medium Stock" ? (
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Addon Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      placeholder="Ex: 100"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          stock: e.target.value, // Always update as a string
                        }))
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                    />
                  </div>
                ) : null}
              </div>
              <div>
                <div className="flex gap-3 w-full justify-end p-3">
                  <button
                    type="button"
                    className="bg-gray-300 py-1 font-semibold px-5 rounded-lg"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-700 text-white py-1 font-semibold px-5 rounded-lg "
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="m-3 flex flex-col gap-3 w-full bg-white shadow-sm rounded-lg">
          <div className="flex justify-between items-center p-6">
            <h1 className="text-gray-500 font-semibold">
              Addon List <span>1</span>
            </h1>
            <div>
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className=" bg-slate-200 border font-semibold">
                  <th className="text-left py-5 pl-5">SI</th>
                  <th className="text-left py-2 pl-5">Name</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Stock Type</th>
                  <th className="text-left py-2">Stock </th>
                  <th className="text-left py-2">Action </th>
                </tr>
              </thead>
              <tbody>
                {addons.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="pl-2">{index}</td>
                    <td className="pl-2">{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.stockType}</td>
                    <td>{item.stock}</td>
                    <td>
                      <button className="text-red-500 p-1 m-3 border border-red-300 rounded-md">
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
    </div>
  );
};

export default Addons;
