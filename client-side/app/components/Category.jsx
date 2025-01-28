"use client";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import Link from "next/link";
const image1 = "/assets/img/image1.jpg";
const image2 = "/assets/img/image2.jpg";

const imageData = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-orange-500",
];

const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(categories);
  // const handleCategoryClick =async()=>{
  //   try {
  //     const res =
  //   } catch (error) {

  //   }
  // }
  return (
    <div>
      <div className="p-4 py-6 bg-red-50 dark:bg-[#3d2f25] dark:text-white text-black font-sans font-semibold text-[14px] text-center justify-center">
        Categories
      </div>
      <div className=" bg-slate-100 dark:bg-[#272727] ">
        <div className="mx-28 flex flex-wrap">
          {categories?.map((item, index) => (
            <Link
              href={`/categories/category?category=${item.cName}`}
              key={item._id}
              className="h-[180px] w-[180px] flex-shrink-0 flex flex-col items-center justify-center p-8 mx-1.5 my-2 rounded-lg shadow outline-[#323232] bg-white dark:bg-[#141313] dark:hover:bg-[#272727] hover:bg-red-50 hover:cursor-pointer transition-colors duration-300"
            >
              {/* Dynamic Background Color */}
              <div
                className={`${imageData[index]} w-[55px] h-[55px] p-2 rounded-md overflow-hidden`}
              >
                <img
                  src={item.cImage}
                  alt={`Food ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              {/* Title */}
              <div className="text-black dark:text-white text-[12px] font-bold mt-2">
                <h3>{item.cName}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
