"use client";
import React, { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const PosForm = ({
  setShowForm,
  foods,
  foodId,
  setCart,
  cartData,
  setCartData,
}) => {
  const [quantity, setQuantity] = useState(1);

  const food = foods.find((food) => food._id === foodId);
  console.log(food);

  const HandleCart = () => {
    if (!food) return;

    const updatedCartItem = {
      cartItemId: uuidv4(),
      id: food.id,
      name: food.name,
      price: food.unitPrice,
      quantity: quantity,
      addonPrice: 100,
    };

    setCartData(updatedCartItem); // Update the current cart item
    setCart((prevCart) => [...prevCart, updatedCartItem]); // Add it directly to the cart
    setShowForm(false); // Close the form
  };

  if (!food) return null; // Handle invalid foodId

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#555252b5] absolute top-0 left-0 z-50">
      <div className="flex flex-col gap-3 bg-white p-8 rounded-lg shadow-md max-w-lg h-4/5  overflow-y-scroll">
        <div
          className="font-semibold text-xl text-end translate-x-6 -translate-y-9 cursor-pointer p-1 hover:text-gray-700"
          onClick={() => setShowForm(false)}
        >
          x
        </div>
        <div className="flex gap-3">
          <img
            src="/assets/img/food1.png"
            alt="food"
            className="object-cover rounded-xl h-24 w-24"
          />
          <div>
            <h1 className="text-lg font-semibold">{food.name}</h1>
            <span>${food.unitPrice}</span>
          </div>
        </div>
        <h1 className="text-lg font-semibold">Description</h1>
        <p>
          Menu Vada is crispy, fluffy, soft, and delicious lentil fritters from
          South Indian cuisine.
        </p>
        {food.variations &&
          food.variations.map((variation, index) => (
            <div key={index}>
              <h1 className="text-lg font-semibold">
                {variation.variationName}{" "}
                <span className="font-normal text-sm">(required)</span>
              </h1>
              <p className="text-sm text-gray-700">
                You need to select minimum 1 To maximum 2 Options
              </p>
              <div className="p-3">
                {variation?.options.map((option, index) => (
                  <div className="flex justify-between pr-10" key={index}>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="variationRequired"
                        className="mt-1 h-4 w-4 p-3 border border-gray-300 text-orange-300 rounded-md shadow-sm"
                      />
                      <label className="block  text-gray-700">
                        {option.name}
                      </label>
                    </div>
                    <h1 className="text-start">$ {option.additionalPrice}</h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        {food.addon && (
          <div>
            <h1 className="text-lg font-semibold">Addon</h1>
            <div className="h-20 w-20 rounded-sm mt-2  bg-gray-200 flex flex-col items-center justify-center">
              <span className="font-semibold ">Pepsi</span>
              <span className="font-semibold ">$100</span>
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Quantity:</h1>
          <div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-1 w-16 text-center"
            />
          </div>
        </div>
        <div>
          Total Price:{" "}
          <span className="font-semibold ml-2">
            ${food.unitPrice * quantity}
          </span>
        </div>

        <div className="flex justify-center text-white font-semibold text-lg">
          <div
            className="flex items-center justify-center gap-3 w-2/5 bg-blue-800 text-center p-2 rounded-lg cursor-pointer"
            onClick={HandleCart}
          >
            <IoMdCart />
            <h1>Add To Cart</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosForm;
