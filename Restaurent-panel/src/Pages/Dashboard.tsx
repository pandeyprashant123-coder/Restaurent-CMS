import React, { useState, useRef, useEffect } from "react";

import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import { LiaHomeSolid } from "react-icons/lia";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaMountainSun } from "react-icons/fa6";
import {
  AiOutlineTag,
  AiOutlinePlusSquare,
  AiOutlineUnorderedList,
  AiOutlineStar,
  AiOutlineMessage,
  AiOutlineFileText,
  AiOutlinePieChart,
  AiOutlineCreditCard,
  AiOutlineUser,
} from "react-icons/ai";
import { BiCrown, BiWalletAlt, BiFoodMenu } from "react-icons/bi";
import { RiBankFill } from "react-icons/ri";
import { LuMails } from "react-icons/lu";
import { MdOutlinePendingActions, MdPerson } from "react-icons/md";
import hotelIcon from "../assets/hotelIcon.png";

import { Link, NavLink, Outlet } from "react-router-dom";
import { PiArrowLineLeft, PiArrowLineLeftBold } from "react-icons/pi";

interface SidebarItem {
  title: string;
  icon?: JSX.Element;
  link?: string;
  dropdown?: SidebarItem[];
  number?: string;
}

interface SidebarSection {
  section: string;
  items: SidebarItem[];
}

type SidebarData = (SidebarItem | SidebarSection)[];

