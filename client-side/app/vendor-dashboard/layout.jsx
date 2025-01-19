"use client";
import React, { useState, useContext } from "react";
import DashboardSidebar from "../components/VendorDashboard/DashboardSidebar";
import DashboardNav from "../components/VendorDashboard/DashboardNav";
import { useAuth } from "../context/AuthContext";
import "./global.css";
import { redirect } from "next/navigation";

const layout = ({ children }) => {
  const [hideSideNav, sethideSideNav] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return redirect("/login");
  }
  return (
    <div className="flex">
      <DashboardSidebar
        hideSideNav={hideSideNav}
        sethideSideNav={sethideSideNav}
      />
      <div className={`relative ${hideSideNav ? "w-full" : "w-4/5"}`}>
        <DashboardNav />
        {children}
      </div>
    </div>
  );
};

export default layout;
