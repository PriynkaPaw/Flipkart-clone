import React from 'react'
import mobile from '../../src/Images/mobile.png';
import laptop from '../../src/Images/laptop.jpeg'
function Cart() {

    const data = [
        {
            image: laptop,
            text: 'Start with 5499 /-'
        },
        {
            image: mobile,
            text: 'Start with 5499 /-'
        },
        {
            image: laptop,
            text: 'Start with 5499 /-'
        },
        {
            image: mobile,
            text: 'Start with 5499 /-'
        },
        {
            image: laptop,
            text: 'Start with 5499 /-'
        },
        {
            image: mobile,
            text: 'Start with 5499 /-'
        }, {
            image: laptop,
            text: 'Start with 5499 /-'
        }
    ];

    return (
        <div className='w-[1700px] bg-gray-100 mt-4 h-[350px] mx-20 rounded-md '>
                <p className='w-full h-[35px] p-0 text-2xl mb-4 relative pt-2 '>Best Of Electronics</p>

            <div className='flex justify justify-around '>
                    {
                        data?.map((item,index) => {
                            return (
                                <div key={index}  className='h-[250px] w-[200px] bg-gray-100 border border-gray-200 '>
                                    <img className='w-full  border h-[190px] hover:scale-105 transition-all duration-500 cursor-pointer ' src={item.image} alt='Product' />
                                    <h3 className=''>{item.text}</h3>
                                    <h3 className=' font-bold'>From 7777/-</h3>
                                </div>
                            )
                        })
                    }

            </div>
        </div>
    )
}

export default Cart