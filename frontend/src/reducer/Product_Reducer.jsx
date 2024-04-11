import { ADD_PRODUCT, UPDATE_PRODUCT, GET_CATEGORY ,GET_SUB_CATEGORY, GET_SUB_CATEGORY_ID, POST_ORDER_DETAILS , GET_ORDER_DETAILS} from "../action-type/Action"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
 
// Post API 
export const addProducts = createAsyncThunk(

    ADD_PRODUCT.add_product,
    async (val) => {
        const response = await fetch('http://localhost:4441/api/v1/product', {
            method: 'POST',

            body: val
        })

        const data = await response.json()
        // console.log("dataaaa", data)

        return data
    }
);


// GET API

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
      try {
        const response = await axios.get('http://localhost:4441/api/v1/product');
        console.log("Get API response =>", response.data);
        return response.data;
      } catch (error) {
        console.log("ERROR IN PRODUCT GET API", error);
        throw error; // Rethrow the error for the calling code to handle
      }
    }
  );


  //update API

export const updateProduct = createAsyncThunk(UPDATE_PRODUCT.update_product, async (val) => {


   await fetch(`http://localhost:4441/api/v1/product/${val.id}`, {
      method: 'PUT',
     
      body:val
    })
      .then((res) => {
        res.json().then((data) => {
          console.log("API update response", data);
          return data
        })
      })
  
      .catch(error => {
        console.log("error msy ============>", error);
  
  
      });
  
  })

  
// For getting the Sub category
  export const getSubCategories = createAsyncThunk( GET_SUB_CATEGORY.get_Sub_category, async () => {
    try {
      const response = await axios.get('http://localhost:4441/api/v1/subCategory');
      console.log("Get API response of SUB category =>", response.data);
      return response.data
    } catch (error) {
      console.log("ERROR IN Category GET API", error);
    }
  })
  

    
// For getting the  category
export const fetchCategories = createAsyncThunk( GET_CATEGORY.get_category, async () => {
  try {
    const response = await axios.get('http://localhost:4441/api/v1/category');
    console.log("Get API response of category =>", response.data);
    return response.data
  } catch (error) {
    console.log("ERROR IN Category GET API", error);
  }
})


// For getting the Sub category by ID
export const subCatById = createAsyncThunk( GET_SUB_CATEGORY_ID.get_Sub_category_id, async (val) => {
  try {
    const response = await axios.get(`http://localhost:4441/api/v1/subCategory${val.id}`);
    console.log("Get API response of SUB category id =>", response.data.id);
    return response.data
  } catch (error) {
    console.log("ERROR IN Category GET API", error);
  }
})


// Post Order Address



export const postOrder = createAsyncThunk(
  POST_ORDER_DETAILS.add_order_details,
  async (val) => {
    const response = await fetch('http://localhost:4441/api/v1/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(val)
    });

    const data = await response.json();
    console.log("Order Request Data", data);

    return data;
  }
);

// Get All Products details


export const getOrders = createAsyncThunk( GET_ORDER_DETAILS.get_order_details, async () => {
  try {
    const response = await axios.get('http://localhost:4441/api/v1/order');
    console.log("Get API response of order =>", response.data);
    return response.data
  } catch (error) {
    console.log("ERROR IN Order GET API", error);
  }
})

