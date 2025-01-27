"use client";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { IoMdHeart } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
const trendsData = [
  {
    id: 1,
    title: "Pizza carnival",
    price: 540,
    oldPrice: 600,
    discount: "10% OFF",
    rating: "4.9",
    image:
      "https://www.shutterstock.com/image-photo/table-filled-dishes-food-set-260nw-2477073165.jpg", // Replace with actual image URL
    restaurant: "Cheesy Restaurant",
    type: "veg",
  },
  {
    id: 2,
    title: "Cheese cake",
    price: 140,
    oldPrice: 200,
    discount: "10% OFF",
    rating: "4.9",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Mini Kebab",
    type: "veg",
  },
  {
    id: 3,
    title: "Beef Cheese Burger",
    price: 540,
    oldPrice: 600,
    discount: "10% OFF",
    rating: "4.9",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Cheese Burger",
    type: "non-veg",
  },
  {
    id: 4,
    title: "Cappuccino Coffee",
    price: 40,
    oldPrice: 60,
    discount: "$10 OFF",
    rating: "4.7",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Hungry Puppets",
    type: "non-veg",
  },
  {
    id: 5,
    title: "Cheese Burger",
    price: 120,
    oldPrice: 150,
    discount: "20% OFF",
    rating: "4.8",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Hungry Puppets",
    type: "veg",
  },
  {
    id: 6,
    title: "Spicy Crab",
    price: 290,
    oldPrice: 400,
    discount: "$110 OFF",
    rating: "4.2",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Hungry Puppets",
    type: "non-veg",
  },
];
const PopularNearby = () => {
  const [popup, setPopup] = useState("false");
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardClass = (index) => {
    if (index === activeIndex) {
      return "w-[210px] h-[300px]  z-20 transform scale-100 transition-all duration-[800ms] [cubic-bezier(0.4, 0, 0.2, 1)] overflow-hidden";
    } else if (index === activeIndex - 1 || index === activeIndex + 1) {
      return " z-10 transform scale-95 transition-all duration-[800ms] [cubic-bezier(0.4, 0, 0.2, 1)] overflow-hidden";
    } else {
      return " z-0 transform scale-90 transition-all duration-[800ms] [cubic-bezier(0.4, 0, 0.2, 1)] overflow-hidden";
    }
  };

  return (
    <div className=" mx-20 h-96 bg-gray-100 scale-105">
      <h2 className="text-center text-2xl font-semibold mb-6 ">
        Popular Foods Nearby
      </h2>
      <div className=" w-full px-20">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={5}
          centeredSlides={true}
          loop={true} // Enable infinite loop
          loopedslides={trendsData.length} // Set number of duplicated slides
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="mySwiper"
        >
          {trendsData.map((item, index) => (
            <SwiperSlide
              key={item.id}
              className="flex justify-center items-center"
            >
              <div
                className={`transition-all duration-500 bg-white rounded-lg shadow-md overflow-hidden transform ${getCardClass(
                  index
                )}`}
              >
                <div
                  className="p-1 relative h-72 dark:bg-black max-w-xs overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 "
                  onClick={() => setPopup((prevPopup) => !popup)}
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
                      alt={item.title}
                      className="w-full h-40 rounded-md object-cover transform transition-transform duration-300 hover:scale-125 z-0"
                    />
                    <FaPlus className="absolute bottom-2 right-4 text-red-400 bg-white rounded-full p-1 text-[20px]" />
                  </div>

                  <div className="p-2">
                    <p className="text-sm font-normal text-gray-400">
                      {item.restaurant}
                    </p>
                    <div className="flex relative items-center space-x-2">
                      <h3 className="w-3/4 text-base font-semibold text-gray-800 dark:text-white truncate max-w-xs">
                        {item.title}
                      </h3>
                      <FaCircle
                        className={`text-[10px] items-end ${
                          item.type === "veg"
                            ? "text-green-500 outline outline-green outline-2 p-0.5"
                            : "text-red-500 outline outline-red outline-2 p-0.5"
                        }`}
                      />
                    </div>
                    <div>
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
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularNearby;
