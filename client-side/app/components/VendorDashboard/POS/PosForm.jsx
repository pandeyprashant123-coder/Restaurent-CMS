"use client";
import React, { useState, useRef } from "react";
import { IoMdCart } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import axios from "../../../axios";
import { toast, ToastContainer } from "react-toastify";

const PosForm = ({
  setShowForm,
  foods,
  foodId,
  // setCart,
  // cartData,
  // setCartData,
}) => {
  const formRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [variations, setVariations] = useState([]);
  const [addons, setAddons] = useState([]);

  const [invalidVariations, setInvalidVariations] = useState([]);

  const food = foods.find((food) => food._id === foodId);
  const handleShowForm = () => {
    setShowForm(false);
    setAddons([]);
    setVariations([]);
    setQuantity(1);
    const inputs = formRef.current.querySelectorAll(
      "input[type='checkbox'], input[type='radio'],input[type='number']"
    );
    inputs.forEach((input) => (input.checked = false));
    setInvalidVariations([]);
  };

  const handleMultipleOptionChange = (variationName, option) => {
    setVariations((prev) => {
      // Check if the variation already exists in the state
      const existingVariation = prev.find((v) => v.name === variationName);

      if (existingVariation) {
        // Check if the option is already selected
        const isOptionSelected = existingVariation.options.some(
          (o) => o.name === option.name
        );

        if (isOptionSelected) {
          // Remove the option if it's already selected
          return prev.map((v) =>
            v.name === variationName
              ? {
                  ...v,
                  options: v.options.filter((o) => o.name !== option.name),
                }
              : v
          );
        } else {
          // Add the new option to the existing variation
          return prev.map((v) =>
            v.name === variationName
              ? {
                  ...v,
                  options: [...v.options, option],
                }
              : v
          );
        }
      } else {
        // Add a new variation with the selected option
        return [...prev, { name: variationName, options: [option] }];
      }
    });
  };

  const handleSingleOptionChange = (variationName, option) => {
    setVariations((prev) => {
      const existingVariation = prev.find((v) => v.name === variationName);
      if (existingVariation) {
        // Replace the selected option for this variation
        return prev.map((v) =>
          v.name === variationName ? { ...v, options: [option] } : v
        );
      } else {
        // Add a new variation with the selected option
        return [...prev, { name: variationName, options: [option] }];
      }
    });
  };
  const calculateDiscountedPrice = () => {
    const price = food.unitPrice;
    if (food.discountType === "Amount") {
      return price - food.discount;
    } else {
      return price - price * food.discount;
    }
  };
  const calculateTotal = () => {
    if (!food) return 0;

    // Base price (food price * quantity)
    const basePrice =
      (calculateDiscountedPrice().toFixed() || 0) * (quantity || 0);

    // Total additional price from variations
    const variationsPrice = variations.reduce((total, variation) => {
      const variationOptionsPrice = variation.options.reduce(
        (sum, option) => sum + (option.additionalPrice || 0),
        0
      );
      return total + variationOptionsPrice;
    }, 0);

    // Total additional price from addons (considering their quantities)
    const addonsPrice = addons.reduce((total, addon) => {
      const addonDetails = food.addons.find((a) => a._id === addon._id);
      return addonDetails
        ? total + (addonDetails.price || 0) * (addon.quantity || 0)
        : total;
    }, 0);

    // Calculate the final total
    return basePrice + variationsPrice + addonsPrice;
  };

  const HandleCart = async () => {
    if (!food) return;

    // Validate required variations
    const missingRequiredVariations = food.variations.filter((variation) => {
      if (variation.required) {
        const selectedVariation = variations.find(
          (v) => v.name === variation.variationName
        );
        return !selectedVariation || selectedVariation.options.length === 0;
      }
      return false;
    });

    if (missingRequiredVariations.length > 0) {
      setInvalidVariations(
        missingRequiredVariations.map((v) => v.variationName)
      );
      return;
    }
    setInvalidVariations([]);

    const updatedCartItem = {
      food: food._id,
      quantity: quantity,
      variations: variations,
      addons: addons.map((item) => ({
        addon: item._id,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotal(),
    };
    console.log(updatedCartItem);
    try {
      const res = await axios.post("/cart", updatedCartItem);
      console.log(res.data.message);
      toast(res.data.message);
    } catch (error) {
      console.log(error);
      toast("Unable to add to cart");
    }
    // setCart((prevCart) => [...prevCart, updatedCartItem]);
    handleShowForm();
  };

  if (!food) return null;

  return (
    <>
      <div
        className="flex relative flex-col gap-3 bg-white p-8 rounded-lg shadow-md w-5/12 h-4/5 overflow-y-scroll"
        ref={formRef}
      >
        <div
          className="font-semibold text-xl text-end fixed top-[4rem] right-[26.6rem] cursor-pointer p-1 hover:text-gray-700 text-red-500"
          onClick={handleShowForm}
        >
          x
        </div>
        <div className="relative flex gap-7">
          <h1 className="absolute top-0 left-0 text-white bg-red-500 text-sm font-semibold px-3 rounded-md">
            {food.foodType}
          </h1>
          <img
            src="/assets/img/food1.png"
            alt="food"
            className="object-cover rounded-md h-24 w-24"
          />
          <div>
            <h1 className="text-xl font-semibold">{food.name}</h1>
            <div className="text-xl text-gray-600 flex items-center gap-2">
              <h1>${calculateDiscountedPrice()} </h1>
              <h1 className="text-sm">
                <del>${Number(food.unitPrice)}</del>
              </h1>
            </div>
            <div className="font-semibold mt-3">
              Discount: {food.discountType == "Amount" && "$"}
              {food.discount}
              {food.discountType == "Percent" && "%"}
            </div>
          </div>
        </div>
        <h1 className="text-lg font-semibold">Description</h1>
        <p>{food.description}</p>
        {food?.variations[0]?.variationName &&
          food.variations?.map((variation, variationIndex) => (
            <div key={variationIndex}>
              <h1
                className={`text-lg font-semibold ${
                  invalidVariations.includes(variation.variationName)
                    ? "text-red-600"
                    : ""
                }`}
              >
                {variation.variationName}{" "}
                <span className="font-normal text-sm">
                  {variation.required ? "(required)" : "(optional)"}
                </span>
              </h1>
              {variation.required && (
                <p className="text-sm text-gray-700">
                  You need to select minimum 1 To maximum 2 Options
                </p>
              )}
              <div className="p-3">
                {variation?.options.map((option, optionIndex) => (
                  <div className="flex justify-between pr-10" key={optionIndex}>
                    <div className="flex gap-2">
                      {variation.selectionType === "multiple" && (
                        <input
                          type="checkbox"
                          id="variationType"
                          className="mt-1 h-4 w-4 p-3 border border-gray-300 text-orange-300 rounded-md shadow-sm"
                          onChange={() =>
                            handleMultipleOptionChange(
                              variation.variationName,
                              {
                                name: option.name,
                                additionalPrice: option.additionalPrice,
                              }
                            )
                          }
                        />
                      )}
                      {variation.selectionType === "single" && (
                        <input
                          type="radio"
                          id="variationType"
                          name={`variation-${variationIndex}`}
                          className="mt-1 h-4 w-4 p-3 border border-gray-300 text-orange-300 rounded-md shadow-sm"
                          onChange={() =>
                            handleSingleOptionChange(variation.variationName, {
                              name: option.name,
                              additionalPrice: option.additionalPrice,
                            })
                          }
                        />
                      )}
                      <label className="block text-gray-700">
                        {option.name}
                      </label>
                    </div>
                    <h1 className="text-start">$ {option.additionalPrice}</h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        {food.addons[0] && (
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Addons</h1>
            <div className="flex flex-wrap gap-3 items-center">
              {food.addons?.map((addon) => {
                const existingAddon = addons.find((a) => a._id === addon._id); // Check if addon is already selected
                const quantity = existingAddon ? existingAddon.quantity : 0;
                const isActive = existingAddon?.active || false;

                return (
                  <div
                    key={addon._id}
                    className={`relative h-24 w-24 p-4 rounded-sm mt-2 text-sm flex flex-col items-center justify-center cursor-pointer duration-100 transition-all ${
                      quantity > 0 ? " bg-orange-400" : "bg-gray-200"
                    }`}
                    onClick={() => {
                      // Set the addon as active and initialize its quantity if needed
                      setAddons((prev) => {
                        const existing = prev.find((a) => a._id === addon._id);
                        if (existing) {
                          return prev.map((a) =>
                            a._id === addon._id ? { ...a, active: true } : a
                          );
                        } else {
                          return [
                            ...prev,
                            { _id: addon._id, quantity: 1, active: true },
                          ];
                        }
                      });
                    }}
                  >
                    <span className="font-semibold text-center">
                      {addon.name}
                    </span>
                    <span className="font-semibold">${addon.price}</span>

                    {/* Show Incrementor/Decrementor only when active */}
                    {isActive && (
                      <div className="flex absolute w-full font-semibold text-lg bg-gray-100 rounded justify-between -bottom-6 gap-2 mt-2 items-center">
                        {/* Decrement Button */}
                        <button
                          className="px-2 py-1 bg-white  rounded"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event from triggering
                            setAddons(
                              (prev) =>
                                prev
                                  .map((a) =>
                                    a._id === addon._id
                                      ? { ...a, quantity: a.quantity - 1 }
                                      : a
                                  )
                                  .filter((a) => a.quantity > 0) // Remove addon if quantity reaches 0
                            );
                          }}
                          disabled={quantity === 0} // Disable if quantity is already 0
                        >
                          -
                        </button>

                        {/* Quantity Display */}
                        <span className="text-center text-sm">{quantity}</span>

                        {/* Increment Button */}
                        <button
                          className="px-2 py-1 bg-white  rounded"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event from triggering
                            setAddons((prev) =>
                              prev.map((a) =>
                                a._id === addon._id
                                  ? { ...a, quantity: a.quantity + 1 }
                                  : a
                              )
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg font-semibold">Quantity:</h1>
          <div className="flex items-center gap-2 text-xl font-semibold  rounded-md">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-2 py-1 text-gray-500 hover:text-gray-700"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-12 text-center border py-2 px-5"
              style={{
                appearance: "textfield",
                MozAppearance: "textfield", // Firefox
                WebkitAppearance: "none", // Safari/Chrome
              }}
            />
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-2 py-1 text-gray-500 hover:text-gray-700"
            >
              +
            </button>
          </div>
        </div>

        <div>
          Total Price:{" "}
          <span className="font-semibold ml-2">${calculateTotal()}</span>
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
    </>
  );
};

export default PosForm;
