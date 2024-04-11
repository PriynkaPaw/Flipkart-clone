import {createSlice} from "@reduxjs/toolkit"
import { postOrder , getOrders} from "../reducer/Product_Reducer"
import { getUser } from "../reducer/UserReducer"

const initialState={
    data:[],
    err:null,
    isLoding:false
}

const orderSlice = createSlice({
    name:'Order',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
    builder 
    
    // GET all Order details

    .addCase(getUser.pending, (state, action)=>{
        state.isLoding= true
    })
    .addCase(getUser.fulfilled, (state, action)=>{
      state.isLoding= false
  
        state.data = action.payload
    })
    .addCase(getUser.rejected, (state, action)=>{
      state.isLoding= false
  
        state.err = action.error.message
    })


   
    }
})

export default orderSlice.reducer