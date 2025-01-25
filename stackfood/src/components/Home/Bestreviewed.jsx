import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoMdHeart } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import BestReviewed from "../popup/Trendspopup";

import trendsData from "../data/addedFood.json";

const Bestreviewed = () => {
  const [popup, setPopup] = useState(false);
  const [foodId, setfoodId] = useState(1);

  return (
    <div className="py-2 mx-28 dark:bg-background">
      {popup && (
        <BestReviewed
          popup={popup}
          setPopup={setPopup}
          foodId={foodId}
          cartButton={true}
        />
      )}
      <div className="flex justify-between items-center">
        <h2 className="flex flex-shrink-0 text-[18px] font-bold text-black mb-1 dark:text-white">
          Best Reviewed Food
        </h2>
        <div className="flex flex-shrink-0 items-center justify-end p-4">
          <Link to="/categories">
            <div className="border-2 border-red-500 flex items-center p-2 rounded-full hover:cursor-pointer">
              <GrLinkNext style={{ color: "red", stroke: "red" }} />
            </div>
          </Link>
        </div>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={5.6}
        centeredSlides={false}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="mb-10"
      >
        {trendsData.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center"
            onClick={() => {
              setPopup(true);
              setfoodId(item.id);
            }}
          >
            <div className="p-1 relative w-11/12 h-72 bg-white dark:bg-black max-w-xs overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:bg-red-50 ">
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
                  {item.hotelName}
                </p>
                <div className="flex relative items-center space-x-2">
                  <h3 className="w-3/4 text-base font-semibold text-gray-800 dark:text-white truncate max-w-xs">
                    {item.name}
                  </h3>
                  <FaCircle
                    className={`text-[10px] items-end ${
                      item.foodType === "Veg"
                        ? "text-green-500 outline outline-green outline-2 p-0.5"
                        : "text-red-500 outline outline-red outline-2 p-0.5"
                    }`}
                  />
                </div>
                <div className=" flex items-center text-sm text-black ">
                  <span className="text-black px-2 py-1 rounded-full">
                    {item.rating}⭐<span className=" ml-1">(3)</span>
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-sm line-through text-gray-400">
                    ${item.oldPrice}
                  </span>
                  <span className="text-lg font-semibold dark:text-white">
                    ${item.unitPrice}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Bestreviewed;
