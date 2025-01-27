"use client";
import React, { useState, useEffect, useRef } from "react";

import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

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
  const [popup, setPopup] = useState("false");
  return (
    <div className="sticky top-0  flex flex-col z-50 dark:bg-slate-800">
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
            <Link href="/">
              <img
                src="/assets/img/favicon.png"
                alt=""
                className="w-fit h-[33px]"
              />
            </Link>
            {subLinks?.map((item, index) => (
              <li key={index} className="group relative">
                <Link
                  href={item.link}
                  className={`px-4 py-1 font-medium text-[16px] hover:text-red-500 `}
                >
                  {item.title}
                </Link>
                {/* Hover effect */}
                <span className=" bg-red-400 transition-all duration-300"></span>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="subLinks.index"></Link>
        <div className=" flex gap-x-10 text-2xl group-hover:m-4">
          <Link href="/">
            <IoIosSearch className=" rounded-full hover:text-red-400  hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400 " />
          </Link>
          <Link href="/">
            <IoIosNotifications className="rounded-full hover:text-red-500  hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400" />
          </Link>

          <Link href="/cart">
            <FaShoppingCart className="hover:rounded-full hover:text-red-500 hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400" />
          </Link>

          {/* <Link href="/">
            <CgProfile 
            className=' hover:text-red-500 transition-colors duration-300'
            /> 
          </Link> */}
          <Link href="/" className=" flex flex-row items-center space-x-2">
            <FaLock className="text-[10px] dark:text-white" />
            <span className="text-[12px] font-normal dark:text-white hover:cursor-pointer">
              Sign in
            </span>
          </Link>

          <Link href="/">
            <IoMenu className="hover:rounded-full hover:text-red-500 hover:bg-slate-200 transition-colors duration-300 dark:text-white dark:hover:text-orange-500 dark:hover:bg-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" relative inline-block text-left z-50 hover:bg-slate-200">
      <button
        onClick={toggleDropdown}
        className="flex gap-x-8 text-black dark:text-white font-semibold text-[12px] px-2 rounded-lg justify-center items-center "
      >
        English
        <RiArrowDropDownLine className="text-4xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#f5f6f8] dark:bg-[#272727] text-[12px] shadow-lg rounded-lg border border-gray-200">
          <ul className="py-1  ">
            <li>
              <a href="/" className="block px-4 py-2 dark:text-white">
                English
              </a>
            </li>
            <li>
              <a href="/" className="block px-4 py-2 dark:text-white">
                Spanish
              </a>
            </li>
            <li>
              <a href="/" className="block px-4 py-2 dark:text-white">
                Bangali
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  <time datetime="2016-10-25" suppressHydrationWarning />;
  // Set initial theme based on system preference or saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="bg-white dark:bg-black rounded-full w-6 h-6 outline outline-1 outline-orange-500 flex items-center justify-center">
      <button onClick={toggleTheme} className="text-orange-400 dark:bg-black">
        {isDarkMode ? <BsMoonStarsFill /> : <MdSunny />}
      </button>
    </div>
  );
};
const JoinUsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref to the dropdown

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={` relative inline-block text-left z-50 hover:bg-slate-200 `}
    >
      <button
        onClick={toggleDropdown}
        className="flex gap-x-8 text-black dark:text-white font-normal text-[12px] pl-4 pr-0 rounded-lg justify-center items-center"
      >
        <CiUser className="text-[16px] -mr-6" />
        Join Us
        <RiArrowDropDownLine className="text-4xl mr-0" />
      </button>

      {
        <ul
          className={`absolute right-0 mt-2 w-48 bg-[#f5f6f8] dark:bg-[#272727] text-[12px] shadow-lg rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out ${
            isOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <li>
            <a
              href="/restaurant-registration"
              className="mx-1 block px-4 py-2 dark:text-white hover:bg-slate-200"
            >
              Become a Restaurant
            </a>
          </li>
          <li>
            <a
              href="/delivery-man-registration"
              className="mx-1 block px-4 py-2 dark:text-white hover:bg-slate-200"
            >
              Become a delivery man
            </a>
          </li>
        </ul>
      }
    </div>
  );
};
