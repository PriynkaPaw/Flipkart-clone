import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCT_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  UPDATE_PRODUCT_TO_CART,
} from "../action-type/Action";
import axios from "axios";

export const addProductToCart = createAsyncThunk(
  ADD_PRODUCT_TO_CART.add_product_to_cart,
  async (val) => {
    try {
      const response = await fetch(
        "http://localhost:4441/api/v1/user/cart-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
        }
      );
      const data = await response.json();

      console.log("Add to Cart Reducer Res ------------->", data);
      return data;
    } catch (error) {
      console.log("Post Catch Error ", error);
      throw error;
    }
  }
);

export const getCartData = createAsyncThunk(
  GET_PRODUCT_TO_CART.get_product_to_cart,
  async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:4441/api/v1/user/cart-item/${userId}`
      );
      console.log("Get cart API response =>", response.data);
      return response.data;
    } catch (error) {
      console.log("ERROR IN PRODUCT GET API", error);
      throw error;
    }
  }
);

// reducer for delete products from cart

export const deleteCartProduct = createAsyncThunk(
  REMOVE_PRODUCT_TO_CART.remove_product_to_cart,
  async ({ cartId, productId }) => {
    try {
      await axios.delete(
        `http://localhost:4441/api/v1/user/cart-item/${cartId}/${productId}`
      );

      return { cartId, productId };
    } catch (error) {
      console.log("ERROR IN Delete API", error);
      throw error;
    }
  }
);

// Update Quantity of Cart product

export const updateCartProductQty = createAsyncThunk(
  UPDATE_PRODUCT_TO_CART.update_product_to_cart,
  async ({ cartId, productId, price, qtyChange }) => {
    console.log("cart and product Id in reducer", productId);

    try {
      const response = await fetch(
        `http://localhost:4441/api/v1/user/cart-item/${cartId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qtyChange, price }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API update response", data);
      return {
        ...data,
        qtyChange,
        price,
        productId,
      };
    } catch (error) {
      console.log("error msy ============>", error);
      throw error;
    }
  }
);
