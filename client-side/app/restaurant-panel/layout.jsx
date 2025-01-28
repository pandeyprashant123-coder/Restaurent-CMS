"use client";
import React, { useState, useContext } from "react";
import DashboardSidebar from "../components/VendorDashboard/DashboardSidebar";
// import DashboardNav from "@/components/VendorDashboard/DashboardNav";
import DashboardNav from "../components/VendorDashboard/DashboardNav";

import { useAuth } from "../context/AuthContext";
import "./global.css";
import { redirect } from "next/navigation";

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

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <LiaHomeSolid />,
    link: "/restaurant-panel",
  },
  {
    title: "Pos",
    icon: <RiShoppingBagFill />,
    link: "/restaurant-panel/pos",
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
            link: "/restaurant-panel/promotions/campaign/basic-campaign",
          },
          {
            title: "Food Campaign",
            link: "/restaurant-panel/promotions/campaign/food-campaign",
          },
        ],
      },
      {
        title: "Coupons",
        icon: <AiOutlineTag />,
        link: "/restaurant-panel/promotions/coupons",
      },
    ],
  },
  {
    section: "Advertisement Management",
    items: [
      {
        title: "New Advertisement",
        icon: <AiOutlinePlusSquare />,
        link: "/restaurant-panel/ad-management/new-advertisement",
      },
      {
        title: "Advertisement List",
        icon: <AiOutlineUnorderedList />,
        dropdown: [
          {
            title: "Pending",
            link: "/restaurant-panel/ad-management/advertisement-list/pending",
          },
          {
            title: "Ad List",
            link: "/restaurant-panel/ad-management/advertisement-list/ad-list",
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
            link: "/restaurant-panel/order-management/orders",
            number: "12",
          },
          {
            title: "Pending",
            link: "/restaurant-panel/order-management/pending",
          },
          {
            title: "Confirmed",
            link: "/restaurant-panel/order-management/confirmed",
          },
          {
            title: "Accepted",
            link: "/restaurant-panel/order-management/accepted",
          },
          {
            title: "Cooking",
            link: "/restaurant-panel/order-management/cooking",
          },
          {
            title: "Ready for Delivery",
            link: "/restaurant-panel/order-management/ready-for-delivery",
          },
          {
            title: "Food on the Way",
            link: "/restaurant-panel/order-management/food-on-the-way",
          },
          {
            title: "Delivered",
            link: "/restaurant-panel/order-management/delivered",
          },
          {
            title: "Refunded",
            link: "/restaurant-panel/order-management/refunded",
          },
          {
            title: "Refund Requested",
            link: "/restaurant-panel/order-management/refund-request",
          },
          {
            title: "Scheduled",
            link: "/restaurant-panel/order-management/scheduled",
          },
          {
            title: "Payment Failed",
            link: "/restaurant-panel/order-management/payment-failed",
          },
          {
            title: "Canceled",
            link: "/restaurant-panel/order-management/canceled",
          },
        ],
      },
      {
        title: "Order Subscription",
        icon: <AiOutlineTag />,
        link: "/restaurant-panel/order-management/subscription",
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
            link: "/restaurant-panel/food-management/categories/category",
          },
          {
            title: "Sub Category",
            link: "/restaurant-panel/food-management/categories/sub-category",
          },
        ],
      },
      {
        title: "Foods",
        icon: <FaMountainSun />,
        dropdown: [
          {
            title: "Add New",
            link: "/restaurant-panel/food-management/foods/add-new",
          },
          {
            title: "List",
            link: "/restaurant-panel/food-management/foods/list",
          },
          {
            title: "Bulk Import",
            link: "/restaurant-panel/food-management/foods/bulk-import",
          },
          {
            title: "Bulk Export",
            link: "/restaurant-panel/food-management/foods/bulk-export",
          },
        ],
      },
      {
        title: "Addons",
        icon: <AiOutlinePlusSquare />,
        link: "/restaurant-panel/food-management/addons",
      },
    ],
  },
  {
    section: "Business Management",
    items: [
      {
        title: "Restaurant Config",
        icon: <RiShoppingBagFill />,
        link: "/restaurant-panel/business-management/config",
      },
      {
        title: "Notification Setup",
        icon: <AiOutlineTag />,
        link: "/restaurant-panel/business-management/notification-setup",
      },
      {
        title: "My Shop",
        icon: <LiaHomeSolid />,
        link: "/restaurant-panel/business-management/my-shop",
      },
      {
        title: "My Qr Code",
        icon: <AiOutlinePlusSquare />,
        link: "/restaurant-panel/business-management/my-qr-code",
      },
      {
        title: "My Business Plan",
        icon: <BiCrown />,
        link: "/restaurant-panel/business-management/my-business-plan",
      },
      {
        title: "My Wallet",
        icon: <BiWalletAlt />,
        link: "/restaurant-panel/business-management/my-wallet",
      },
      {
        title: "Wallet Method",
        icon: <RiBankFill />,
        link: "/restaurant-panel/business-management/wallet-method",
      },
      {
        title: "Reviews",
        icon: <AiOutlineStar />,
        link: "/restaurant-panel/business-management/reviews",
      },
      {
        title: "Chat",
        icon: <AiOutlineMessage />,
        link: "/restaurant-panel/business-management/chat",
      },
    ],
  },
  {
    section: "Report Section",
    items: [
      {
        title: "Expense Report",
        icon: <AiOutlineFileText />,
        link: "/restaurant-panel/report-section/expense-report",
      },
      {
        title: "Transaction Report",
        icon: <AiOutlinePieChart />,
        link: "/restaurant-panel/report-section/transaction-report",
      },
      {
        title: "Disbursement Report",
        icon: <AiOutlineCreditCard />,
        link: "/restaurant-panel/report-section/disbursement-report",
      },
      {
        title: "Order Report",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Monthly Orders",
            link: "/restaurant-panel/report-section/order-report/monthly",
          },
          {
            title: "Annual Orders",
            link: "/restaurant-panel/report-section/order-report/annual",
          },
        ],
      },
      {
        title: "Food Report",
        icon: <BiFoodMenu />,
        link: "/restaurant-panel/report-section/food-report",
      },
    ],
  },
  {
    section: "Employee Section",
    items: [
      {
        title: "Employee Role",
        icon: <AiOutlineFileText />,
        link: "/restaurant-panel/employee-section/employee-role",
      },
      {
        title: "Employees",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Add New Employee",
            link: "/restaurant-panel/employee-section/employee/add-new-employee",
          },
          {
            title: "List",
            link: "/restaurant-panel/employee-section/employee/list",
          },
        ],
      },
    ],
  },
];

const layout = ({ children }) => {
  const [hideSideNav, sethideSideNav] = useState(false);
  const { isAuthenticated } = useAuth();
  // console.log(isAuthenticated);

  if (!isAuthenticated) {
    return redirect("/login");
  }
  return (
    <div className="flex">
      <DashboardSidebar
        hideSideNav={hideSideNav}
        sethideSideNav={sethideSideNav}
        sidebarItems={sidebarItems}
      />
      <div className={`relative ${hideSideNav ? "w-full" : "w-4/5"}`}>
        <DashboardNav />
        {children}
      </div>
    </div>
  );
};

export default layout;
