"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../axios";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(""); // Access items from Redux state
  //   const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("cart");
        setCart(res.data.cart?.items);
        setCartId(res.data.cart._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(cart);

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
    setDeliveryFee(0);
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

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const addonPrice = totalAddonPrice();
    const discount = calculateDiscount();
    return subtotal + addonPrice - discount;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-6">
        {/* Left Section: Cart Items */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">My Cart</h2>
          {cart.length > 0 ? (
            <ul>
              {cart?.map((item) => (
                <li
                  key={item._id}
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
                      <p className="font-medium">{item.food.unit}</p>
                      <p className="font-medium"></p>
                      <p className="text-sm text-gray-500">Variations:</p>
                      <p className="text-sm text-gray-700">$</p>
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
                          item._id
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
                          item._id
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteCart(item._id)}
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

        {/* Right Section: Order Summary */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Item Price</p>
              <p>${calculateSubtotal()}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>-${calculateDiscount()}</p>
            </div>
            <div className="flex justify-between">
              <p>Addons</p>
              <p>${totalAddonPrice()}</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p>${calculateTotal()}</p>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-4 rounded">
            Confirm Delivery Details
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
