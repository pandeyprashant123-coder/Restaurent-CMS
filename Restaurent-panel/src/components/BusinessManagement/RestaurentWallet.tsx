import React from "react";
import { FaWallet } from "react-icons/fa6";

import moneyImg from "../../assets/money.png";
import withdraw from "../../assets/w_balance.png";
import imagePending from "../../assets/image_pending.png";
import withdrawbalance from "../../assets/image_withdaw.png";
import { VscInfo } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";

const list = [0];
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
            <img src={withdrawbalance} alt="" className="w-8 h-8" />
          </div>
          <p className="text-sm text-gray-500 font-semibold">
            Pending withdraw
          </p>
        </div>
        <div className="flex flex-col p-5 bg-blue-100 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">$ 11,080.78</h1>
            <img src={moneyImg} alt="" className="w-8 h-8" />
          </div>
          <p className="text-sm text-gray-500 font-semibold">
            Pending withdraw
          </p>
        </div>
      </div>
      <div className="my-4 mx-3 rounded-md border">
        <div className="p-3">
          <h1>Withdraw Request</h1>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className=" bg-slate-100 ">
              <th className="py-5 text-center  font-semibold text-base">SI</th>
              <th className="text-center py-2 pl-5  font-semibold text-base">
                Amount
              </th>
              <th className="text-center py-2 pl-5  font-semibold text-base">
                Request Time
              </th>
              <th className="text-center py-2  font-semibold text-base">
                Withdraw method
              </th>
              <th className="text-center py-2  font-semibold text-base">
                Transaction Type
              </th>
              <th className="text-center py-2  font-semibold text-base">
                Status{" "}
              </th>
              <th className="text-center py-2  font-semibold text-base">
                Note
              </th>
              <th className="text-center py-2  font-semibold text-base">
                Action{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="pl-2 text-center">{index}</td>
                <td className="pl-2 text-center">
                  <img src="" alt="" />
                  <h1>{item.name}</h1>
                </td>
                <td className="pl-2 text-center">{item.category}</td>
                <td className="pl-2 text-center">{item.unitPrice}</td>
                <td className="pl-2 text-center"></td>
                <td className="pl-2 text-center"></td>
                <td className="pl-2 text-center"></td>
                <td className="text-center flex justify-center gap-2">
                  <button className="text-red-500 p-1 my-5 border border-red-300 rounded-md">
                    <MdDeleteForever className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurentWallet;
