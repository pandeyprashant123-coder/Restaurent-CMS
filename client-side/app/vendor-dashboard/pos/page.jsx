"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { IoMdCart } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

// import foods from "../../data/addedFood.json";
import PosForm from "../../components/VendorDashboard/POS/PosForm";
import axios from "../../axios";

const PointOfSale = () => {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("foods");
        setFoods(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [cartData, setCartData] = useState({
    cartItemId: "",
    id: 0,
    price: 0,
    name: "",
    quantity: 0,
    addonPrice: 0,
  });
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [showForm, setShowForm] = useState(false);
  const [foodId, setFoodId] = useState();

  const addonPrice = cart
    .map((item) => item.addonPrice)
    .reduce((a, b) => a + b, 0);
  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return (
      subtotal + vat + serviceCharge + deliveryFee - discount - extraDiscount
    );
  };
  return (
    <div className="flex flex-col bg-gray-50">
      <main className="flex gap-4 p-6 w-full">
        <div className="col-span-2 w-1/2">
          {/* <FoodSection /> */}
          <div className="border rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4">Food Section</h2>
            <div className="flex gap-4 mb-4 w-full">
              <select className="border px-3 py-2 rounded w-1/2">
                <option>All categories</option>
                <option>Pizzas</option>
                <option>Indian</option>
              </select>
              <input
                type="text"
                placeholder="Ex: Search food name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded flex-1"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {foods
                .filter((food) =>
                  food.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((food, index) => (
                  <div
                    className="border rounded-xl  hover:shadow-lg cursor-pointer"
                    key={index}
                    onClick={() => {
                      setShowForm(true);
                      setFoodId(food._id);
                    }}
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full object-cover rounded-t-xl  h-24"
                    />
                    <div className="px-4 py-2 flex flex-col items-center">
                      <h3 className="mt-2 font-semibold">{food.name}</h3>
                      <p className="text-orange-500 font-semibold">
                        ${food.unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className=" w-1/2 border rounded-lg ">
          <h2 className="text-lg font-semibold mb-4 p-5">Billing Section</h2>
          <div className="">
            {/* Cart Items */}
            <div className="mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className=" bg-slate-200 border font-semibold">
                    <th className="text-left py-2 pl-5">Item</th>
                    <th className="text-left py-2">Qty</th>
                    <th className="text-left py-2">Price</th>
                    <th className="text-left py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="pl-2">{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="text-red-500 p-1 m-3 border border-red-300 rounded-md"
                          onClick={() =>
                            setCart(
                              cart.filter(
                                (cartItem) =>
                                  cartItem.cartItemId !== item.cartItemId
                              )
                            )
                          }
                        >
                          <MdDeleteForever className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5">
              <div className="flex justify-between mb-2">
                <p>Addon:</p>
                <p>${addonPrice}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Subtotal:</p>
                <p>${calculateSubtotal().toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Discount:</p>
                <p>-${discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Delivery Fee:</p>
                <p>${deliveryFee.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Extra Discount:</p>
                <p>-${extraDiscount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Vat/Tax:</p>
                <p>${vat.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-3">
                <p>Service Charge:</p>
                <p>${serviceCharge.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <p>Total:</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>

              {/* Payment Method */}
              <div className="mt-4">
                <p className="font-semibold mb-2">Paid by:</p>
                <div className="flex gap-4">
                  <button
                    className={` px-4 py-2 rounded ${
                      paymentMethod === "Cash"
                        ? "btnBlue text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("Cash")}
                  >
                    Cash
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      paymentMethod === "Card"
                        ? "btnBlue text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("Card")}
                  >
                    Card
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 pb-2 flex justify-between sticky bottom-0 bg-white">
                <button className="btnBlue px-6 py-2 rounded">
                  Place Order
                </button>
                <button
                  className="bg-gray-200 px-6 py-2 rounded"
                  onClick={() => {
                    setCart([]);
                    setDiscount(0);
                    setDeliveryFee(0);
                    setExtraDiscount(0);
                    setVat(0);
                    setServiceCharge(0);
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
            {/* Billing Details */}
          </div>
        </div>
      </main>
      {showForm && (
        <PosForm
          setShowForm={setShowForm}
          foods={foods}
          foodId={foodId}
          cartData={cartData}
          setCartData={setCartData}
          setCart={setCart}
        />
      )}
    </div>
  );
};

export default PointOfSale;
