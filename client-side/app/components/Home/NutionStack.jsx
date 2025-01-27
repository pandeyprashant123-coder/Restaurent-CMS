"use client";
import React from "react";
import { GoArrowRight } from "react-icons/go";

const NewonStack = () => {
  const items = [
    {
      name: "Mini Kebab",
      distance: "100+ km",
      items: "8 + Item",
      image:
        "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
      name: "Redcliff Cafe",
      distance: "100+ km",
      items: "16 + Item",
      image:
        "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
      name: "Tasty Takeaways",
      distance: "100+ km",
      items: "12 + Item",
      image:
        "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
      name: "The Capital Grill",
      distance: "100+ km",
      items: "8 + Item",
      image:
        "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
      name: "Vintage Kitchen",
      distance: "100+ km",
      items: "9 + Item",
      image:
        "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
      name: "The Great Impasta",
      distance: "100+ km",
      items: "8 + Item",
      image:
        "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
  ];

  return (
    <div className="mx-20 flex-col bg-mild dark:bg-[#3d2f25] p-4 rounded-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[16px] mx-auto dark:text-white">
          New On StackFood
        </h2>
        <GoArrowRight
          className="text-red-300 bg-white dark:bg-black text-3xl font-thin
         rounded-full cursor-pointer"
        />
      </div>

      {/* Items Grid */}
      <div className="relative grid grid-cols-3 gap-4 mt-6 p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative p-4 bg-white dark:bg-black rounded-lg shadow-md flex items-center justify-between transform transition-transform duration-300 hover:bg-red-50 cursor-pointer "
          >
            {/* Image */}
            <div className="rounded-md overflow-hidden outline outline-2 outline-mild dark:outline-[#432814] ">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-sm object-cover transform transition-transform duration-300 hover:scale-125 cursor-pointer"
              />
            </div>

            {/* Details */}
            <div className="ml-4 flex-1 space-y-4">
              <h3 className="font-semibold text-[14px] text-black dark:text-white">
                {item.name}
              </h3>
              <div className="flex space-x-4">
                <p className="text-gray-500 text-[12px]">{item.distance}</p>
                <p className="text-gray-500 text-[12px]">{item.items}</p>
              </div>
            </div>
            {/* Like Icon */}
            <div className="absolute top-2 right-2 text-red-500 text-xl">
              ❤️
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewonStack;
