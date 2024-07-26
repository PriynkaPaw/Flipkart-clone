import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 1,
    totalPrice: 1,
    userId: "",
  },
  reducers: {
    addToCart: (state, action) => {
      // state.cart.push(action.payload);
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      console.log("cartSlice", newItem.price);
      state.totalPrice += newItem.price * newItem.quantity;
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cart.push(newItem);
      }
      console.log("cartSlice", state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      console.log("itemId: ", itemId);
      const itemToUpdate = state.cart.find((item) => item.id === itemId);
      // console.log('itemToUpdate: ', itemToUpdate);

      itemToUpdate.quantity += 1;
      itemToUpdate.totalPrice =
        parseInt(itemToUpdate.price) * parseInt(itemToUpdate.quantity);
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.cart.find((item) => item.id === itemId);

      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
        itemToUpdate.totalPrice =
          parseInt(itemToUpdate.price) * parseInt(itemToUpdate.quantity);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
