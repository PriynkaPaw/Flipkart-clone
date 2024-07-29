import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../reducer/Product_Reducer";
function ShowOrderDetail() {
  const orderList = useSelector((state) => state.addOrder?.data);
  console.log("orderList: ", orderList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div>
      <div>
        {orderList?.map((item) => (
          <div className="h-[150px] w-[600px] bg-gray-200 border border-white m-2 flex justify-between">
            <div>
              <h1 className="text-blue-500 text-xl ml-4">{item.user.name}</h1>
              <h1 className=" mt-2 ml-4">
                Shipping Address : <span>{item.shippingAddress}</span>,{" "}
                <span>{item.city}</span>, <span>{item.zip}</span> ,{" "}
                <span>{item.country}</span>{" "}
              </h1>
              <h1 className=" mt-2 ml-4">
                Phone : <span>{item.phone}</span>
              </h1>
            </div>

            {/* <div>
                   <button onClick={()=>handleOnclick(item._id)} className='mt-8 mr-4 p-2 w-[100px] bg-red-500 text-lg rounded-[2px]' >Delete</button>
                   </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowOrderDetail;
