"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useAuth } from "../../context/AuthContext";

import { LuMails } from "react-icons/lu";
import { MdOutlinePendingActions, MdPerson } from "react-icons/md";

const DashboardNav = ({ type }) => {
  const [showCard, setShowCard] = useState(false);
  const { logout, user } = useAuth();
  const userData = JSON.parse(user);
  return (
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
            <h1 className="font-bold text-sm">
              {userData?.first_name || "admin"}
            </h1>
            <span>{userData?.email}</span>
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
              <h1 className="font-bold text-sm">{userData?.name || "admin"}</h1>
              <span>{userData?.email}</span>
            </div>
          </div>
          <Link
            href={`/${type}/settings`}
            className="py-3 px-5 border-b hover:bg-gray-300 duration-150 cursor-pointer"
          >
            Settings
          </Link>
          <div
            className="py-3 px-5  hover:bg-gray-300 duration-150 cursor-pointer"
            onClick={logout}
          >
            Sign Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
