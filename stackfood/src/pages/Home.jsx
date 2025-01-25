import React from "react";
import { Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import ImageSlider from "../components/common/ImageSlider";
import Hightlight from "../components/common/Hightlight";
import Trends from "../components/common/Trends";
import Bestreviewed from "../components/Home/Bestreviewed";
import DineIn from "../components/Home/DineIn";
import HomeCuisine from "../components/Home/HomeCuisine";
import PopularRestaurent from "../components/Home/PopularRestaurent";
import PopularNearby from "../components/Home/PopularNearby";
import MiddleSection from "../components/Home/MiddleSection";
import NewonStack from "../components/Home/NewonStack";
import SpecialToday from "../components/Home/SpecialToday";
import AllRestaurants from "../components/Home/AllRestaurants";

import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";

const imageData = [
  { src: image1, bgColor: "bg-red-500" },
  { src: image2, bgColor: "bg-blue-500" },
  { src: image1, bgColor: "bg-green-500" },
  { src: image2, bgColor: "bg-yellow-500" },
  { src: image1, bgColor: "bg-purple-500" },
  { src: image2, bgColor: "bg-pink-500" },
  { src: image1, bgColor: "bg-gray-500" },
  { src: image2, bgColor: "bg-orange-500" },
  { src: image2, bgColor: "bg-orange-500" },
];

function Home() {
  return (
    <div className="bg-[#f5f6f8] dark:bg-background ">
      {/* Section 1 - Gallery */}
      <div className=" flex-col text-start mt-16 space-y-10 bg-slate-100  py-10 rounded items-center justify-center dark:bg-slate-800">
        <div className="mx-28 text-[18px] font-bold dark:text-white">
          What's on Your Mind?
        </div>

        {/* Scrollable Container */}
        <div className="ml-28 flex gap-4 overflow-x-auto scrollbar-hide  mt-4">
          {imageData.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-md p-0.5 transform transition-transform duration-300 hover:bg-slate-200 "
            >
              {/* Dynamic Background Color */}
              <div
                className={`${item.bgColor} w-[90px] h-[90px]  outline outline-2 outline-slate-300 p-4 rounded-md overflow-hidden`}
              >
                <img
                  src={item.src}
                  alt={`Food ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125"
                />
              </div>
              {/* Title */}
              <div className="text-black text-[14px] font-semibold my-4">
                <h3>{`Food ${index + 1}`}</h3>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-end p-4">
            <Link to="/categories">
              <div className="border-2 border-red-500 flex items-center p-2 rounded-full hover:cursor-pointer">
                <GrLinkNext style={{ color: "red", stroke: "red" }} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <ImageSlider />
      <Hightlight />
      <Trends />
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
  );
}

export default Home;
