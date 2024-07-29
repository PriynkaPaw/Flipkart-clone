import { createSlice } from "@reduxjs/toolkit";
import {
  getCartData,
  addProductToCart,
  deleteCartProduct,
  updateCartProductQty,
} from "../reducer/cartListReducer";

const initialState = {
  cartData: [],
  isLoading: false,
};

const cartItemSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Add Product to Cart List
      .addCase(addProductToCart.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload;
        if (
          data &&
          data.items &&
          data.items.length > 0 &&
          state.cartData.length > 0
        ) {
          const lastItem = data.items[data.items.length - 1];
          const isProductExist = state.cartData.items.some(
            (item) => item.productId === lastItem.productId
          );
          if (isProductExist) {
            state.cartData = {
              ...state.cartData,
            };
          }
        } else {
          state.cartData = { ...data };
        }
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // GET products in cart
      .addCase(getCartData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartData = action.payload;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete products from the cart list
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        const { productId } = action.payload;

        if (state.cartData && state.cartData.items) {
          const updatedItems = state.cartData.items.filter(
            (item) => item.productId !== productId
          );

          state.cartData = {
            ...state.cartData,
            items: updatedItems,
          };
        }
      })

      // Update Quantity of the cart Product

      .addCase(updateCartProductQty.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCartProductQty.fulfilled, (state, action) => {
        const { productId, qtyChange } = action.payload;

        const index = state.cartData.items.findIndex(
          (item) => item.productId._id === productId
        );

        if (index !== -1) {
          state.cartData.items[index].qty += qtyChange;

          const item = state.cartData.items[index];
          const pricePerItem = item.price;

          if (qtyChange === 1) {
            state.cartData.items[index].total_Price += pricePerItem;
          } else if (qtyChange === -1) {
            state.cartData.items[index].total_Price -= pricePerItem;
          }

          let totalQuantity = 0;
          let grandTotal = 0;

          state.cartData.items.forEach((item) => {
            totalQuantity += item.qty;
            grandTotal += item.total_Price;
          });

          state.cartData = {
            ...state.cartData,
            totalQuantity,
            grand_total: grandTotal,
          };
        }
      })

      .addCase(updateCartProductQty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cartItemSlice.reducer;
