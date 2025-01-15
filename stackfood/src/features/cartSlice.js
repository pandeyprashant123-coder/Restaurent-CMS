import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array to hold cart items
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      console.log(action.payload.cartInfo + "hi"); // Add the item to the cart
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
