import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array to hold cart items
  },
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      state.items.push(action.payload);
      console.log(action.payload); // Add the item to the cart
    },

    // Increment quantity
    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.cartInfo.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // Decrement quantity
    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.cartInfo.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Remove item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartInfo.id !== action.payload
      );
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
