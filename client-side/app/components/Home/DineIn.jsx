import React from "react";
import { GrLinkNext } from "react-icons/gr";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";
const route = "assets/images/route.png";
const Dining = "assets/img/dining-table.png";

const DineIn = () => {
  const restaurants = [
    {
      name: "Hungry Puppets",
      rating: 4.7,
      distance: "100+ km",
      address: "House: 00, Road: 00, Test Area jnnk jhjhhkojutrdfghjk,mnbvc",
      logo: "https://via.placeholder.com/50", // Replace with the actual image/logo URL
    },
    {
      name: "Café Monarch",
      rating: 5.0,
      distance: "100+ km",
      address: "Ghatkopar - Mankhurd Link Road",
      logo: "https://via.placeholder.com/50", // Replace with the actual image/logo URL
    },
    {
      name: "Frying Nemo",
      rating: 0.0,
      distance: "100+ km",
      address: "House: 15, Road: 5, Aukland Area",
      logo: "https://via.placeholder.com/50", // Replace with the actual image/logo URL
    },
  ];

  return (
    <div className="mx-28 bg-[#f7e2d6] dark:bg-[#483424] rounded-md -py-8 pt-4 h-48">
      {/* <div className="flex flex-col  mb-4">
        <h2 className="text-lg font-semibold">Want to Dine In?</h2> */}

      {/* </div> */}
      <div className="flex flex-col px-auto">
        <h2 className="text-lg font-semibold mx-60 pb-4 dark:text-white">
          Want to Dine In?
        </h2>
        <div className="flex space-x-2 overflow-x-auto ">
          <img src={Dining} alt="" className="w-2/12 h-full px-8 -mt-8 mr-2" />
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex flex-row bg-white dark:bg-black rounded-lg p-2 h-fit"
            >
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="w-12 h-12 rounded-lg m-2"
              />
              <div className=" ">
                <h3 className="text-sm font-bold mb-2 dark:text-white">
                  {restaurant.name}
                </h3>
                <div className="relative max-w-40">
                  <p className="text-sm text-gray-600 mb-1 truncate dark:text-[#727579]">
                    {restaurant.address}
                  </p>
                </div>

                <div className="flex flex-row justify-start items-center font-bold text-sm">
                  <FaRegStar className="text-[#ff7a1a] text-lg mx-1 dark:text-white" />
                  {restaurant.rating}
                  <div className=" flex justify-center items-center dark:text-white">
                    <img
                      src={route}
                      alt=""
                      className="w-6 h-6 text-[#ff7a1a] ml-4"
                    />
                    {restaurant.distance}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className=" font-semibold flex items-center cursor-default dark:text-white">
            View All
            <div className="flex flex-shrink-0 items-center justify-end p-4">
              <Link href="/dine-in-restaurant">
                <div className="border-2 border-red-500 flex items-center p-2 rounded-full hover:cursor-pointer">
                  <GrLinkNext style={{ color: "red", stroke: "red" }} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DineIn;
