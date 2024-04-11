import {createSlice} from "@reduxjs/toolkit"
import {  getProducts , fetchCategories, getSubCategories , subCatById} from "../reducer/Product_Reducer"


const initialState={
    data:[],
    getSubCat:[],
    getSelectedCat:[],
    err:null,
    isLoding:false
}

const getProductSlice = createSlice({
    name:'getproducts',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
    builder  // posting data
   
  // GET data 
  .addCase(getProducts.pending, (state, action)=>{
      state.isLoding= true
  })
  .addCase(getProducts.fulfilled, (state, action)=>{
    state.isLoding= false

      state.data = action.payload
  })
  .addCase(getProducts.rejected, (state, action)=>{
    state.isLoding= false

      state.err = action.error.message
  })

  // GET SUB category id data 
  .addCase(subCatById.pending, (state, action)=>{
    state.isLoding= true
})
.addCase(subCatById.fulfilled, (state, action)=>{
  state.isLoding= false

    state.data = action.payload
})
.addCase(subCatById.rejected, (state, action)=>{
  state.isLoding= false

    state.err = action.error.message
})

  // GET Category
  .addCase(fetchCategories.pending, (state, action)=>{
    state.isLoding= true
})
.addCase(fetchCategories.fulfilled, (state, action)=>{
  state.isLoding= false

    state.data = action.payload
})
.addCase(fetchCategories.rejected, (state, action)=>{
  state.isLoding= false

    state.err = action.error.message
})

// GET SUB Category

.addCase(getSubCategories.pending, (state, action)=>{
  state.isLoding= true
})
.addCase(getSubCategories.fulfilled, (state, action)=>{
state.isLoding= false

  state.getSubCat = action.payload
})
.addCase(getSubCategories.rejected, (state, action)=>{
state.isLoding= false

  state.err = action.error.message
})
    }
})

export default getProductSlice.reducer