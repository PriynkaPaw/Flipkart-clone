import React from 'react'
import laptop from '../../src/Images/laptop.jpeg'
import mobile from '../../src/Images/mobile.png'
import Cart from './Cart'
const data =[
    {
        image:{laptop},
        text:'Start with 5499 /-'
    },
    {
        image:{mobile},
        text:'Start with 5499 /-'
    },
    {
        image:{laptop},
        text:'Start with 5499 /-'
    },
    {
        image:{mobile},
        text:'Start with 5499 /-'
    },
    {
        image:{laptop},
        text:'Start with 5499 /-'
    },
    {
        image:{mobile},
        text:'Start with 5499 /-'
    }

]
function ElectronicsCartHolder() {
  return (
    <div className='w-[1700px] bg-gray-100 mt-4 h-[300px] mx-20 rounded-md flex justify justify-around px-[290px]'>
      {
          data?.map((item)=>{
              <Cart  />
          })
      }
    </div>
  )
}

export default ElectronicsCartHolder