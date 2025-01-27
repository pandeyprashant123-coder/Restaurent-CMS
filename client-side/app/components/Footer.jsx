"use client";
import React from "react";
const Logo = "/assets/img/Foodi delivery-01 (1).png";
import { ImInstagram } from "react-icons/im";
import { ImFacebook } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { ImLinkedin2 } from "react-icons/im";
import { FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-[#414141] text-white w-full text-[12px]">
      <div className="px-20 container py-0 pt-2 ">
        <div className="flex flex-col md:flex-row justify-between my-0 py-0">
          {/* Left Section */}
          <div className="flex flex-col w-3/4 ">
            <img src={Logo} alt="logo" className="w-fit h-[40px]" />
            <p className="text-gray-300 mt-4">
              Subscribe to our newsletter to get the latest updates
            </p>
            <form className="relative flex flex-row p-2 -mx-2 w-[300px] h-[25px] bg-white rounded-lg m-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="p-2 rounded-md text-gray-800 focus:outline-none w-64"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 z-20 rounded-lg bg-orange-500 w-fit h-fit text-[10px] px-4 py-1 justify-center hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>

            <div className=" text-gray-300 flex flex-row gap-x-4">
              {/* Add your social media icons here */}
              <div className="bg-white rounded-full">
                <ImInstagram className="text-black text-2xl p-1" />
              </div>
              <div className="bg-white rounded-full">
                <ImFacebook className="text-black text-2xl p-1" />
              </div>
              <div className="bg-white rounded-full">
                <ImTwitter className="text-black text-2xl p-1" />
              </div>
              <div className="bg-white rounded-full">
                <ImLinkedin2 className="text-black text-2xl p-1" />
              </div>
              <div className="bg-white rounded-full">
                <FaPinterestP className="text-black text-2xl p-1" />
              </div>
            </div>
          </div>

          <div className="bg-[#484849] flex px-4 py-2 gap-x-14 w-full">
            {/* About Section */}
            <div className="flex flex-col text-gray-300 gap-y-2">
              <h1 className="text-[14px] text-white font-bold mb-2">About</h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <a href="/" className="hover:text-orange-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/categories" className="hover:text-orange-500">
                    Categories
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="flex flex-col text-gray-300 gap-y-2">
              <h1 className="text-[14px] text-white font-bold mb-2">
                Quick Links
              </h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <a href="/" className="hover:text-orange-500">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-orange-500">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-orange-500">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-orange-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-orange-500">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* For Users Section */}
            <div className="flex flex-col text-gray-300 gap-y-2">
              <h1 className="text-[14px] text-white font-bold mb-2">
                For Users
              </h1>
              <ul className="flex flex-col gap-y-2">
                <li>
                  <a href="/login" className="hover:text-orange-500">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-orange-500">
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-orange-500">
                    My Orders
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-orange-500">
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
      </div>

      <div className="text-center text-sm text-gray-500">
        <hr className="w-full mt-0" />
        <p className="mt-2">© Copyright 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
