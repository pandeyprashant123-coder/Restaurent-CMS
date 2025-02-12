"use client";
import React, { useState, useContext, useEffect } from "react";
import DashboardSidebar from "../components/VendorDashboard/DashboardSidebar";
// import DashboardNav from "@/components/VendorDashboard/DashboardNav";
import DashboardNav from "../components/VendorDashboard/DashboardNav";

import { useAuth } from "../context/AuthContext";

import { FoodProvider } from "../context/FoodContext";
import { redirect, useRouter } from "next/navigation";

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
    link: "/admin",
  },
  {
    title: "Pos",
    icon: <RiShoppingBagFill />,
    link: "/admin/pos",
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
            link: "/admin/order-management/orders",
            number: "12",
          },
          {
            title: "Pending",
            link: "/admin/order-management/orders?status={pending}",
          },
          {
            title: "Confirmed",
            link: "/admin/order-management/orders?status={confirmed}",
          },
          {
            title: "Accepted",
            link: "/admin/order-management/orders?status={accepted}",
          },
          {
            title: "Cooking",
            link: "/admin/order-management/orders?status={cooking}",
          },
          {
            title: "Ready for Delivery",
            link: "/admin/order-management/orders?status={ready-for-delivery}",
          },
          {
            title: "Food on the Way",
            link: "/admin/order-management/orders?status={food-on-the-way}",
          },
          {
            title: "Delivered",
            link: "/admin/order-management/orders?status={delivered}",
          },
          {
            title: "Refunded",
            link: "/admin/order-management/orders?status={refunded}",
          },
          {
            title: "Refund Requested",
            link: "/admin/order-management/orders?status={refund-request}",
          },
          {
            title: "Scheduled",
            link: "/admin/order-management/orders?status={scheduled}",
          },
          {
            title: "Payment Failed",
            link: "/admin/order-management/orders?status={payment-failed}",
          },
          {
            title: "Canceled",
            link: "/admin/order-management/orders?status={canceled}",
          },
        ],
      },
      {
        title: "Order Subscription",
        icon: <AiOutlineTag />,
        link: "/admin/order-management/subscription",
      },
    ],
  },
  {
    section: "Restaurant Management",
    items: [
      {
        title: "Restaurants",
        icon: <FaMountainSun />,
        dropdown: [
          {
            title: "Add Restaurant",
            link: "/admin/restaurant-management/restaurants/add-new",
          },
          {
            title: "Restaurant List",
            link: "/admin/restaurant-management/restaurants/list",
          },
          {
            title: "New Joining List",
            link: "/admin/restaurant-management/restaurants/new-list",
          },
          {
            title: "Bulk Import",
            link: "/admin/restaurant-management/restaurants/bulk-import",
          },
          {
            title: "Bulk Export",
            link: "/admin/restaurant-management/restaurants/bulk-export",
          },
        ],
      },
      {
        title: "Cuisine",
        icon: <AiOutlinePlusSquare />,
        link: "/admin/restaurant-management/cuisine",
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
            link: "/admin/food-management/categories/category",
          },
          {
            title: "Sub Category",
            link: "/admin/food-management/categories/sub-category",
          },
        ],
      },
      {
        title: "Foods",
        icon: <FaMountainSun />,
        dropdown: [
          {
            title: "Add New",
            link: "/admin/food-management/foods/add-new",
          },
          {
            title: "List",
            link: "/admin/food-management/foods/list",
          },
          {
            title: "Bulk Import",
            link: "/admin/food-management/foods/bulk-import",
          },
          {
            title: "Bulk Export",
            link: "/admin/food-management/foods/bulk-export",
          },
        ],
      },
      {
        title: "Addons",
        icon: <AiOutlinePlusSquare />,
        link: "/admin/food-management/addons",
      },
    ],
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
            link: "/admin/promotions/campaign/basic-campaign",
          },
          {
            title: "Food Campaign",
            link: "/admin/promotions/campaign/food-campaign",
          },
        ],
      },
      {
        title: "Coupons",
        icon: <AiOutlineTag />,
        link: "/admin/promotions/coupons",
      },
      {
        title: "Advertisement",
        icon: <AiOutlinePlusSquare />,
        dropdown: [
          {
            title: "New Advertisement",
            link: "/admin/promotions/ad-management/new-advertisement",
          },
          {
            title: "Ad Requests",
            link: "/admin/promotions/ad-management/ad-requests",
          },
          {
            title: "Advertisement List",
            link: "/admin/promotions/ad-management/ad-list",
          },
        ],
      },
    ],
  },

  {
    section: "Business Management",
    items: [
      {
        title: "Restaurant Config",
        icon: <RiShoppingBagFill />,
        link: "/admin/business-management/config",
      },
      {
        title: "Notification Setup",
        icon: <AiOutlineTag />,
        link: "/admin/business-management/notification-setup",
      },
      {
        title: "My Shop",
        icon: <LiaHomeSolid />,
        link: "/admin/business-management/my-shop",
      },
      {
        title: "My Qr Code",
        icon: <AiOutlinePlusSquare />,
        link: "/admin/business-management/my-qr-code",
      },
      {
        title: "My Business Plan",
        icon: <BiCrown />,
        link: "/admin/business-management/my-business-plan",
      },
      {
        title: "My Wallet",
        icon: <BiWalletAlt />,
        link: "/admin/business-management/my-wallet",
      },
      {
        title: "Wallet Method",
        icon: <RiBankFill />,
        link: "/admin/business-management/wallet-method",
      },
      {
        title: "Reviews",
        icon: <AiOutlineStar />,
        link: "/admin/business-management/reviews",
      },
      {
        title: "Chat",
        icon: <AiOutlineMessage />,
        link: "/admin/business-management/chat",
      },
    ],
  },
  {
    section: "Report Section",
    items: [
      {
        title: "Expense Report",
        icon: <AiOutlineFileText />,
        link: "/admin/report-section/expense-report",
      },
      {
        title: "Transaction Report",
        icon: <AiOutlinePieChart />,
        link: "/admin/report-section/transaction-report",
      },
      {
        title: "Disbursement Report",
        icon: <AiOutlineCreditCard />,
        link: "/admin/report-section/disbursement-report",
      },
      {
        title: "Order Report",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Monthly Orders",
            link: "/admin/report-section/order-report/monthly",
          },
          {
            title: "Annual Orders",
            link: "/admin/report-section/order-report/annual",
          },
        ],
      },
      {
        title: "Food Report",
        icon: <BiFoodMenu />,
        link: "/admin/report-section/food-report",
      },
    ],
  },
  {
    section: "Employee Section",
    items: [
      {
        title: "Employee Role",
        icon: <AiOutlineFileText />,
        link: "/admin/employee-section/employee-role",
      },
      {
        title: "Employees",
        icon: <AiOutlineUser />,
        dropdown: [
          {
            title: "Add New Employee",
            link: "/admin/employee-section/employee/add-new-employee",
          },
          {
            title: "List",
            link: "/admin/employee-section/employee/list",
          },
        ],
      },
    ],
  },
];

const layout = ({ children }) => {
  const [hideSideNav, sethideSideNav] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // console.log(isAuthenticated);

  if (!isAuthenticated) {
    return redirect("/login");
  }
  return (
    <div className="flex">
      <FoodProvider>
        <DashboardSidebar
          hideSideNav={hideSideNav}
          sethideSideNav={sethideSideNav}
          sidebarItems={sidebarItems}
        />
        <div className={`relative ${hideSideNav ? "w-full" : "w-4/5"}`}>
          <DashboardNav type={"admin"} />
          {children}
        </div>
      </FoodProvider>
    </div>
  );
};

export default layout;
