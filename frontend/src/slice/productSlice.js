import {createSlice} from "@reduxjs/toolkit"
import { addProducts , updateProduct } from "../reducer/Product_Reducer"


const initialState={
    data:[],
    err:null,
    isLoding:false
}

const ProductSlice = createSlice({
    name:'Products',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
    builder  // posting data
    .addCase(addProducts.pending,(state,action)=>{
        state.isLoding=true
    } )
    .addCase(addProducts.fulfilled, (state, action)=>{
        state.isLoding=false
        console.log("STAte data  ===>", state.data)
        console.log("Action Payload", action.payload)

        state.data= state.data.concat(action.payload)
    })
    .addCase(addProducts.rejected, (state,action)=>{
        state.isLoding=false

        state.err= action.error.message
    })
    

    // For Update 

   
    }
})

export default ProductSlice.reducer