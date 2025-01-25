import React, { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
const Checkout = () => {
  const [deliveryOption, setDeliveryOption] = useState("Home Delivery");
  const [tipAmount, setTipAmount] = useState(0);

  return (
    <div className="flex-col">
      <div className="p-4 py-6 bg-red-50 dark:bg-[#3d2f25] dark:text-white text-black font-sans font-semibold text-[14px] text-center justify-center">
        Checkout
      </div>
      <div className="flex flex-row">
        <div className="mx-28 w-full max-w-2xl">
          <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4 space-y-4  mt-2">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">
                Wants to Unlock more Features?
              </div>
              <div className="text-sm text-orange-500">Click here to login</div>
            </div>
            <div className="text-xl">
              <IoMdInformationCircleOutline />
            </div>
          </div>
          {/* Delivery Option Section */}
          <div className="bg-white shadow-lg rounded-lg p-4 space-y-4 mt-2">
            <h2 className="text-lg font-semibold mb-2">Delivery Option</h2>
            <div className="flex gap-4">
              {/* Home Delivery Option */}
              <div
                className={`${
                  deliveryOption === "Home Delivery"
                    ? "border-orange-500"
                    : "border-gray-300"
                } border-2 p-2 rounded-lg`}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Home Delivery"
                    checked={deliveryOption === "Home Delivery"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="form-radio text-orange-500"
                  />
                  <div className="flex flex-col">
                    <span>Home Delivery</span>
                    <span className="text-sm text-gray-500">(Charge: +$0)</span>
                  </div>
                </label>
              </div>

              {/* Take Away Option */}
              <div
                className={`${
                  deliveryOption === "Take Away"
                    ? "border-orange-500"
                    : "border-gray-300"
                } border-2 p-2 rounded-lg`}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Take Away"
                    checked={deliveryOption === "Take Away"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="form-radio text-orange-500"
                  />
                  <div className="flex flex-col">
                    <span>Take Away</span>
                    <span className="text-sm text-gray-500">(Free)</span>
                  </div>
                </label>
              </div>

              {/* Dine In Option */}
              <div
                className={`${
                  deliveryOption === "Dine In"
                    ? "border-orange-500"
                    : "border-gray-300"
                } border-2 p-2 rounded-lg`}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Dine In"
                    checked={deliveryOption === "Dine In"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="form-radio text-orange-500"
                  />
                  <div className="flex flex-col">
                    <span>Dine In</span>
                    <span className="text-sm text-gray-500">(Free)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on Delivery Option */}
          <div className="">
            {deliveryOption === "Home Delivery" && (
              <div className="space-y-4  p-4 mt-4 rounded-lg bg-white shadow-md">
                <h2 className="text-lg font-semibold">Deliver To</h2>
                <div className="p-4 border  ">
                  <p className="text-gray-700">
                    Please provide your full address for delivery:
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="w-full mt-2 p-2 border rounded-lg"
                  />
                </div>
                {/* Deliver To */}
                {/* <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Deliver To</h2>
                  <div className="border rounded-lg p-4">
                    <p className="text-red-500 mb-2">
                      No Contact Information Added
                    </p>
                    <p>F7CH+54J, Swargapuri Marg, Biratnagar 56613, Nepal</p>
                  </div>
                </div> */}
                {/* Delivery Man Tips */}
                <div className="mb-6  p-2 bg-white shadow-lg rounded-lg mt-4">
                  <div className="flex justify-between">
                    <div className="flex text-lg font-semibold mb-2 gap-x-2 items-center">
                      Delivery Man Tips
                      <div className=" ">
                        <IoMdInformationCircleOutline />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4  ">
                      <label
                        htmlFor="saveForLater"
                        className="text-gray-700 cursor-pointer"
                      >
                        Save for later
                      </label>
                      <input
                        type="checkbox"
                        id="saveForLater"
                        className="form-checkbox text-orange-500 border-gray-300 rounded focus:ring focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[0, 5, 10, 20].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTipAmount(amount)}
                        className={`px-4 py-2 rounded-lg border ${
                          tipAmount === amount
                            ? "bg-orange-500 text-white"
                            : "text-gray-700 border-gray-300"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Payment method */}
                <div className="mb-6  p-2 bg-white shadow-lg rounded-lg mt-4">
                  <div className="flex text-lg font-semibold mb-2 gap-x-2 items-center justify-between">
                    Payment Method
                    <div className=" border-2 border-orange-500 rounded-t-md rounded-e-md text-orange-400">
                      <MdOutlineEdit />
                    </div>
                  </div>

                  {/* saved payment method  */}
                  <div>
                    <input
                      type="text"
                      placeholder="Select your payment method"
                      className="w-full mt-2 p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex-col text-lg font-semibold mb-2 gap-x-2 items-center justify-between">
                    Additional Note
                    <div>
                      <textarea
                        type="text"
                        rows="4"
                        placeholder="Share any specific delivery details here."
                        className="w-full mt-2 p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {deliveryOption === "Take Away" && (
              <div className="flex-col space-y-4 ">
                <h2 className="text-lg font-semibold">Take Away Details</h2>
                <div className="p-4 border rounded-lg">
                  <p className="text-gray-700">
                    Your order will be ready for pickup. Choose a time:
                  </p>
                  <input
                    type="time"
                    className="w-full mt-2 p-2 border rounded-lg"
                  />
                </div>
              </div>
            )}

            {deliveryOption === "Dine In" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Dine In Details</h2>
                <div className="p-4 border rounded-lg">
                  <p className="text-gray-700">
                    Please reserve a table for your dine-in experience:
                  </p>
                  <input
                    type="number"
                    placeholder="Number of Guests"
                    className="w-full mt-2 p-2 border rounded-lg"
                  />
                  <input
                    type="date"
                    className="w-full mt-2 p-2 border rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Order Summary */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between mt-2">
            <span>Subtotal</span>
            <span>$200</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-red-500">(-) $60</span>
          </div>
          <div className="flex justify-between">
            <span>VAT/Tax (2%)</span>
            <span>(+) $2.80</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{deliveryOption === "Home Delivery" ? "$5" : "Free"}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>
              $
              {deliveryOption === "Home Delivery"
                ? 147.8
                : deliveryOption === "Take Away"
                ? 140
                : 140}
            </span>
          </div>
          {/* Place Order Button */}
          <div className="text-center">
            <button className="bg-orange-500 text-white py-3 px-6 rounded-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
