import React from 'react'
import grocery from '../../src/Images/grocery.png';
import HomeAndFurniture from '../../src/Images/HomeAndFurniture.jpeg'
import laptop from '../../src/Images/laptop.jpeg'
import mobile from '../../src/Images/mobile.png'
import fashion from '../../src/Images/fashion.jpeg'
import { Link } from 'react-router-dom';
function Header() {
  return (
      <>
      <div className='w-[1700px] bg-gray-100 mt-12 h-[120px] mx-20 rounded-md flex justify justify-around px-[290px]  '>
          <a href='' className=''>
     <div className="h-30 w-20 pt-4 mt-3 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={grocery} className='h-16 pl-3'/>
         <h4>Grocery</h4>
     </div> </a>

     <a href='' className=''>
     <div className="h-20 w-20  mt-3  pt-4 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={HomeAndFurniture} className='h-16 pl-3'/>
         <h4>Home&Furniture</h4>
     </div> </a>

         <Link to='/electronics' >
     <div className="h-20 w-20 pt-4 mt-3 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={laptop} className='h-16 pl-3'/>
         <h4>Electronics</h4>
     </div></Link> 


     <a href='' className=''>
     <div className="h-30 w-20 pt-4 mt-3 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={mobile} className='h-16 pl-3'/>
         <h4>Mobile</h4>
     </div> </a>

     <a href='' className=''>
     <div className="h-30 w-20 pt-4 mt-3 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={fashion} className='h-16 pl-3'/>
         <h4>Fashion</h4>
     </div> </a>

     <a href='' className=''>
     <div className="h-30 w-20 pt-4  mt-3 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={grocery} className='h-16 pl-3'/>
         <h4>Grocery</h4>
     </div> </a>


     <a href='' className=''>
     <div className="h-30 w-20 pt-4 mt-3 pb-3 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={grocery} className='h-16 pl-3'/>
         <h4>Grocery</h4>
     </div> </a>


     <a href='' className=''>
     <div className="h-30 w-20 pt-4 mt-3 hover:scale-105 transition-all duration-500 cursor-pointer">
         <img src={grocery} className='h-16 pl-3'/>
         <h4>Grocery</h4>
     </div> </a>

      </div>
      </>
  )
}

export default Header