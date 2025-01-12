import React from "react";
import { FaWallet } from "react-icons/fa6";

import moneyImg from "../../assets/money.png";
import withdraw from "../../assets/w_balance.png";
import imagePending from "../../assets/image_pending.png";
import { VscInfo } from "react-icons/vsc";

const RestaurentWallet = () => {
  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <div className="flex items-center gap-2 p-6 font-semibold text-xl">
        <FaWallet />
        <h1>Restaurant wallet</h1>
      </div>
      <div className="grid grid-cols-4 gap-5 m-3">
        <div className="flex flex-col gap-2 py-3 pl-7 pr-3 shadow bg-white rounded-md">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">$ 733.23</h1>
            <img src={moneyImg} alt="" className="w-8 h-8" />
          </div>
          <span className="text-sm text-gray-500 font-semibold">
            Cash in Hand &#9432;
          </span>
        </div>
        <div className="flex flex-col gap-2 py-3 pl-7 pr-3 shadow bg-white rounded-md">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">$ 1,634.00</h1>
            <img src={withdraw} alt="" className="w-8 h-8" />
          </div>
          <span className="text-sm text-gray-500 font-semibold">
            withdraw able balance
          </span>
        </div>
        <div className="flex flex-col col-span-2 gap-2 py-3 pl-7 pr-3 shadow bg-white rounded-md">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">$ 2,367.23</h1>
          </div>
          <div className="text-sm text-gray-500 font-semibold">
            Balance <span className="text-xs font-normal">Unadjusted</span>
          </div>
          <div className="flex gap-3 mt-2">
            <button className="btnBlue flex items-center gap-2 px-5 py-2">
              <h1>Adjust with Wallet</h1> <VscInfo />
            </button>
            <button className="btnBlue flex items-center gap-2 px-5 py-2">
              <h1>Request Withdraw</h1> <VscInfo />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 m-3 ">
        <div className="flex flex-col p-5 bg-red-100 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">$ 11,080.78</h1>
            <img src={imagePending} alt="" className="w-8 h-8" />
          </div>
          <p className="text-sm text-gray-500 font-semibold">
            Pending withdraw
          </p>
        </div>
        <div className="flex flex-col p-5 bg-green-100 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">$ 11,080.78</h1>
            <img src={imagePending} alt="" className="w-8 h-8" />
          </div>
          <p className="text-sm text-gray-500 font-semibold">
            Pending withdraw
          </p>
        </div>
        <div className="flex flex-col p-5 bg-blue-100 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">$ 11,080.78</h1>
            <img src={imagePending} alt="" className="w-8 h-8" />
          </div>
          <p className="text-sm text-gray-500 font-semibold">
            Pending withdraw
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurentWallet;