const sidebarItems: SidebarData = [
  {
    title: "Dashboard",
    icon: <LiaHomeSolid />,
    link: "",
  },
  {
    title: "Pos",
    icon: <RiShoppingBagFill />,
    link: "pos",
  },
  {
    section: "Promotions",
    items: [
      {
        title: "Campaign",
        icon: <FaMountainSun />,
        dropdown: [
          {
            title: "Basic Campaign",
            link: "campaign/basic-campaign",
          },
          {
            title: "Food Campaign",
            link: "campaign/food-campaign",
          },
        ],
      },
      {
        title: "Coupons",
        icon: <AiOutlineTag />,
        link: "coupons",
      },
    ],
  },
  {
    section: "Advertisement Management",
    items: [
      {
        title: "New Advertisement",
        icon: <AiOutlinePlusSquare />,
        link: "new-advertisement",
      },
      {
        title: "Advertisement List",
        icon: <AiOutlineUnorderedList />,
        dropdown: [
          {
            title: "Pending",
            link: "advertisement-list/pending",
          },
          {
            title: "Ad List",
            link: "advertisement-list/ad-list",
          },
        ],
      },
    ],
  },
  {
    section: "Order Management",
    items: [
      {
        title: "Orders",
        icon: <RiShoppingBagFill />,
        dropdown: [
          {
            title: "All",
            link: "order-management/orders",
            number: "12",
          },
          {
            title: "Pending",
            link: "order-management/pending",
          },
          {
            title: "Confirmed",
            link: "order-management/confirmed",
          },
          {
            title: "Accepted",
            link: "order-management/accepted",
          },
          {
            title: "Cooking",
            link: "order-management/cooking",
          },
          {
            title: "Ready for Delivery",
            link: "order-management/ready-for-delivery",
          },
          {
            title: "Food on the Way",
            link: "order-management/food-on-the-way",
          },
          {
            title: "Delivered",
            link: "order-management/delivered",
          },
          {
            title: "Refunded",
            link: "order-management/refunded",
          },
          {
            title: "Refund Requested",
            link: "order-management/refund-request",
          },
          {
            title: "Scheduled",
            link: "order-management/scheduled",
          },
          {
            title: "Payment Failed",
            link: "order-management/payment-failed",
          },
          {
            title: "Canceled",
            link: "order-management/canceled",
          },
        ],
      },
      {
        title: "Order Subscription",
        icon: <AiOutlineTag />,
        link: "order-management/subscription",
      },
    ],
  },
  {
    section: "Food Management",
    items: [
      {
        title: "Categories",
        icon: <AiOutlineUnorderedList />,
        dropdown: [
          {
            title: "Category",
            link: "food-management/category",
          },
          {
            title: "Sub Category",
            link: "food-management/sub-category",
          },
        ],
      },
      {
        title: "Foods",
        icon: <FaMountainSun />,
        dropdown: [
          {
            title: "Add New",
            link: "food-management/Addnew",
          },
          {
            title: "List",
            link: "food-management/list",
          },
          {
            title: "Bulk Import",
            link: "food-management/bulk-export",
          },
          {
            title: "Bulk Export",
            link: "food-management/bulk-export",
          },
        ],
      },
      {
        title: "Addons",
        icon: <AiOutlinePlusSquare />,
        link: "food-management/addons",
      },
    ],
  },
  {
    section: "Business Management",
    items: [
      {
        title: "Restaurant Config",
        icon: <RiShoppingBagFill />,
        link: "business-management/config",
      },
      {
        title: "Notification Setup",
        icon: <AiOutlineTag />,
        link: "business-management/notification-setup",
      },
      {
        title: "My Shop",
        icon: <LiaHomeSolid />,
        link: "business-management/my-shop",
      },
      {
        title: "My Qr Code",
        icon: <AiOutlinePlusSquare />,
        link: "business-management/my-qr-code",
      },
      {
        title: "My Business Plan",
        icon: <BiCrown />,
        link: "business-management/my-business-plan",
      },
      {
        title: "My Wallet",
        icon: <BiWalletAlt />,
        link: "business-management/my-wallet",
      },
      {
        title: "Wallet Method",
        icon: <RiBankFill />,
        link: "business-management/wallet-method",
      },
      {
        title: "Reviews",
        icon: <AiOutlineStar />,
        link: "business-management/reviews",
      },
      {
        title: "Chat",
        icon: <AiOutlineMessage />,
        link: "business-management/chat",
      },
    ],
  },
  {
    section: "Report Section",
    items: [
      {
        title: "Expense Report",
        icon: <AiOutlineFileText />,
        link: "report-section/expense-report",
      },
      {
        title: "Transaction Report",
        icon: <AiOutlinePieChart />,
        link: "report-section/transaction-report",
      },
      {
        title: "Disbursement Report",
        icon: <AiOutlineCreditCard />,
        link: "report-section/disbursement-report",
      },
      {
        title: "Order Report",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Monthly Orders",
            link: "report-section/order-report/monthly",
          },
          {
            title: "Annual Orders",
            link: "report-section/order-report/annual",
          },
        ],
      },
      {
        title: "Food Report",
        icon: <BiFoodMenu />,
        link: "report-section/food-report",
      },
    ],
  },
  {
    section: "Employee Section",
    items: [
      {
        title: "Employee Role",
        icon: <AiOutlineFileText />,
        link: "employee-section/employee-role",
      },
      {
        title: "Employees",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Add New Employee",
            link: "employee-section/employee/add-new-employee",
          },
          {
            title: "List",
            link: "employee-section/employee/list",
          },
        ],
      },
    ],
  },
];

