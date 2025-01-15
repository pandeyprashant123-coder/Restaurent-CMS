import React, { useState } from "react";
import Navpopup from "../popup/Navpopup";
import { FaChevronDown } from "react-icons/fa";
import logo from "../../assets/images/Foodi delivery-01 (1).png";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import Dropdown from "./Dropdown";
import JoinUsDropdown from "./JoinUsDropdown";

const subLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Categories",
    link: "/categories",
  },
  {
    title: "Cuisines",
    link: "/cuisines",
  },
  {
    title: "Restaurents",
    link: "/restaurents",
  },
];
const Navbar = () => {
  const location = useLocation();
  const [popup, setPopup] = useState("false");
  return (
    <div className="fixed top-0 w-screen flex flex-col z-50 dark:bg-slate-800">
      {popup === true ? <Navpopup popup={popup} setPopup={setPopup} /> : ""}
      <div className="flex text-black bg-[#f6efec] dark:bg-slate-800 dark:text-white justify-between">
        <div
          className="px-32 my-1 py-2 text-[12px] flex items-center dark:bg-slate-800 dark:text-white w-fit cursor-pointer "
          onClick={() => setPopup((prevPopup) => !popup)}
        >
          <MdLocationPin className="text-[#f6773b] text-[18px]" />
          <span className="text-[#f6773b] text-[13px] font-semibold pl-2">
            Your Location:
          </span>{" "}
          others:Nepal
          <FaChevronDown />
        </div>
        <div className="flex mr-32 max-w-maxContent items-center justify-between absolute right-0 top-0">
          <Dropdown />
          <JoinUsDropdown />
          <ThemeToggle />
        </div>
        <div></div>
      </div>

      <div className="px-32 py-2 bg-white dark:bg-black flex max-w-maxContent items-center justify-between ">
        <nav className=" text-black dark:text-white">
          <ul className="flex justify-around mt-4">
            <Link to="/">
              <img src={logo} alt="" className="w-fit h-[33px]" />
            </Link>
            {subLinks.map((item, index) => (
              <li key={index} className="group relative">
                <Link
                  to={item.link}
                  className={`px-4 py-1 font-medium text-[16px] hover:text-red-500 ${
                    location.pathname === item.link ? "text-red-500" : ""
                  }`}
                >
                  {item.title}
                </Link>
                {/* Hover effect */}
                <span className=" bg-red-400 transition-all duration-300"></span>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="subLinks.index"></Link>
        <div className=" flex gap-x-10 text-2xl group-hover:m-4">
          <Link to="/">
            <IoIosSearch className=" rounded-full hover:text-red-400  hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400 " />
          </Link>
          <Link to="/">
            <IoIosNotifications className="rounded-full hover:text-red-500  hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400" />
          </Link>

          <Link to="/">
            <FaShoppingCart className="hover:rounded-full hover:text-red-500 hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400" />
          </Link>

          {/* <Link to="/">
            <CgProfile 
            className=' hover:text-red-500 transition-colors duration-300'
            /> 
          </Link> */}
          <Link to="/" className=" flex flex-row items-center space-x-2">
            <FaLock className="text-[10px] dark:text-white" />
            <span className="text-[12px] font-normal dark:text-white hover:cursor-pointer">
              Sign in
            </span>
          </Link>

          <Link to="/">
            <IoMenu className="hover:rounded-full hover:text-red-500 hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
