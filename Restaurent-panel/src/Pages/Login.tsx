import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa6";

import logo from "../assets/Foodidelivery.png";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <div className="h-screen w-screen flex">
      <div
        className={`w-3/5 h-full flex gap-4 items-center`}
        style={{
          backgroundImage: `url("/img/LoginFoodImg.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-5  pl-10 justify-center bg-[#ff8a09f5] text-white w-3/5 h-3/5">
          <div className="text-5xl font-semibold">
            <h1 className="mb-2">WELCOME TO </h1>
            <h1>FOODI</h1>
          </div>
          <p className="text-xl">Manage your app & website easily</p>
        </div>
      </div>
      <div className="w-2/5 justify-center  px-6 flex gap-4 flex-col">
        <img src={logo} alt="logo" className="object-cover" />
        <h1 className="text-center text-xl font-semibold">
          Signin To Your Panel
        </h1>
        <form action="" className=" flex flex-col gap-3">
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="name"
              placeholder="........@....com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="hs-toggle-password"
                type={isPasswordVisible ? "text" : "password"}
                className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
              >
                {isPasswordVisible ? <BsEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            <div className=" flex gap-2 items-center">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <h1>Forget Password</h1>
          </div>
          <button className="bg-orange-400 rounded-md text-white shadow-sm py-1 mx-8 mt-3">
            Signin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
