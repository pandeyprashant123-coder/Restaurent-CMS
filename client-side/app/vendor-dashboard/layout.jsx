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
    link: "/vendor-dashboard",
  },
  {
    title: "Pos",
    icon: <RiShoppingBagFill />,
    link: "/vendor-dashboard/pos",
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
            link: "/vendor-dashboard/promotions/campaign/basic-campaign",
          },
          {
            title: "Food Campaign",
            link: "/vendor-dashboard/promotions/campaign/food-campaign",
          },
        ],
      },
      {
        title: "Coupons",
        icon: <AiOutlineTag />,
        link: "/vendor-dashboard/promotions/coupons",
      },
    ],
  },
  {
    section: "Advertisement Management",
    items: [
      {
        title: "New Advertisement",
        icon: <AiOutlinePlusSquare />,
        link: "/vendor-dashboard/ad-management/new-advertisement",
      },
      {
        title: "Advertisement List",
        icon: <AiOutlineUnorderedList />,
        dropdown: [
          {
            title: "Pending",
            link: "/vendor-dashboard/ad-management/advertisement-list/pending",
          },
          {
            title: "Ad List",
            link: "/vendor-dashboard/ad-management/advertisement-list/ad-list",
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
            link: "/vendor-dashboard/order-management/orders",
            number: "12",
          },
          {
            title: "Pending",
            link: "/vendor-dashboard/order-management/pending",
          },
          {
            title: "Confirmed",
            link: "/vendor-dashboard/order-management/confirmed",
          },
          {
            title: "Accepted",
            link: "/vendor-dashboard/order-management/accepted",
          },
          {
            title: "Cooking",
            link: "/vendor-dashboard/order-management/cooking",
          },
          {
            title: "Ready for Delivery",
            link: "/vendor-dashboard/order-management/ready-for-delivery",
          },
          {
            title: "Food on the Way",
            link: "/vendor-dashboard/order-management/food-on-the-way",
          },
          {
            title: "Delivered",
            link: "/vendor-dashboard/order-management/delivered",
          },
          {
            title: "Refunded",
            link: "/vendor-dashboard/order-management/refunded",
          },
          {
            title: "Refund Requested",
            link: "/vendor-dashboard/order-management/refund-request",
          },
          {
            title: "Scheduled",
            link: "/vendor-dashboard/order-management/scheduled",
          },
          {
            title: "Payment Failed",
            link: "/vendor-dashboard/order-management/payment-failed",
          },
          {
            title: "Canceled",
            link: "/vendor-dashboard/order-management/canceled",
          },
        ],
      },
      {
        title: "Order Subscription",
        icon: <AiOutlineTag />,
        link: "/vendor-dashboard/order-management/subscription",
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
            link: "/vendor-dashboard/food-management/categories/category",
          },
          {
            title: "Sub Category",
            link: "/vendor-dashboard/food-management/categories/sub-category",
          },
        ],
      },
      {
        title: "Foods",
        icon: <FaMountainSun />,
        dropdown: [
          {
            title: "Add New",
            link: "/vendor-dashboard/food-management/foods/add-new",
          },
          {
            title: "List",
            link: "/vendor-dashboard/food-management/foods/list",
          },
          {
            title: "Bulk Import",
            link: "/vendor-dashboard/food-management/foods/bulk-import",
          },
          {
            title: "Bulk Export",
            link: "/vendor-dashboard/food-management/foods/bulk-export",
          },
        ],
      },
      {
        title: "Addons",
        icon: <AiOutlinePlusSquare />,
        link: "/vendor-dashboard/food-management/addons",
      },
    ],
  },
  {
    section: "Business Management",
    items: [
      {
        title: "Restaurant Config",
        icon: <RiShoppingBagFill />,
        link: "/vendor-dashboard/business-management/config",
      },
      {
        title: "Notification Setup",
        icon: <AiOutlineTag />,
        link: "/vendor-dashboard/business-management/notification-setup",
      },
      {
        title: "My Shop",
        icon: <LiaHomeSolid />,
        link: "/vendor-dashboard/business-management/my-shop",
      },
      {
        title: "My Qr Code",
        icon: <AiOutlinePlusSquare />,
        link: "/vendor-dashboard/business-management/my-qr-code",
      },
      {
        title: "My Business Plan",
        icon: <BiCrown />,
        link: "/vendor-dashboard/business-management/my-business-plan",
      },
      {
        title: "My Wallet",
        icon: <BiWalletAlt />,
        link: "/vendor-dashboard/business-management/my-wallet",
      },
      {
        title: "Wallet Method",
        icon: <RiBankFill />,
        link: "/vendor-dashboard/business-management/wallet-method",
      },
      {
        title: "Reviews",
        icon: <AiOutlineStar />,
        link: "/vendor-dashboard/business-management/reviews",
      },
      {
        title: "Chat",
        icon: <AiOutlineMessage />,
        link: "/vendor-dashboard/business-management/chat",
      },
    ],
  },
  {
    section: "Report Section",
    items: [
      {
        title: "Expense Report",
        icon: <AiOutlineFileText />,
        link: "/vendor-dashboard/report-section/expense-report",
      },
      {
        title: "Transaction Report",
        icon: <AiOutlinePieChart />,
        link: "/vendor-dashboard/report-section/transaction-report",
      },
      {
        title: "Disbursement Report",
        icon: <AiOutlineCreditCard />,
        link: "/vendor-dashboard/report-section/disbursement-report",
      },
      {
        title: "Order Report",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Monthly Orders",
            link: "/vendor-dashboard/report-section/order-report/monthly",
          },
          {
            title: "Annual Orders",
            link: "/vendor-dashboard/report-section/order-report/annual",
          },
        ],
      },
      {
        title: "Food Report",
        icon: <BiFoodMenu />,
        link: "/vendor-dashboard/report-section/food-report",
      },
    ],
  },
  {
    section: "Employee Section",
    items: [
      {
        title: "Employee Role",
        icon: <AiOutlineFileText />,
        link: "/vendor-dashboard/employee-section/employee-role",
      },
      {
        title: "Employees",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Add New Employee",
            link: "/vendor-dashboard/employee-section/employee/add-new-employee",
          },
          {
            title: "List",
            link: "/vendor-dashboard/employee-section/employee/list",
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
