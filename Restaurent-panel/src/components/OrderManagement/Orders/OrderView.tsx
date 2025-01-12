import React from "react";
import { FcViewDetails } from "react-icons/fc";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { PiPersonBold, PiPrinterFill } from "react-icons/pi";
import foodImg from "../../../assets/food1.png";
import { RiProfileFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { FaJediOrder } from "react-icons/fa6";
import { BiShoppingBag } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";

const OrderView = () => {
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center gap-2 p-6 justify-between font-semibold text-xl">
        <div className="flex items-center gap-2">
          <FcViewDetails />
          <h1>Order Details</h1>
        </div>
        <div className="flex gap-3 ">
          <IoIosArrowBack
            data-tooltip-target="tooltip-top"
            data-tooltip-placement="top"
            className="bg-blue-50 text-blue-500 rounded-full p-2 text-4xl font-bold cursor-pointer hover:bg-blue-500 hover:text-white duration-150"
          />
          <div
            id="tooltip-top"
            role="tooltip"
            className="absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Previous Order
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <IoIosArrowForward
            data-tooltip-target="tooltip-top-1"
            data-tooltip-placement="top"
            className="bg-blue-50 text-blue-500 rounded-full p-2 text-4xl font-bold cursor-pointer hover:bg-blue-500 hover:text-white duration-150"
          />
          <div
            id="tooltip-top-1"
            role="tooltip"
            className="absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Next Order
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
      <div className="mx-6 flex gap-3 ">
        <div className="border  rounded-md w-2/3">
          <div className="grid grid-cols-2 py-4">
            <div className="flex flex-col gap-2 px-4">
              <h1 className="font-semibold text-xl">Order #100160</h1>
              <div className="flex gap-2 text-sm">
                <p>Placed Date :</p>{" "}
                <p className="font-semibold"> 03 Dec 2024 03:39 am</p>
              </div>
              <div className="flex gap-1 text-sm">
                <p>Din-in Date :</p>{" "}
                <p className="font-semibold"> 03 Dec 2024 04:09 pm</p>
              </div>
              <div>
                <button className="p-1 border border-[#006fbd] flex gap-1 rounded-md text-[#006fbd] items-center hover:bg-[#006fbd] hover:text-gray-100 duration-150">
                  <CiLocationOn />
                  <span className="text-sm">Show Locations On Map</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-end px-4">
              <div>
                <button className="flex gap-2 items-center bg-[#006fbd] hover:bg-[#175e91] text-white py-2 px-5 rounded-md">
                  <PiPrinterFill />
                  <h1>Print Invoice</h1>
                </button>
              </div>

              <div className="text-sm flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>Status :</span>
                  <span className="text-blue-600 p-1 rounded-md font-semibold bg-blue-50">
                    Pending
                  </span>
                </div>
                <div className="flex justify-between gap-1">
                  <span>Payment method :</span>
                  <span className="font-semibold">Cash on delivery</span>
                </div>
                <div className="flex justify-between gap-1">
                  <span> Payment status :</span>
                  <span className="text-red-500 font-semibold">Unpaid </span>
                </div>
                <div className="flex justify-between gap-1">
                  <span>Order Type : </span>
                  <span className="font-semibold">Dine In</span>
                </div>
                <div className="flex justify-between gap-1">
                  <span>Cutlery :</span>
                  <span className="text-red-500 font-semibold">No</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 py-4">
            <div>
              <div className="font-semibold p-5 bg-blue-50">Item Details</div>
              <div className="flex text-base gap-3 px-5 pt-2">
                <img
                  src={foodImg}
                  alt="foodImg"
                  className="h-20 w-20 scale-90 rounded-md"
                />
                <div>
                  <h1 className="font-semibold">Chicken Swarma</h1>
                  <h1 className="font-semibold">Size - </h1>
                  <div className="ml-3">
                    Small : <span className="font-semibold">$ 210.00</span>{" "}
                  </div>
                  <div className="ml-3">
                    Medium : <span className="font-semibold">$ 310.00</span>{" "}
                  </div>
                  <div>
                    <span className="font-semibold">Price : </span> $ 730.00
                  </div>
                  <div>
                    <span className="font-semibold">Qty : </span> 1
                  </div>
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-2">
              <div>
                <h1 className="font-semibold p-5 bg-blue-50 text-right">
                  Addons
                </h1>
              </div>
              <div className="">
                <h1 className="font-semibold flex justify-end p-5 bg-blue-50">
                  Price
                </h1>
                <div className="flex text-base justify-end gap-3 px-5 pt-2 font-semibold">
                  <h1>$ 730.00</h1>
                </div>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 p-4">
            <div></div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Delivery man tips:</h1>
                <h1 className=" text-gray-500">$ 520.00</h1>
              </div>
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Addon Cost:</h1>
                <h1 className=" text-gray-500">$ 520.00</h1>
              </div>
              <hr className="ml-20" />
              <div className="flex justify-end gap-24 mt-3">
                <h1 className="font-semibold text-right">Subtotal :</h1>
                <h1 className=" text-gray-500">$ 520.00</h1>
              </div>
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Discount :</h1>
                <h1 className=" text-gray-500">- $ 520.00</h1>
              </div>
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Coupon discount:</h1>
                <h1 className=" text-gray-500">- $ 520.00</h1>
              </div>
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Vat/tax :</h1>
                <h1 className=" text-gray-500">+$ 520.00</h1>
              </div>
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Delivery man tips</h1>
                <h1 className=" text-gray-500">+$ 520.00</h1>
              </div>
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Delivery fee :</h1>
                <h1 className=" text-gray-500">+$ 520.00</h1>
              </div>
              <div className="flex justify-end gap-24">
                <h1 className="font-semibold text-right">Service Charge :</h1>
                <h1 className=" text-gray-500">+$ 520.00</h1>
              </div>
              <hr className="ml-20" />
              <div className="flex justify-end gap-24 mt-4">
                <h1 className="font-semibold text-right">Total :</h1>
                <h1 className=" text-gray-500">$ 520.00</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-1/3">
          <div className="border p-6 rounded-md flex flex-col gap-5 ">
            <button className="font-semibold border-b p-3">Order Setup</button>
            <button className="bg-[#006fbd] hover:bg-[#145482] duration-150 text-white p-2 rounded-md">
              Confirm Order
            </button>
            <button className="border border-red-500 text-red-500 p-2 hover:bg-red-500 hover:text-white duration-150 rounded-md">
              Cancel Order
            </button>
          </div>
          <div className="border p-6 rounded-md flex flex-col gap-5 ">
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Table Number
              </label>
              <input
                type="number"
                name="name"
                placeholder="Ex: 10"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Token Number
              </label>
              <input
                type="number"
                name="name"
                placeholder="Ex:32"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
              />
            </div>
            <button className="bg-[#006fbd] hover:bg-[#145482] duration-150 text-white p-2 rounded-md">
              Save
            </button>
          </div>
          <div className="border p-6 rounded-md ">
            <div className="flex items-center gap-2 text-gray-600 font-semibold p-2">
              <IoPerson />
              <h1>Customer Info </h1>
            </div>
            <div className="flex gap-3 text-sm">
              <img
                src=""
                alt="profile pic"
                className="h-20 w-20 rounded-full"
              />
              <div>
                <h1 className="font-semibold">Jane Doe</h1>{" "}
                <div>
                  {" "}
                  <span className="font-semibold">17</span>Orders
                </div>
                <h1 className="font-bold">+8**********</h1>
                <span>j**********@example.com</span>
              </div>
            </div>
          </div>
          <div className="border p-6 rounded-md ">
            <div className="flex items-center gap-2 text-gray-600 font-semibold p-2">
              <HiShoppingCart />
              <h1>Order Info </h1>
            </div>
            <div className="text-sm">
              <div>
                <span className="text-gray-600">
                  Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                Test
              </div>
              <div>
                <span className="text-gray-600">
                  Contact &nbsp;&nbsp;&nbsp;:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                +8**********
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
