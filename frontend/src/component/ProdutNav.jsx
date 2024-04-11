  import React, { useEffect } from 'react'
  import { getProducts, getSubCategories } from '../reducer/Product_Reducer'
  import { useDispatch, useSelector, UseSelector } from 'react-redux'
  import SideBar from './MobileProducts/SideBar'
  function ProdutNav(props) {

    const dispatch = useDispatch()
    const getsubCategory = useSelector((state) => state.getProduct.getSubCat)
    console.log("Product List", getsubCategory)

    useEffect(() => {
        dispatch(getSubCategories())
    }, [dispatch])

  const handleClick= (id)=>{
    console.log("PROPSS", id)
      props.OnchangeFunctionFromChild(id);
  //  localStorage.setItem("subCategory_id",id)
  
  }
    
    return (
      
        <div className='content-center ml-1 pl-[20%] border border-gray-200 w-full'>

      <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">Electronics</button>

      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
  {
    getsubCategory?.map((item)=>(
      
        <button onClick={()=>handleClick(item.id)}  className="block px-4 py-3 text-black">{item?.name}</button>
      
    ))
  }
  </div>

        

    </div>
    <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">TVs & Appliances
  </button>
      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
        <a href="#" className="block px-4 py-3 text-black">Link 1</a>
        <a href="#" className="block px-4 py-3 text-black">Link 2</a>
        <a href="#" className="block px-4 py-3 text-black">Link 3</a>
      </div>
    </div>
    <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">Men</button>
      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
        <a href="#" className="block px-4 py-3 text-black">Link 1</a>
        <a href="#" className="block px-4 py-3 text-black">Link 2</a>
        <a href="#" className="block px-4 py-3 text-black">Link 3</a>
      </div>
    </div>

    <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">Women</button>
      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
        <a href="#" className="block px-4 py-3 text-black">Link 1</a>
        <a href="#" className="block px-4 py-3 text-black">Link 2</a>
        <a href="#" className="block px-4 py-3 text-black">Link 3</a>
      </div>
    </div>

    <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">Baby & Kids
  </button>
      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
        <a href="#" className="block px-4 py-3 text-black">Link 1</a>
        <a href="#" className="block px-4 py-3 text-black">Link 2</a>
        <a href="#" className="block px-4 py-3 text-black">Link 3</a>
      </div>
    </div>

    <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">Home & Furniture
  </button>
      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
        <a href="#" className="block px-4 py-3 text-black">Link 1</a>
        <a href="#" className="block px-4 py-3 text-black">Link 2</a>
        <a href="#" className="block px-4 py-3 text-black">Link 3</a>
      </div>
    </div>

    <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">Sports, Books & More
  </button>
      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
        <a href="#" className="block px-4 py-3 text-black">Link 1</a>
        <a href="#" className="block px-4 py-3 text-black">Link 2</a>
        <a href="#" className="block px-4 py-3 text-black">Link 3</a>
      </div>
    </div>

    <div className="relative inline-block group mt-[60px]">
      <button className=" text-gray-900 px-4 py-2 text-base border-none">Flights</button>
      <div className="hidden absolute bg-gray-200 min-w-40 shadow-md z-10 group-hover:block">
        <a href="#" className="block px-4 py-3 text-black">Link 1</a>
        <a href="#" className="block px-4 py-3 text-black">Link 2</a>
        <a href="#" className="block px-4 py-3 text-black">Link 3</a>
      </div>
    </div>
    </div>
    
    )
  }

  export default ProdutNav