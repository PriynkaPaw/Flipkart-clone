import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Header1 from '../../MComponent/header/Header';
import { addToCart } from '../../slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function ViewProductDetails() {
    const location = useLocation();
    const { data } = location.state;
    console.log('data: ', data);

    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState()
    const [checkRole, setCheckRole]= useState('')
    const cart = useSelector(state => state.addCart?.cart);
    // console.log('cart: adddddd', cart);

    const handleOnclick = () => {

        dispatch(addToCart(data));

        console.log("cartt", cart)

    }
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = localStorage.getItem('islogin');
        setIsLogin(checkLogin === 'true');//  Converting string to boolean

        const role = localStorage.getItem('role')
        setCheckRole(role)
    }, []);

    const handleBuyOnclick = () => {
        if (isLogin) {
           
         
            navigate('/place-order');
        } else {
            navigate('/login');
           
        }
    }
    useEffect(() => {
        console.log("cartt UseEffect ", cart)
        localStorage.setItem('productId',data._id)
    }, [cart])

    return (
        <div>
            <Header1 />
            <div className='w-full bg-gray-100'>
                <Header />
            </div>
            <div className='w-[75%] bg-gray-100 ml-[12%] mt-4 h-[800px] flex'>
                <div className='w-[600px] h-[52%] border border-gray-200 ml-12 mt-4 rounded-md'>
                    <img className='w-[500px] h-[95%] rounded-md mt-2 ml-4' src={data?.image} />
                    <button onClick={handleOnclick} className='px-[46px] py-[16px] bg-[#FF9F00] ml-1  mt-4 rounded-[3px]   text-gray-800 font-medium'>ADD TO CART</button>
                    <button onClick={handleBuyOnclick} className='px-[66px] py-[16px] bg-[#FB641B] ml-2 mt-4 rounded-[3px]   text-gray-800 font-medium'>BUY NOW</button>
                
                
                    {
                    checkRole === 'merchant' && isLogin ?<div className='w-[1050px] h-[52%] border border-gray-200  mt-4 rounded-md'>
                    <button onClick={handleOnclick} className='px-[46px] py-[16px] bg-[#FF9F00] ml-1  mt-4 rounded-[3px]   text-gray-800 font-medium'>Update Product</button>
                    <button onClick={handleBuyOnclick} className='px-[66px] py-[16px] bg-[#FB641B] ml-2 mt-4 rounded-[3px]   text-gray-800 font-medium'>Delete Product</button>
                </div>:<div></div>
                }
                </div>
               
               
                
                <div className='ml-[20px] mt-4'>
                    <h1 className='text-xl font-normal'>{data?.name}</h1>
                    <button className='bg-green-600 px-4 text-white rounded-[3px] mt-2'>{data?.rating}.4*</button>
                    <h1 className='text-3xl mt-2'>$ {data?.price}</h1>
                    <h1 className='mt-4 font-medium'>Available Offers</h1>
                    <ul className='pl-0 ml-0 list-disc'>
                        <li> AMD Ryzen 7 Octa Core Processor</li>
                        <li>16 GB DDR5 RAM</li>
                        <li>Windows 11 Operating System</li>
                        <li>512 GB SSD</li>
                        <li>39.62 cm (15.6 Inch) Display</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ViewProductDetails;
