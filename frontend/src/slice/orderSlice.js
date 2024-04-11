import {createSlice} from "@reduxjs/toolkit"
import { postOrder , getOrders } from "../reducer/Product_Reducer"


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
    builder  // posting data
    .addCase(postOrder.pending,(state,action)=>{
        state.isLoding=true
    } )
    .addCase(postOrder.fulfilled, (state, action)=>{
        state.isLoding=false
        console.log("STAte data  ===>", state.data)
        console.log("Action Payload Order", action.payload)

        state.data= state.data.concat(action.payload)
    })
    .addCase(postOrder.rejected, (state,action)=>{
        state.isLoding=false

        state.err= action.error.message
    })

    
    // GET all Order details

    .addCase(getOrders.pending, (state, action)=>{
        state.isLoding= true
    })
    .addCase(getOrders.fulfilled, (state, action)=>{
      state.isLoding= false
  
        state.data = action.payload
    })
    .addCase(getOrders.rejected, (state, action)=>{
      state.isLoding= false
  
        state.err = action.error.message
    })


   
    }
})

export default orderSlice.reducer