import React from "react";
import { IoMdOpen } from "react-icons/io";
import banner from "../../assets/RestroBanner.png";
import icon from "../../assets/hotelIcon.png";

import hand from "../../assets/Handshake.png";
import commission from "../../assets/commission.png";
import vat from "../../assets/vat.png";
import phone from "../../assets/phone.png";
import Address from "../../assets/address.png";
import { MdAnnouncement } from "react-icons/md";

const MyShop = () => {
  return (
    <div className="m-6 bg-white shadow border rounded-md">
      <div className="flex justify-between p-3">
        <div className="">
          <h1 className="font-semibold">Shop Details</h1>
          <p className="text-gray-500">Created at 20 Aug 2021 09:11 pm</p>
        </div>
        <div className="flex gap-2 items-center bg-blue-500 text-white px-3 py-1 rounded-md">
          <IoMdOpen />
          <h1>Edit Shop</h1>
        </div>
      </div>
      <div className="grid grid-rows-2 h-[27rem] shadow rounded-md m-3">
        <div>
          <img src={banner} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-8 py-4 px-6">
          <img src={icon} alt="" className="h-36 w-36 -translate-y-10" />
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-lg">Hungry Puppets</h1>
            <div className="flex gap-9 flex-wrap items-center">
              <div className="text-sm flex gap-2 items-center">
                <img src={hand} alt="" />
                <div>
                  <h1 className="font-semibold">Business Model</h1>
                  <span className="text-base text-gray-500">
                    Commission Base
                  </span>
                </div>
              </div>
              <div className="text-sm flex gap-2 items-center">
                <img src={commission} alt="" />
                <div>
                  <h1 className="font-semibold">Admission Commission</h1>
                  <span className="text-base text-gray-500">10 %</span>
                </div>
              </div>
              <div className="text-sm flex gap-2 items-center">
                <img src={vat} alt="" />
                <div>
                  <h1 className="font-semibold">Vat/Tax</h1>
                  <span className="text-base text-gray-500">5 %</span>
                </div>
              </div>
              <div className="text-sm flex gap-2 items-center">
                <img src={phone} alt="" />
                <div>
                  <h1 className="font-semibold">Phone</h1>
                  <span className="text-base text-gray-500">+1*********</span>
                </div>
              </div>
              <div className="text-sm flex gap-2 items-center">
                <img src={Address} alt="" />
                <div>
                  <h1 className="font-semibold">Address</h1>
                  <span className="text-base text-gray-500">
                    House: 00, Road: 00, Test City
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-3 rounded-md border">
        <div className="p-3 border-b flex justify-between">
          <div className="flex items-center gap-2 ">
            <MdAnnouncement />
            <h1 className="font-semibold">Announcement &#9432;</h1>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="m-5">
          <textarea
            name="description"
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
          />
        </div>
        <div className="flex justify-end p-5">
          <button className="bg-[#006fbd] py-1 px-4 rounded-md text-white">
            Publsih
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyShop;
