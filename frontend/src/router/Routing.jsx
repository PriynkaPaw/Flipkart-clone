import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterUser from '../component/RegisterUser';
import Home from '../component/Home';
import SideBar from '../component/MobileProducts/SideBar';
import Cart from '../component/Cart/Cart';
import SubmitProductForm from '../component/SubmitProductForm';
import ViewProductDetails from '../component/MobileProducts/ViewProductDetails';
import MI from '../component/categoryPhones/MI';
import PlaceOrder from '../component/payment/PlaceOrder';
import Login from '../component/Login';
import OrderDetails from '../component/payment/OrderDetails';
import Admin from '../component/AdminDashBoard/Admin';
function Routing() {
  return (
    <div>
        <BrowserRouter >
        <Routes>
           <Route path='/' element={<Home />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/electronics'element={<SideBar />} />
            <Route path='/product-from'element={<SubmitProductForm />} />
            <Route path='/electronics/info'element={<ViewProductDetails />} />
            <Route path='/cart'element={<Cart />} />
            <Route path='/electronics/MI'element={<MI />} />
            <Route path='/place-order'element={<OrderDetails />} />
            <Route path='/login'element={<Login />} />
            <Route path='/admin'element={<Admin />} />
            
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routing 