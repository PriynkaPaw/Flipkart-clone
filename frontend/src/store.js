// import {configureStore} from '@reduxjs/toolkit'
// import productSlice from './slice/productSlice'
// import getProductSlice from './slice/getProductSlice'
// import cartSlice from './slice/cartSlice'
// import {persistReducer, persistStore} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig={
//   key:'persist-store',
//   storage
// }
// export const store = configureStore({
//     reducer:{
//       addProduct:productSlice,
//       getProduct:getProductSlice,
//       addCart: cartSlice
//     }
// })


import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productSlice from './slice/productSlice';
import getProductSlice from './slice/getProductSlice';
import cartSlice from './slice/cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import orderSlice from './slice/orderSlice';
import userSlice from './slice/userSlice';
import adminSlice from './slice/adminSlice';
const persistConfig = {
  key: 'root', 
  storage
};

// Combine all slices into a single reducer
const rootReducer = combineReducers({
  addProduct: productSlice, 
  getProduct: getProductSlice, 
  addCart: cartSlice,
  addOrder: orderSlice,
  getUser: userSlice,
  getCreatedUser: adminSlice,
  getPermissions:adminSlice,
  addPermission:adminSlice,
  addRole:adminSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
