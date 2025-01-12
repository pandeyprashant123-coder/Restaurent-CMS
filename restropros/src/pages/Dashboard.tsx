import React, { useState } from "react";
import Piechart from "../components/Piechart";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import { MdPerson } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineAddAlert } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";
import { MdArrowForwardIos } from "react-icons/md";

import Logo from "../assets/logo.svg";

const Dashboard = () => {
  const [showDashNav, setShowDashNav] = useState<boolean>(true);
  return (
    <>
      {/* admin top Nav */}
      <div className="flex fixed top-0 w-full py-3 justify-between pl-52 pr-5 bg-white shadow-sm">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div>
          <ul>
            <li></li>
            <li></li>
            <li className="btnGrey">Sign Out</li>
          </ul>
        </div>
      </div>
      <div className=" flex duration-200">
        <div className=" flex flex-col gap-8 px-4 py-2 h-screen fixed  bg-green-50 transition-all duration-150 z-50">
          <Link to="/">
            <img
              src={Logo}
              alt="icon"
              className={`${showDashNav ? "w-[7rem]" : "w-[4rem]"} p-3`}
            />
          </Link>
          {showDashNav && (
            <div className="flex gap-3 items-center">
              <MdPerson className="p-1 text-5xl border-4 border-white rounded-full bg-gray-200" />
              <div>
                <p>Name</p>
                <span>ADMIN</span>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3 text-bold text-green-900 items-center justify-start">
            <Link
              to=""
              className="flex gap-3 ml-3 items-center justify-start hover:bg-gray-200 px-4 py-2 rounded-full w-full"
            >
              <MdOutlineDashboard className="text-2xl" />
              {showDashNav && <div className=" w-4/5 text-left">Dashboard</div>}
            </Link>
            <Link
              to="users"
              className="flex gap-3 ml-3 items-center justify-start  hover:bg-gray-200 px-4 py-2 rounded-full w-full"
            >
              <IoRestaurantOutline className="text-2xl" />
              {showDashNav && <div className=" w-4/5 text-left">Hotels</div>}
            </Link>
            <div className="flex flex-col gap-3 items-center justify-start w-full">
              {showDashNav && (
                <h1 className="font-bold text-left text-lg w-full">
                  Subscription
                </h1>
              )}
              <Link
                to="subscriptionAdd"
                className="flex gap-3 ml-3 items-center justify-start w-full  hover:bg-green-100 px-4 py-2 rounded-full duration-100"
              >
                <MdAddCircleOutline className="text-2xl" />
                {showDashNav && <div className=" w-4/5 text-left">Add</div>}
              </Link>
              <Link
                to="subscriptionPending"
                className="flex gap-3 ml-3 items-center justify-start w-full  hover:bg-green-100 px-4 py-2 rounded-full duration-100"
              >
                <MdOutlinePending className="text-2xl" />
                {showDashNav && <div className=" w-4/5 text-left">Pending</div>}
              </Link>
              <Link
                to="subscriptionExpiring"
                className="flex gap-3 ml-3 items-center justify-start w-full  hover:bg-green-100 px-4 py-2 rounded-full duration-100"
              >
                <RiPassExpiredLine className="text-2xl" />
                {showDashNav && (
                  <div className=" w-4/5 text-left">Expiring</div>
                )}
              </Link>
            </div>
          </div>
          <div
            className={` absolute bottom-20  hover:bg-gray-200  ${
              !showDashNav
                ? "left-9"
                : "left-[10.5rem] rotate-180 bg-white border"
            } cursor-pointer p-2 rounded-full`}
            onClick={() => setShowDashNav((prev) => !prev)}
          >
            <MdArrowForwardIos className="text-xl  text-gray-600" />
          </div>
        </div>
        <div className={`${showDashNav ? "ml-44" : "ml-20"} p-6 w-full  mt-20`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
