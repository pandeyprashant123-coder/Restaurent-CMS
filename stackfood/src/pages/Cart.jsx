import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items); // Access items from Redux state
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // Remove local state for quantity as you have it already in Redux
  const handleIncrement = (itemId) => {
    setQuantity(Math.max(1, quantity + 1));
    dispatch({ type: "cart/incrementQuantity", payload: itemId });
  };

  const handleDecrement = (itemId) => {
    setQuantity(Math.max(4, quantity - 1));
    dispatch({ type: "cart/decrementQuantity", payload: itemId });
  };

  const handleRemove = (itemId) => {
    dispatch({ type: "cart/removeItem", payload: itemId });
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.cartInfo.price * item.cartInfo.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-6">
      {/* Left Section: Cart Items */}
      <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">My Cart</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map(({ cartInfo, quantity, addons }) => (
              <li
                key={cartInfo.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  {/* Item Image */}
                  <img
                    src={cartInfo.image} // Corrected image path
                    alt={cartInfo.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  {/* Item Details */}
                  <div>
                    <p className="font-medium">{cartInfo.title}</p>
                    <p className="font-medium">{cartInfo.price}</p>
                    <p className="font-medium">{cartInfo.addons}</p>
                    <p className="text-sm text-gray-500">
                      Variations: {cartInfo.variation}
                    </p>
                    <p className="text-sm text-gray-700">${cartInfo.price}</p>
                  </div>
                </div>
                {/* Quantity and Remove Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecrement(cartInfo.id)}
                    className="text-lg font-bold px-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-medium">{quantity}</span>
                  <button
                    onClick={() => handleIncrement(cartInfo.id)}
                    className="text-lg font-bold px-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(cartInfo.id)}
                    className="text-red-500 hover:text-red-700"
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
            <p>
              $
              {cartItems.reduce(
                (acc, item) =>
                  acc + item.cartInfo.price * item.cartInfo.quantity,
                0
              )}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>-$0.00</p>
          </div>
          <div className="flex justify-between">
            <p>Addons</p>
            <p>$0.00</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-semibold">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 mt-4 rounded">
          Confirm Delivery Details
        </button>
      </div>
    </div>
  );
};

export default Cart;
