"use client";
import React, { useState, useRef, useEffect } from "react";

import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import { PiArrowLineLeft, PiArrowLineLeftBold } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const DashboardSidebar = ({ hideSideNav, sethideSideNav, sidebarItems }) => {
  const [openDropdown, setOpenDropdown] = useState({});

  const [hoverToggle, setHoverToggle] = useState(false);

  const currentPath = usePathname();

  const toggleDropdown = (title) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const handleHoverToggle = () => {
    setHoverToggle((prev) => !prev);
  };
  const handleSideNav = () => {
    sethideSideNav((prev) => !prev);
    const newState = Object.keys(openDropdown).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    });
    setOpenDropdown(newState);
  };

  const isSection = (item) => "section" in item;

  return (
    <div
      className={`h-screen  sticky top-0 transition-all duration-300 ease-in-out ${
        hideSideNav ? "w-16" : "w-1/5"
      }`}
    >
      <div className="bg-slate-200 z-50 h-16 sticky top-0 flex gap-3 justify-between items-center p-2 text-gray-800 font-semibold">
        {!hideSideNav && (
          <div className="flex gap-2 items-center">
            <Image
              src="/assets/img/hotelIcon.png"
              alt="icon"
              className="w-12 h-12 rounded-md"
              height={100}
              width={100}
            />
            <h1>Name</h1>
          </div>
        )}
        <PiArrowLineLeftBold
          // data-tooltip-target="tooltip-left"
          // data-tooltip-placement="left"
          className={`font-bold hover:text-blue-500 cursor-pointer ${
            hideSideNav && "rotate-180 mx-3"
          } `}
          onClick={handleSideNav}
        />
        {/* {!hideSideNav && (
            <div
              id="tooltip-left"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Collapse
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          )} */}
      </div>
      <div className="h-screen overflow-y-scroll bg-gray-700 text-white">
        <ul className="p-4">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {isSection(item) ? (
                <li className="mt-6">
                  <h3
                    className={`text-gray-400 uppercase text-sm font-semibold ${
                      hideSideNav ? " mx-2 font-bold text-xl w-16" : "w-full"
                    } `}
                  >
                    {!hideSideNav ? item.section : "..."}
                  </h3>
                  <ul className="mt-2">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {!subItem.dropdown ? (
                          <div className="flex items-center  rounded">
                            <Link
                              href={subItem.link || ""}
                              className={`flex items-center p-2 rounded transition duration-200  ${
                                currentPath === subItem.link
                                  ? "bg-[#efF6FF1A] [&>*:nth-child(even)]:text-orange-500  w-full"
                                  : ""
                              }`}
                            >
                              <span className="mr-3 ">{subItem.icon}</span>
                              {!hideSideNav && (
                                <span className="hover:text-orange-500">
                                  {subItem.title}
                                </span>
                              )}
                            </Link>
                          </div>
                        ) : (
                          <div className="relative">
                            <div
                              className="flex items-center p-2  rounded cursor-pointer "
                              onClick={() => toggleDropdown(subItem.title)}
                              onMouseOver={() =>
                                hideSideNav && handleHoverToggle
                              }
                              onMouseLeave={() =>
                                hideSideNav && handleHoverToggle
                              }
                            >
                              <span className="mr-3">{subItem.icon}</span>
                              {!hideSideNav && (
                                <>
                                  <span className="hover:text-orange-500">
                                    {subItem.title}
                                  </span>
                                  <span className="ml-auto">
                                    {openDropdown[subItem.title] ? (
                                      <MdOutlineKeyboardArrowUp className="text-gray-400" />
                                    ) : (
                                      <MdOutlineKeyboardArrowDown className="text-gray-400" />
                                    )}
                                  </span>
                                </>
                              )}
                            </div>
                            <ul
                              className={`mt-1 overflow-hidden transition-all duration-300 ease-in-out z-50 ${
                                openDropdown[subItem.title]
                                  ? "max-h-[36rem] opacity-100"
                                  : "max-h-0 opacity-0"
                              }${
                                hideSideNav
                                  ? " fixed top-44 bg-gray-700 left-20 p-6 rounded-md shadow-md overflow-y-scroll"
                                  : ""
                              }`}
                              style={{
                                transitionProperty: "max-height, opacity",
                              }}
                              onMouseLeave={() =>
                                hideSideNav && handleHoverToggle
                              }
                            >
                              {subItem.dropdown.map((dropdownItem, i) => (
                                <Link
                                  href={dropdownItem.link || ""}
                                  key={i}
                                  className={`flex justify-between items-center pl-10 py-1 pr-2 text-sm rounded transition duration-200 hover:text-orange-500  ${
                                    currentPath === dropdownItem.link
                                      ? "bg-[#efF6FF1A]  w-full text-orange-500 "
                                      : " "
                                  }`}
                                >
                                  <div className="[&>*:nth-child(odd)]:text-green-200">
                                    <span className="mr-2 font-bold text-lg ">
                                      •
                                    </span>
                                    <span>{dropdownItem.title}</span>
                                  </div>
                                  {dropdownItem.number && (
                                    <p className="text-[#0096ff] font-semibold text-xs bg-[#139dff1f] py-1 px-2 rounded-full">
                                      {dropdownItem.number}
                                    </p>
                                  )}
                                </Link>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <div
                  // href={item.link || ""}
                  className="flex items-center  rounded"
                >
                  <Link
                    href={item.link || ""}
                    className={`flex items-center p-2 rounded transition duration-200 ${
                      currentPath === item.link
                        ? "bg-[#efF6FF1A] [&>*:nth-child(even)]:text-orange-500 w-full"
                        : " "
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!hideSideNav && (
                      <span className="hover:text-orange-500">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </ul>
        <div className="advertise advertiseAd bg-white relative overflow-hidden p-3 m-3  flex flex-col items-center justify-evenly gap-1 bg-[#4153b30d] rounded-md shadow">
          <Image
            src="/assets/img/ad-default.png"
            alt=""
            height={100}
            width={100}
          />
          <h1 className=" font-semibold text-black mt-2">
            Want to get highlighted?
          </h1>
          <p className="text-center text-xs text-gray-500">
            Create ads to get highlighted on the app and web browser
          </p>
          <Link href="./new-advertisement" className="btnBlue p-2  mt-2">
            Create Ads
          </Link>
        </div>
        <div className="py-10"></div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
