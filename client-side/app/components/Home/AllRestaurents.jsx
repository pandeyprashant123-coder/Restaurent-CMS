"use client";

import React, { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
// import { IoMdHeart } from "react-icons/io";

const AllRestaurants = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const restaurants = [
    {
      name: "Café Monarch",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 5.0,
      deliveryTime: "30-40 min",
      distance: "1516.86 km",
    },
    {
      name: "Frying Nemo",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.5,
      deliveryTime: "30-40 min",
      distance: "1675.42 km",
      openinginfo: "Closed Now (Open At 1:00pm)",
    },
    {
      name: "Hungry Puppets",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.7,
      deliveryTime: "30-40 min",
      distance: "283.21 km",
      openinginfo: "",
    },
    {
      name: "Mini Kebab",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.2,
      deliveryTime: "30-40 min",
      distance: "2305.80 km",
      openinginfo: "",
    },
    {
      name: "Redcliff Cafe",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.7,
      deliveryTime: "30-40 min",
      distance: "678.23 km",
      openinginfo: "",
    },
    {
      name: "Tasty Takeaways",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.5,
      deliveryTime: "30-40 min",
      distance: "811.94 km",
      openinginfo: "",
    },
    {
      name: "The Capital Grill",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.3,
      deliveryTime: "30-40 min",
      distance: "747.48 km",
      openinginfo: "",
    },
    {
      name: "The Great Impasta",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.9,
      deliveryTime: "30-40 min",
      distance: "2212.70 km",
      openinginfo: "Closed Now (Open At 1:00pm)",
    },
    {
      name: "The Great Impasta",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.9,
      deliveryTime: "30-40 min",
      distance: "2212.70 km",
      openinginfo: "Closed Now (Open At 1:00pm)",
    },
    {
      name: "The Great Impasta",
      image:
        "https://th.bing.com/th?id=OIP.v3nH91akfCmjWIyk5V0efgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      rating: 4.9,
      deliveryTime: "30-40 min",
      distance: "2212.70 km",
      openinginfo: "Closed Now (Open At 1:00pm)",
    },
  ];
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  return (
    <div className="mx-20 my-8 flex-col ">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[16px] font-bold dark:text-white ">
            All Restaurants
          </h2>
          <p className="text-[#989da3] mb-4 text-[14px]">
            14 Restaurants near you
          </p>
        </div>
        {/* Filter buttons */}
        <div className="flex space-x-2 text-[14px]">
          <button className="px-2 py-1 text-gray-500 rounded-md outline outline-2 outline-slate-300">
            Top Rated
          </button>
          <button className="px-2 py-1 text-gray-500 rounded-md outline outline-2 outline-slate-300">
            Discounted
          </button>
          <button className="px-2 py-1 text-gray-500 rounded-md outline outline-2 outline-slate-300">
            Veg
          </button>
          <button className="px-2 py-1 text-gray-500 rounded-md outline outline-2 outline-slate-300">
            Non-Veg
          </button>
          <button className="px-4 py-2 text-orange-500 rounded-md outline outline-2 outline-orange-300">
            <AiOutlineMenuFold />
          </button>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-4 gap-6  hover:cursor-pointer ">
        {restaurants.slice(0, visibleCount).map((restaurant, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-[#141313] shadow-md w-full rounded-md"
          >
            {/* Image */}
            <div className=" overflow-hidden rounded-lg">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-24 object-cover rounded-lg transform transition-transform duration-300 hover:scale-125"
              />
            </div>
            <div className="overflow-hidden absolute bottom-16 left-20 rounded-md outline outline-2 outline-slate-300">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-16 h-16 object-cover rounded-md transform transition-transform duration-300 hover:scale-125"
              />
            </div>

            <div className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8"
                fill="#bca88f"
                stroke="white"
                strokeWidth="20"
              >
                <path d="M256 448l-35.3-32.3C92.7 312 48 267.5 48 176c0-44.1 35.9-80 80-80 32.7 0 63.2 19.1 75.2 47.6h55.6c12-28.5 42.5-47.6 75.2-47.6 44.1 0 80 35.9 80 80 0 91.5-44.7 136-172.7 239.7L256 448z" />
              </svg>
            </div>

            <div className="absolute bottom-20 right-4 w-fit">
              <p className="text-[12px] font-semibold bg-white text-orange-500 rounded-lg px-2 pb-2">
                {restaurant.distance}
              </p>
            </div>

            {/* Badge */}
            {restaurant.openinginfo && (
              <div className="absolute top-2 left-2 flex bg-red-500 bg-opacity-40 w-80% text-white font-semibold text-[12px] px-2 py-2 rounded">
                <IoTimeOutline className="h-fit items-center py-1 mx-2" />
                {restaurant.openinginfo}
              </div>
            )}

            {/* Details */}
            <div className="mt-6">
              <h3 className="ml-10 font-bold text-[14px] items-center justify-center">
                {restaurant.name}
              </h3>
              <div className="flex justify-between mx-10 py-4">
                <div className="flex flex-row gap-x-1 items-center justify-center  text-orange-500 mt-1">
                  <IoIosStar />
                  <div className="flex text-white text-[10px] font-bold">
                    {restaurant.rating}
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <div className="items-center px-2">
                    <IoTimeOutline />
                  </div>
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < restaurants.length && (
        <div className="flex flex-col items-center justify-center mt-4">
          <button
            className="bg-orange-500 text-white p-2 rounded-lg"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllRestaurants;
