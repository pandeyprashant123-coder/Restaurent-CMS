"use client";
import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";

const confirmed = "/assets/img/dashboard-imgs/confirmed.png";
const cooking = "/assets/img/dashboard-imgs/cooking.png";
const delivary = "/assets/img/dashboard-imgs/ready.png";
const onWay = "/assets/img/dashboard-imgs/on-the-way.png";
const delivered = "/assets/img/dashboard-imgs/all.png";
const refunded = "/assets/img/dashboard-imgs/refunded.png";
const scheduled = "/assets/img/dashboard-imgs/scheduled.png";
const all = "/assets/img/dashboard-imgs/top-resturant.png";
import Link from "next/link";
import Image from "next/image";

const DashboardContent = () => {
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedTime, setSelectedTime] = useState("Overall");

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Commission Given",
        data: [298],
        backgroundColor: "#71e5fc",
      },
      {
        label: "Total Earning",
        data: [500],
        backgroundColor: "blue",
      },
    ],
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable default legend (use custom one)
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "$(USD)",
        },
        min: 0,
        max: 1000,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <LuLayoutDashboard />
          <h1>Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <h1>Follow up</h1>
          <MdOutlineRestaurant className="text-2xl" />
        </div>
      </div>
      <div className="gap-3 grid grid-cols-4 relative">
        {/* Order Statistics Section */}
        <div className=" border rounded-lg my-3 col-span-3">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="">
              <h2>
                Order statistics:
                <span className="selected-zone"> {selectedZone}</span>
              </h2>
            </div>
            <div>
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="rounded-md"
              >
                <option value="Overall">Overall Statistics</option>
                <option value="This year">This year</option>
                <option value="This month">This month</option>
                <option value="This week">This week</option>
                <option value="Today">Today</option>
              </select>
            </div>
          </div>
          {/* Card Section */}

          <div className="flex flex-col">
            <div className="flex gap-3 w-full p-5">
              <div className="flex flex-col p-5 gap-2 hover:shadow-md duration-150 cursor-pointer  bg-green-200 rounded-lg w-1/4">
                <div className="flex justify-end">
                  <Image
                    height={100}
                    width={100}
                    className=" h-7 w-7"
                    src={confirmed}
                    alt="confirmed"
                  />
                </div>
                <h3 className="font-bold text-green-800 text-xl">1</h3>
                <p className="font-semibold text-sm">Confirmed</p>
              </div>
              <div className="flex flex-col p-5 gap-2 hover:shadow-md duration-150 cursor-pointer  bg-red-50 rounded-lg w-1/4">
                <div className="flex justify-end">
                  <Image
                    height={100}
                    width={100}
                    className=" h-7 w-7"
                    src={cooking}
                    alt="confirmed"
                  />
                </div>
                <h3 className="font-bold text-green-800 text-xl">2</h3>
                <p className="font-semibold text-sm">Cooking</p>
              </div>
              <div className="flex flex-col p-5 gap-2 hover:shadow-md duration-150 cursor-pointer  bg-orange-100 rounded-lg w-1/4">
                <div className="flex justify-end">
                  <Image
                    height={100}
                    width={100}
                    className=" h-7 w-7"
                    src={delivary}
                    alt="confirmed"
                  />
                </div>
                <h3 className="font-bold text-green-800 text-xl">5</h3>
                <p className="font-semibold text-sm">Ready for Delivary</p>
              </div>
              <div className="flex flex-col p-5 gap-2 hover:shadow-md duration-150 cursor-pointer  bg-red-200 rounded-lg w-1/4">
                <div className="flex justify-end">
                  <Image
                    height={100}
                    width={100}
                    className=" h-7 w-7"
                    src={onWay}
                    alt="confirmed"
                  />
                </div>
                <h3 className="font-bold text-green-800 text-xl">10</h3>
                <p className="font-semibold text-sm">Food on the Way</p>
              </div>
            </div>
            <div className="flex p-5 gap-3">
              <div className="flex gap-2 items-center justify-center  bg-gray-100 rounded-lg px-2 py-5 w-1/4 hover:shadow-md cursor-pointer">
                <Image
                  height={100}
                  width={100}
                  className="h-5 w-5
                "
                  src={delivered}
                  alt="burger"
                />
                <p className="font-semibold">Delivered</p>
                <h3 className="text-xl font-semibold text-orange-500">23</h3>
              </div>
              <div className="flex gap-2 items-center justify-center  bg-gray-100 rounded-lg px-2 py-5 w-1/4 hover:shadow-md cursor-pointer">
                <Image
                  height={100}
                  width={100}
                  className="h-5 w-5
                "
                  src={refunded}
                  alt="burger"
                />
                <p className="font-semibold">Refunded</p>
                <h3 className="text-xl font-semibold text-orange-500">23</h3>
              </div>
              <div className="flex gap-2 items-center justify-center  bg-gray-100 rounded-lg px-2 py-5 w-1/4 hover:shadow-md cursor-pointer">
                <Image
                  height={100}
                  width={100}
                  className="h-5 w-5
                "
                  src={scheduled}
                  alt="burger"
                />
                <p className="font-semibold">Scheduled</p>
                <h3 className="text-xl font-semibold text-orange-500">23</h3>
              </div>
              <div className="flex gap-2 items-center justify-center  bg-gray-100 rounded-lg px-2 py-5 w-1/4 hover:shadow-md cursor-pointer">
                <Image
                  height={100}
                  width={100}
                  className="h-5 w-5
                "
                  src={all}
                  alt="burger"
                />
                <p className="font-semibold">All</p>
                <h3 className="text-xl font-semibold text-orange-500">23</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="advertise relative overflow-hidden px-3 my-3 py-8  flex flex-col items-center justify-evenly gap-2 bg-[#4153b30d] rounded-md shadow">
          <Image
            height={100}
            width={100}
            src="/assets/img/ad-default.png"
            alt=""
          />
          <div>
            <h1 className=" font-semibold">Want to get highlighted?</h1>
            <p className="text-center text-xs text-gray-500">
              Create ads to get highlighted on the app and web browser
            </p>
          </div>
          <Link href="new-advertisement" className="btnBlue p-2">
            Create Ads
          </Link>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bar-diagram border">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <FaChartSimple />
            <h1>Yearly Statistics</h1>
          </div>
          <div className="flex gap-3">
            <p className="admin-dot">Commission:$ 182.00</p>
            <p className="sell-dot">Total Earning:$23.99</p>
          </div>
        </div>

        <Bar id="bar-diagram-image" data={barData} options={barOptions} />
      </div>

      <div className="w-full flex">
        {/* Left Subsection: Top Rated Foods */}
        <div className="food-subsection top-selling w-1/2 ">
          <div className="subsection-header">
            <h2>
              <span>📈</span> Top Selling Foods
            </h2>
          </div>
          <div className="food-cards">
            <div className="food-card w-1/3">
              <div className="top-food-details">
                <div className="image-container">
                  <Image
                    height={100}
                    width={100}
                    src="/assets/img/pasta.png"
                    alt="Top Food"
                  />
                  <button className="top-button">Sold: 800</button>
                </div>
                <h3>Pasta</h3>
              </div>
            </div>
          </div>
        </div>
        {/* Right Subsection: Top Selling Foods */}
        <div className="food-subsection top-rated">
          <div className="subsection-header">
            <h2>
              <Image
                height={100}
                width={100}
                className="toprated-image"
                src="/assets/img/user.png"
                alt="Food"
              />{" "}
              Top Rated Foods
            </h2>
          </div>
          <div className="food-cards">
            <div className="food-card">
              <Image
                height={100}
                width={100}
                src="/assets/img/pizza.png"
                alt="Top Food"
              />
              <div className="food-details">
                <h3>Pizza</h3>
                <p>
                  ⭐ <span className="rating-number">4.8</span>
                  <span className="review-number">(390 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <Image
                height={100}
                width={100}
                src="/assets/img/Hamburger-pana.png"
                alt="Top Food"
              />
              <div className="food-details">
                <h3>Burger</h3>
                <p>
                  ⭐ <span className="rating-number">4.7</span>
                  <span className="review-number">(350 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <Image
                height={100}
                width={100}
                src="/assets/img/brownie.png"
                alt="Top Food"
              />
              <div className="food-details">
                <h3> BROWNIE</h3>
                <p>
                  ⭐ <span className="rating-number">4.5</span>
                  <span className="review-number">(370 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <Image
                height={100}
                width={100}
                src="/assets/img/noodles.png"
                alt="Top Food"
              />
              <div className="food-details">
                <h3>Veggie noodles</h3>
                <p>
                  ⭐ <span className="rating-number">4.7</span>
                  <span className="review-number">(300 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <Image
                height={100}
                width={100}
                src="/assets/img/momos.png"
                alt="Top Food"
              />
              <div className="food-details">
                <h3>Veg Momos</h3>
                <p>
                  ⭐ <span className="rating-number">4.2</span>
                  <span className="review-number">(340 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <Image
                height={100}
                width={100}
                src="/assets/img/pie.png"
                alt="Top Food"
              />
              <div className="food-details">
                <h3>Toll House Pie</h3>
                <p>
                  ⭐ <span className="rating-number">5</span>{" "}
                  <span className="review-number">(350 reviews)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
