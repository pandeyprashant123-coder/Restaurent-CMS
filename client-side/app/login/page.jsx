"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BsEye } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [vendorCredentials, setVendorCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/vendor-dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVendorCredentials((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, rememberMe } = vendorCredentials;

    try {
      const response = await axios.post(
        "login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Login Successful");
      login(response.data.token, rememberMe); // Pass token and rememberMe to AuthContext
      router.push("/vendor-dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Authentication failed"
      );
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex">
      <ToastContainer />
      <div
        className="w-3/5 h-full flex gap-4 items-center"
        style={{
          backgroundImage: `url("/assets/img/LoginFoodImg.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-5 pl-10 justify-center bg-[#ff8809e4] text-white w-3/5 h-3/5">
          <div className="text-5xl font-semibold">
            <h1 className="mb-2">WELCOME TO</h1>
            <h1>FOODI</h1>
          </div>
          <p className="text-xl">Manage your app & website easily</p>
        </div>
      </div>
      <div className="w-2/5 justify-center px-6 flex gap-4 flex-col">
        <div className="flex justify-center">
          <img
            src="/assets/img/Foodidelivery.png"
            alt="logo"
            className="object-cover w-2/3"
          />
        </div>
        <h1 className="text-center text-xl font-semibold">
          Signin To Your Panel
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={vendorCredentials.email}
              onChange={handleChange}
              placeholder=".....@....com"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={vendorCredentials.password}
                onChange={handleChange}
                required
                className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400"
              >
                {isPasswordVisible ? <BsEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={vendorCredentials.rememberMe}
                onChange={handleChange}
              />
              <label>Remember Me</label>
            </div>
            <a
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-orange-400 rounded-md text-white shadow-sm py-1 mx-8 mt-3"
          >
            Signin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
