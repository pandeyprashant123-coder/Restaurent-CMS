"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GrLinkNext } from "react-icons/gr";
import Link from "next/link";
import ImageSlider from "./components/Home/ImageSlider";
import HighlightSection from "./components/Home/HighlightSection";
import TodaysTrends from "./components/Home/Trends";
import Bestreviewed from "./components/Home/BestReviewed";
import DineIn from "./components/Home/DineIn";
import HomeCuisine from "./components/Home/HomeCuisine";
import PopularRestaurent from "./components/Home/PopularRestaurent";
import PopularNearby from "./components/Home/PopularNearby";
import MiddleSection from "./components/Home/MiddleSection";
import NewonStack from "./components/Home/NutionStack";
import SpecialToday from "./components/Home/SpecialToday";
import AllRestaurants from "./components/Home/AllRestaurents";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import axios from "./axios";
const image1 = "assets/img/image1.jpg";
const image2 = "assets/img/image2.jpg";

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

export default function Home() {
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
  return (
    <>
      <div className="bg-[#f5f6f8] dark:bg-background ">
        <div className=" flex-col text-start space-y-10 bg-slate-100  pt-7 pb-5 rounded items-center justify-center dark:bg-slate-800">
          <div className="mx-28 text-[18px] font-bold dark:text-white">
            What's on Your Mind?
          </div>

          <div className="ml-32 flex gap-4 mt-0">
            {categories?.map((item, index) => (
              <div
                key={item._id}
                className="flex-shrink-0 flex flex-col items-center justify-center rounded-md p-0.5 transform transition-all duration-300 hover:bg-slate-200 cursor-pointer "
              >
                {/* Dynamic Background Color */}
                <div
                  className={`${imageData[index]} w-[90px] h-[90px]  outline outline-2 outline-slate-300 p-4 rounded-md overflow-hidden`}
                >
                  <img
                    src={item.cImage}
                    alt={item.cName}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125"
                  />
                </div>
                {/* Title */}
                <div className="text-black dark:text-white text-[14px] font-semibold my-4">
                  <h3>{item.cName}</h3>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-end p-4">
              <Link href="/categories">
                <div className="border-2 border-red-500 flex items-center p-2 rounded-full hover:cursor-pointer">
                  <GrLinkNext style={{ color: "red", stroke: "red" }} />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <ImageSlider />
        <HighlightSection />
        <TodaysTrends />
        <Bestreviewed />
        <DineIn />
        <HomeCuisine />
        {/* <Cuisine/> */}
        <PopularRestaurent />
        <PopularNearby />
        <MiddleSection />
        <NewonStack />
        <SpecialToday />
        <AllRestaurants />
      </div>
    </>
  );
}
