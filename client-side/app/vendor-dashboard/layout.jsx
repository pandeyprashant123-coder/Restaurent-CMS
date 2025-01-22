"use client";
import React, { useState, useContext } from "react";
import DashboardSidebar from "../components/VendorDashboard/DashboardSidebar";
// import DashboardNav from "@/components/VendorDashboard/DashboardNav";
import DashboardNav from "../components/VendorDashboard/DashboardNav";

import { useAuth } from "../context/AuthContext";
import "./global.css";
import { redirect } from "next/navigation";
import { FoodProvider } from "../context/FoodContext";

const layout = ({ children }) => {
  const [hideSideNav, sethideSideNav] = useState(false);
  const { isAuthenticated } = useAuth();
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
        />
        <div className={`relative ${hideSideNav ? "w-full" : "w-4/5"}`}>
          <DashboardNav />
          {children}
        </div>
      </FoodProvider>
    </div>
  );
};

export default layout;