const Dashboard = () => {
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [showCard, setShowCard] = useState<boolean>(false);
  const [hideSideNav, sethideSideNav] = useState<boolean>(false);
  const [hoverToggle, setHoverToggle] = useState(false);

  const toggleDropdown = (title: string) => {
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
    }, {} as Record<string, boolean>);
    setOpenDropdown(newState);
  };

  const isSection = (
    item: SidebarItem | SidebarSection
  ): item is SidebarSection => "section" in item;

  const cardRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setShowCard(false); // Close the card
    }
  };
  useEffect(() => {
    if (showCard) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCard]);
  return (
    <div className="flex">
      <div
        className={`h-screen  sticky top-0 transition-all duration-300 ease-in-out ${
          hideSideNav ? "w-16" : "w-1/5"
        }`}
      >
        <div className="bg-slate-200 z-50 h-16 sticky top-0 flex gap-3 justify-between items-center p-2 text-gray-800 font-semibold">
          {!hideSideNav && (
            <div className="flex gap-2 items-center">
              <img
                src={hotelIcon}
                alt="icon"
                className="w-12 h-12 rounded-md"
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
                              <NavLink
                                to={subItem.link || "#"}
                                end
                                className={({ isActive }) =>
                                  `flex items-center p-2 rounded transition duration-200  ${
                                    isActive
                                      ? "bg-[#efF6FF1A] [&>*:nth-child(even)]:text-orange-500  w-full"
                                      : ""
                                  }`
                                }
                              >
                                <span className="mr-3 ">{subItem.icon}</span>
                                {!hideSideNav && (
                                  <span className="hover:text-orange-500">
                                    {subItem.title}
                                  </span>
                                )}
                              </NavLink>
                            </div>
                          ) : (
                            <div>
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
                                className={`mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                                  openDropdown[subItem.title]
                                    ? "max-h-[36rem] opacity-100"
                                    : "max-h-0 opacity-0"
                                }${
                                  hideSideNav
                                    ? " fixed  bg-gray-700 top-44 left-20 p-6 rounded-md shadow-md h-96 overflow-y-scroll max-h-[36rem]"
                                    : ""
                                }`}
                                style={{
                                  transitionProperty: "max-height, opacity",
                                  zIndex: "10001",
                                }}
                                onMouseLeave={() =>
                                  hideSideNav && handleHoverToggle
                                }
                              >
                                {subItem.dropdown.map((dropdownItem, i) => (
                                  <NavLink
                                    to={dropdownItem.link || "#"}
                                    key={i}
                                    end
                                    className={({ isActive }) =>
                                      `flex items-center pl-8 py-2 pr-2 rounded transition duration-200 hover:text-orange-500  ${
                                        isActive
                                          ? "bg-[#efF6FF1A]  w-full text-orange-500 "
                                          : "[&>*:nth-child(odd)]:text-green-200 "
                                      }`
                                    }
                                  >
                                    <span className="mr-2 font-bold text-lg ">
                                      •
                                    </span>
                                    <span>{dropdownItem.title}</span>
                                  </NavLink>
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
                    // to={item.link || ""}
                    className="flex items-center  rounded"
                  >
                    <NavLink
                      to={item.link || ""}
                      end
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded transition duration-200 ${
                          isActive
                            ? "bg-[#efF6FF1A] [&>*:nth-child(even)]:text-orange-500 w-full"
                            : " "
                        }`
                      }
                    >
                      <span className="mr-3">{item.icon}</span>
                      {!hideSideNav && (
                        <span className="hover:text-orange-500">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </div>
                )}
              </div>
            ))}
          </ul>
          <div className="py-10"></div>
        </div>
      </div>
      <div className={`${hideSideNav ? "w-full" : "w-4/5"}`}>
        <div className="border-b sticky top-0 z-50 bg-white">
          <div className="text-gray-500 flex gap-6 justify-end py-2 px-5">
            <LuMails className="p-[.7rem] h-10 w-10 bg-slate-100 rounded-full hover:bg-slate-500 hover:text-white duration-150 cursor-pointer" />
            <MdOutlinePendingActions className="p-[.7rem] h-10 w-10 bg-slate-100 rounded-full hover:bg-slate-500 hover:text-white duration-150 cursor-pointer" />
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => setShowCard((prev) => !prev)}
              onMouseOver={() => setShowCard(true)}
            >
              <div>
                <h1 className="font-bold text-sm">Name</h1>
                <span>gmail</span>
              </div>
              <MdPerson className="p-1 text-5xl border-4 border-white rounded-full bg-gray-200" />
            </div>
            <div
              className={`absolute top-16 flex flex-col mt-2 bg-white w-64 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
                showCard ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
              onMouseLeave={() => setShowCard(false)}
            >
              <div className="py-3 px-5 border-b flex gap-3">
                <MdPerson className="p-1 text-5xl border-4 border-white rounded-full bg-gray-200" />
                <div>
                  <h1 className="font-bold text-sm">Name</h1>
                  <span>gmail</span>
                </div>
              </div>
              <Link
                to="../../dashboard/profile/view"
                className="py-3 px-5 border-b hover:bg-gray-300 duration-150 cursor-pointer"
              >
                Settings
              </Link>
              <div className="py-3 px-5  hover:bg-gray-300 duration-150 cursor-pointer">
                Sign Out
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
