"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../axios";
import { toast, ToastContainer } from "react-toastify";

import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(""); // Access items from Redux state
  //   const dispatch = useDispatch();
  const [delivaryOptions, setDelivaryOptions] = useState(false);
  const [delivaryFee, setDelivaryFee] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("Home Delivery");
  const [delivaryAddress, setDelivaryAddress] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("cart");
        setCart(res.data.cart?.items);
        setCartId(res.data.cart?._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(JSON.stringify(cart));

  const handleQuantityChange = async (type, quantity, id) => {
    let newQuantity = 0;
    if (type === "decrease") {
      newQuantity = Math.max(1, quantity - 1);
    } else {
      newQuantity = quantity + 1;
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      const res = await axios.put(`cart/${id}`, { quantity: newQuantity });
      toast(res.data.message);
    } catch (error) {
      console.log(error);
      toast("Unable to update quantity");
    }
  };

  const deleteCart = async (id) => {
    const food = cart.filter((item) => item._id !== id);
    setCart(food);
    try {
      const res = await axios.delete(`cart/${id}`);
      toast(res.data.message);
    } catch (error) {
      console.log(error);
      toast("Unable to delete Item");
    }
  };
  const handleClearCart = async () => {
    setCart([]);
    setDiscount(0);
    setDelivaryFee(0);
    setExtraDiscount(0);
    setVat(0);
    setServiceCharge(0);
    try {
      const res = await axios.delete(`clear-cart`);
      toast(res.data.message);
    } catch (error) {
      console.log(error);
      toast("Unable to delete Item");
    }
  };

  const totalAddonPrice = () => {
    return cart?.reduce(
      (total, item) =>
        total +
        item.addons.reduce(
          (addonTotal, addon) =>
            addonTotal + parseInt(addon.addon.price, 10) * addon.quantity,
          0
        ),
      0
    );
  };
  const calculateSubtotal = () => {
    return cart?.reduce(
      (acc, item) => acc + item.food.unitPrice * item.quantity,
      0
    );
  };
  const calculateDiscount = () => {
    return cart?.reduce((totalDiscount, item) => {
      const discount =
        item.food.discountType === "Amount"
          ? parseFloat(item.food.discount || 0)
          : (item.food.unitPrice * parseFloat(item.food.discount || 0)) / 100;
      return totalDiscount + discount * item.quantity;
    }, 0);
  };
  const variationsPrice = () => {
    return cart?.reduce((total, cartItem) => {
      const variationOptionsPrice =
        cartItem.variations?.reduce((sum, variation) => {
          const optionsPrice = variation.options?.reduce(
            (optionSum, option) => {
              return optionSum + (option.additionalPrice || 0);
            },
            0
          );
          return sum + optionsPrice;
        }, 0) || 0;
      return total + variationOptionsPrice;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const variationAdditionalPrice = variationsPrice();
    const addonPrice = totalAddonPrice();
    const discount = calculateDiscount();
    return subtotal + variationAdditionalPrice + addonPrice - discount;
  };
  console.log(cart);
  const calculateFinalTotal = () => {
    const subTotal = calculateTotal();
    return subTotal + delivaryFee;
  };
  const hangleCheckout = () => {
    if (cart.length > 0) {
      setDelivaryOptions(true);
    }
  };

  const handlePlaceOrder = async () => {
    const address = delivaryAddress.split(",");
    const shippingAddress = {
      city: address[0],
      state: address[1],
      country: address[2],
      area: address[3],
      landmark: address[4],
      alternate_number: address[5],
    };
    const orderDetails = {
      cartId,
      shippingAddress,
      restaurant: cart[0]?.food?.restaurant,
      paymentMethod: "COD",
      deliveryOption,
      totalPrice: calculateFinalTotal(),
    };
    try {
      const res = await axios.post("orders", orderDetails);
      toast(res.data.message);
    } catch (error) {
      toast("unable to place order");
      console.log(error);
    }
    setCart([]);
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-6">
        {/* Left Section: Cart Items */}
        {!delivaryOptions ? (
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">My Cart</h2>
            {cart?.length > 0 ? (
              <ul>
                {cart?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b py-4"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Item Image */}
                      <img
                        src={item.food.image} // Corrected image path
                        alt={item.food.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      {/* Item Details */}
                      <div>
                        <p className="font-medium">{item.food.name}</p>
                        <p className="font-medium">${item.food.unitPrice}</p>
                        {item?.addons.length > 0 && (
                          <div className="font-medium flex gap-2 items-center">
                            Addons:{" "}
                            {item.addons.map((addon, index) => (
                              <div
                                key={index}
                                className="font-normal text-gray-600 text-base"
                              >
                                {addon.addon.name}({addon.quantity})
                              </div>
                            ))}
                          </div>
                        )}
                        {item?.variations.length > 0 && (
                          <div className="font-medium flex gap-2 items-center">
                            Variations:{" "}
                            {item.variations.map((variation, index) => (
                              <div
                                key={index}
                                className="font-normal text-gray-600 text-base"
                              >
                                {variation.name}(
                                {variation.options?.map((option) => (
                                  <>{option.name}</>
                                ))}
                                )
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Quantity and Remove Controls */}
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-lg font-bold px-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(
                            "decrease",
                            item.quantity,
                            item?._id
                          )
                        }
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        className="text-lg font-bold px-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(
                            "increase",
                            item.quantity,
                            item?._id
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteCart(item?._id)}
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
        ) : (
          <DeliveryInput
            delivaryFee={delivaryFee}
            setDelivaryFee={setDelivaryFee}
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
            delivaryAddress={delivaryAddress}
            setDelivaryAddress={setDelivaryAddress}
          />
        )}

        {/* Right Section: Order Summary */}
        <div className="w-full md:w-1/3 ">
          <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {delivaryOptions ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Sub Total</p>
                  <p>${calculateSubtotal()}</p>
                </div>
                <div className="flex justify-between">
                  <p>VAT/Tax</p>
                  <p>$0</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivary Fee</p>
                  <p>${delivaryFee}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Item Price</p>
                  <p>${calculateSubtotal()}</p>
                </div>
                <div className="flex justify-between">
                  <p>Varations</p>
                  <p>(+) ${variationsPrice()}</p>
                </div>
                <div className="flex justify-between">
                  <p>Discount</p>
                  <p>(-) ${calculateDiscount()}</p>
                </div>
                <div className="flex justify-between">
                  <p>Addons</p>
                  <p>(+) ${totalAddonPrice()}</p>
                </div>
              </div>
            )}
            <hr className="my-4" />
            {delivaryOptions ? (
              <div className="flex justify-between text-lg font-semibold text-orange-500">
                <p>Total</p>
                <p>${calculateFinalTotal()}</p>
              </div>
            ) : (
              <div className="flex justify-between text-lg font-semibold text-orange-500">
                <p>Subtotal</p>
                <p>${calculateTotal()}</p>
              </div>
            )}
            {delivaryOptions && <></>}
            {delivaryOptions ? (
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-4 rounded"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-4 rounded"
                onClick={hangleCheckout}
              >
                Confirm Delivery Details
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

const DeliveryInput = ({
  setDelivaryFee,
  delivaryFee,
  deliveryOption,
  setDeliveryOption,
  delivaryAddress,
  setDelivaryAddress,
}) => {
  return (
    <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-4">
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
                placeholder="Enter your address: City, State, Area, Landmark, Street number"
                onChange={(e) => setDelivaryAddress(e.target.value)}
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
                {[0, 1, 2, 3, 4].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDelivaryFee(amount)}
                    className={`px-4 py-2 rounded-lg border ${
                      delivaryFee === amount
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
                <select className="w-full mt-2 p-2 border rounded-lg">
                  <option value="COD">Cash On Delivary</option>
                </select>
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
  );
};
