import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import img1 from "../assets/food1.png";

import { IoMdCart } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

import foods from "../data/addedFood.json";
import addon from "../data/addon.json";

interface CartItem {
  cartItemId: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  addonPrice: number;
}

const PointOfSale = () => {
  const [search, setSearch] = useState("");

  const [cartData, setCartData] = useState<CartItem>({
    cartItemId: "",
    id: 0,
    price: 0,
    name: "",
    quantity: 0,
    addonPrice: 0,
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [showForm, setShowForm] = useState<boolean>(false);
  const [foodId, setFoodId] = useState<number>();

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
    <div className="min-h-screen flex flex-col bg-gray-50">
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
                .map((food) => (
                  <div
                    className="border rounded-xl  hover:shadow-lg cursor-pointer"
                    onClick={() => {
                      setShowForm(true);
                      setFoodId(food.id);
                    }}
                  >
                    <img
                      src={img1}
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
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b">
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
                    className={`btnBlue px-4 py-2 rounded ${
                      paymentMethod === "Cash"
                        ? "bg-blue-800 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("Cash")}
                  >
                    Cash
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
                      paymentMethod === "Card"
                        ? "bg-blue-800 text-white"
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

interface formProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  foodId: number | undefined;
  cartData: CartItem;
  setCartData: React.Dispatch<React.SetStateAction<CartItem>>;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const PosForm: React.FC<formProps> = ({
  setShowForm,
  foodId,
  setCart,
  cartData,
  setCartData,
}) => {
  const [quantity, setQuantity] = useState(1);

  const food = foods.find((food) => food.id === foodId);

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
    <div className="flex items-center justify-center w-full bg-[#555252b5] absolute top-0 left-0 z-50">
      <div className="flex flex-col gap-3 bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <div
          className="font-semibold text-xl text-end translate-x-6 -translate-y-9 cursor-pointer p-1 hover:text-gray-700"
          onClick={() => setShowForm(false)}
        >
          x
        </div>
        <div className="flex gap-3">
          <img
            src={img1}
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
          food.variations.map((variation) => (
            <div>
              <h1 className="text-lg font-semibold">
                {variation.variationName}{" "}
                <span className="font-normal text-sm">(required)</span>
              </h1>
              <p className="text-sm text-gray-700">
                You need to select minimum 1 To maximum 2 Options
              </p>
              <div className="p-3">
                {variation?.options.map((option) => (
                  <div className="flex justify-between pr-10">
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
