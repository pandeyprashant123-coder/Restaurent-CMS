"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { IoMdCart } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

// import foods from "../../data/addedFood.json";
import PosForm from "../../components/VendorDashboard/POS/PosForm";
import axios from "../../axios";
import { toast, ToastContainer } from "react-toastify";

const PointOfSale = () => {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [cartId, setCartId] = useState("");
  const [cart, setCart] = useState([]);
  // const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  // const [quantity, setQuantity] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [foodId, setFoodId] = useState();
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
  }, [showForm]);

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
  // console.log(JSON.stringify(cart));

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

  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const addonPrice = totalAddonPrice();
    const discount = calculateDiscount();
    return (
      subtotal +
      addonPrice +
      vat +
      serviceCharge +
      deliveryFee -
      discount -
      extraDiscount
    );
  };

  // cartId,
  //     shippingAddress,
  //     paymentMethod,
  //     delivaryOption,
  //     totalPrice,

  const handlePlaceOrder = async () => {
    const orderDetails = {
      cartId,
      // shippingAddress,
      paymentMethod: "COD",
      delivaryOption: "Take Away",
      totalPrice: calculateTotal(),
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
    <div className="flex flex-col bg-gray-50">
      <ToastContainer />
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
                ?.map((food, index) => (
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
                        ${food.unitPrice}
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
                    <th className="text-center py-2 pl-5">Item</th>
                    <th className="text-center py-2">Qty</th>
                    <th className="text-left py-2">Price</th>
                    <th className="text-left py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="pl-3 text-center">{item.food.name}</td>
                      <td className="font-semibold text-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              "decrease",
                              item.quantity,
                              item._id
                            )
                          }
                          className="px-3 py-1 text-gray-500 hover:text-gray-700"
                        >
                          <p className="text-2xl font-semibold">-</p>
                        </button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              "increase",
                              item.quantity,
                              item._id
                            )
                          }
                          className="px-3 py-1 text-gray-500 hover:text-gray-700"
                        >
                          <p className="text-xl font-semibold">+</p>
                        </button>
                      </td>
                      <td>${item.food.unitPrice * item.quantity}</td>
                      <td>
                        <button
                          className="text-red-500 p-1 m-3 border border-red-300 rounded-md hover:text-white hover:bg-red-500"
                          onClick={() => deleteCart(item._id)}
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
                <p>${totalAddonPrice()}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Subtotal:</p>
                <p>${calculateSubtotal()}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Discount:</p>
                <p>-${calculateDiscount()}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Delivery Fee:</p>
                <p>${deliveryFee}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Extra Discount:</p>
                <p>-${extraDiscount}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Vat/Tax:</p>
                <p>${vat}</p>
              </div>
              <div className="flex justify-between mb-3">
                <p>Service Charge:</p>
                <p>${serviceCharge}</p>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <p>Total:</p>
                <p>${calculateTotal()}</p>
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
                <button
                  className="btnBlue px-6 py-2 rounded"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
                <button
                  className="bg-gray-200 px-6 py-2 rounded"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
            {/* Billing Details */}
          </div>
        </div>
      </main>
      <div
        className={`flex items-center justify-center w-full h-full bg-[#555252b5] fixed top-0 left-0 z-50 transition-all duration-300 ease-in ${
          showForm ? "opacity-100 max-h-full" : "opacity-0 max-h-0"
        }`}
      >
        <PosForm
          setShowForm={setShowForm}
          foods={foods}
          foodId={foodId}
          setCart={setCart}
        />
      </div>
    </div>
  );
};

export default PointOfSale;
