import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import itemdata from "../data/productData.json";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const BestReviewed = ({ popup, setPopup, foodId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [addons, setAddons] = useState([]);
  const data = itemdata.find((item) => item.id === foodId);

  const handleAddonToggle = (addon) => {
    if (addons.includes(addon)) {
      setAddons(addons.filter((item) => item !== addon));
    } else {
      setAddons([...addons, addon]);
    }
  };

  const calculateTotal = () => {
    let basePrice = data.price;
    if (selectedSize === "Large") basePrice += 750;
    else if (selectedSize === "Small") basePrice += 400;

    const addonPrice = addons.reduce((sum, addon) => sum + addon.price, 0);
    return basePrice * quantity + addonPrice;
  };

  const handleCart = () => {
    const cartItem = { cartInfo: data, quantity, size: selectedSize, addons };
    console.log("Dispatching to cart:", cartItem); // Log the item being dispatched
    dispatch(addToCart(cartItem)); // Dispatch to Redux store
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="relative pt-2 bg-white dark:bg-black text-black dark:text-white px-4 rounded-lg overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="absolute top-2 right-2 z-20">
          <IoClose
            className="text-[20px] cursor-pointer"
            onClick={() => setPopup(false)}
          />
        </div>
        <div className="flex-col">
          <div className="flex">
            <img src={data.image} alt="" className="h-40 w-40" />
            <div className="flex-col mx-4">
              <h2 className="text-white font-bold text-xl">{data.title}</h2>
              <p className="text-orange-400">{data.restaurant}</p>
              <span className="absolute top-2 right-2 text-[#f0cda2] text-2xl font-bold z-10">
                <IoMdHeart className="relative top-10 text-[#f0cda2] outline-heart" />
                <IoMdHeart className="absolute top-10 left-0 text-[#ffffff] -z-10 scale-[1.15]" />
              </span>
            </div>
          </div>
          {/* Description */}
          <div className="mt-4 max-w-lg">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-sm text-gray-300 mt-2 ">{data.description}</p>
          </div>

          {/* Size Options */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Size</h3>
            <p className="text-sm text-gray-400 mb-2">Select One</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="size"
                  value="Small"
                  className="form-radio"
                  onChange={(e) => setSelectedSize(e.target.value)}
                />
                <span className="text-sm">Small + $400</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="size"
                  value="Large"
                  className="form-radio"
                  onChange={(e) => setSelectedSize(e.target.value)}
                />
                <span className="text-sm">Large + $750</span>
              </label>
            </div>
          </div>

          {/* Addons */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Addons</h3>
            <p className="text-sm text-gray-400 mb-2">Optional</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() =>
                    handleAddonToggle({ name: "Pepsi", price: 18 })
                  }
                />
                <span className="text-sm">Pepsi + $18</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() =>
                    handleAddonToggle({ name: "Extra Meat", price: 14 })
                  }
                />
                <span className="text-sm">Extra Meat + $14</span>
              </label>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex-col w-full sticky bottom-0 pt-12 gap-y-4 flex items-center justify-between bg-white dark:bg-black">
          <div className="flex justify-between items-center w-full">
            <div className="text-xl font-bold">Total Amount:</div>
            <span> ${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex w-full gap-x-2 mb-2 justify-center items-center">
            <div className="flex items-center space-x-4 ">
              <button
                className="bg-gray-700 text-white px-3 py-1 rounded"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                className="bg-gray-700 text-white px-3 py-1 rounded"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="sticky w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
              onClick={handleCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestReviewed;
