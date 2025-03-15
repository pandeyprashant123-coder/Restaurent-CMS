"use client";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Bestreviewed from "../../components/Home/BestReviewed";
import { IoMdHeart } from "react-icons/io";
import { FaCircle, FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import FoodForm from "../../components/FoodForm";

// TODO:# #12 Implement SWR or react query

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function page() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [showForm, setShowForm] = useState(false);
  const [foodId, setfoodId] = useState("");
  const { data } = useSWR(
    `${process.env.API_BASE_URL}/foods/categories/${category}`,
    fetcher
  );
  const foods = data;
  return (
    <>
      {showForm && (
        <FoodForm
          setShowForm={setShowForm}
          showForm={showForm}
          foodId={foodId}
          foods={foods}
        />
      )}
      <ToastContainer />
      <div className="flex items-center justify-start flex-wrap gap-3 p-10 bg-gray-50">
        {foods?.map((item, index) => (
          <div key={index} className="flex justify-center w-1/5">
            <div
              className="p-1 relative w-11/12 h-72 bg-white dark:bg-black max-w-xs overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:bg-red-50 "
              onClick={() => {
                setShowForm(true);
                setfoodId(item._id);
              }}
            >
              <span className="absolute top-2 left-0 bg-white text-black text-xs font-bold py-1 px-2 rounded-full z-10">
                {item.discount}
              </span>
              <span className="absolute top-2 right-2 text-[#f0cda2] text-2xl font-bold z-10">
                <IoMdHeart className="relative text-[#f0cda2] outline-heart" />
                <IoMdHeart className="absolute top-0 left-0 text-[#ffffff]  -z-10 scale-[1.15]" />
              </span>
              <div className=" relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 rounded-md object-cover transform transition-transform duration-300 hover:scale-125 z-0"
                />
                <FaPlus className="absolute bottom-2 right-4 text-red-400 bg-white rounded-full p-1 text-[20px]" />
              </div>

              <div className="p-2">
                <p className="text-sm font-normal text-gray-400">
                  {/* {item.restaurant} */}
                </p>
                <div className="flex relative items-center space-x-2">
                  <h3 className="w-3/4 text-base font-semibold text-gray-800 dark:text-white truncate max-w-xs">
                    {item.name}
                  </h3>
                  <FaCircle
                    className={`text-[10px] items-end ${
                      item.type === "veg"
                        ? "text-green-500 outline outline-green outline-2 p-0.5"
                        : "text-red-500 outline outline-red outline-2 p-0.5"
                    }`}
                  />
                </div>
                <div className=" flex items-center text-sm text-black ">
                  <span className="text-black px-2 py-1 rounded-full">
                    2⭐<span className=" ml-1">(3)</span>
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm line-through text-gray-400">
                    ${item.unitPrice}
                  </span>
                  <span className="text-lg font-semibold dark:text-white">
                    ${item.unitPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default page;
