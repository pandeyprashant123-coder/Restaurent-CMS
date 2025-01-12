import React from "react";
import Piechart from "../components/Piechart";

import { SiGoogleanalytics } from "react-icons/si";
import { IoPeopleOutline } from "react-icons/io5";
import { RiRestaurantLine } from "react-icons/ri";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiPassExpiredLine } from "react-icons/ri";
import SubscriberLineChart from "./LineChart";

const DashboardContent = () => {
  const subscriberCounts = [10, 25, 50, 75, 100]; // Example data points
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  return (
    <div className="w-full">
      <div className="flex p-3 flex-col ">
        <h1 className="text-2xl font-bold">Welcome, admin.</h1>
        <p>Welcome admin here is your business status</p>
      </div>
      <div className="mx-3 px-5 py-9 shadow-sm border border-gray-300 rounded-lg ">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <SiGoogleanalytics />
            <h1>Business Analytics</h1>
          </div>
        </div>
        <div className="flex w-full justify-between gap-3 my-4">
          <div className="flex flex-col w-1/4 shadow-sm border border-gray-300 rounded-lg p-3">
            <IoPeopleOutline className="ml-auto text-2xl" />
            <p>Total Subscribers</p>
            <h1 className="text-3xl">20</h1>
          </div>
          <div className="flex flex-col w-1/4 shadow-sm border border-gray-300 rounded-lg p-3">
            <RiRestaurantLine className="ml-auto text-2xl" />
            <p>Total Hotel </p>
            <h1 className="text-3xl">20</h1>
          </div>
          <div className="flex flex-col w-1/4 shadow-sm border border-gray-300 rounded-lg p-3">
            <FaMoneyCheckAlt className="ml-auto text-2xl" />
            <p>Total Earnings</p>
            <h1 className="text-3xl">20</h1>
          </div>
          <div className="flex flex-col w-1/4 shadow-sm border border-gray-300 rounded-lg p-3">
            <RiPassExpiredLine className="ml-auto text-2xl" />
            <p>Expiring Subscribers</p>
            <h1 className="text-3xl">20</h1>
          </div>
        </div>
      </div>
      <div className="flex p-6 gap-2">
        <SubscriberLineChart dataPoints={subscriberCounts} labels={months} />
        <Piechart />
      </div>
    </div>
  );
};

export default DashboardContent;
