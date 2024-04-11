// reducers.js
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers as needed
});

export default rootReducer;
