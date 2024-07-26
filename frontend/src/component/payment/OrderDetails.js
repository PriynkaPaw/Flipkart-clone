import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PayNow from "./PayNow";
import Header from "../../MComponent/header/Header";

function OrderDetails() {
  const [product, setProduct] = useState();
  const [user, setUser] = useState([]);
  const prodcutId = localStorage.getItem("productId");
  const productList = useSelector((state) => state.getProduct?.data);
  const productDetails = productList.find(
    (productID) => productID._id == prodcutId
  );

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4441/api/v1/users");
        console.log("Get API user response =>", response.data);
        setUser(response.data);
        // Set product after user is set
        setProduct(productDetails);
      } catch (error) {
        console.log("ERROR IN PRODUCT GET API", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  console.log("Usersss,", user);
  const userData = user?.find((userdata) => userdata._id == userId);
  // console.log('userData: ', userData);

  return (
    <>
      <Header />
      <div className="ml-[35%] bg-gray-100 w-[450px] h-auto mt-[100px]">
        <div>
          <h1 className="text-2xl text-red-500 ml-[130px] pt-4">
            Order Details
          </h1>
          <div className="h-[90px] mt-[50px] ml-[120px]">
            <img className="h-full" src={product?.image} />
          </div>
          <div className="ml-[50px] mt-[20px]">
            <h1 className="text-xl mb-2">{product?.name}</h1>
            <h1 className="text-lg mb-2">{product?.description}</h1>
            <h1 className="mb-2">{product?.brand}</h1>
            <h1>Rs {product?.price}</h1>
          </div>
          <hr />
          <div className="ml-[50px]">
            <h1 className="text-xl mt-2 text-gray-700">Shipping Address :</h1>
            <h1>
              {userData?.apartment},
              <span>
                {" "}
                {userData?.street}, {userData?.city}, {userData?.country},{" "}
                {userData?.zip}{" "}
              </span>{" "}
            </h1>
            <h1>
              Phone: <span>{userData?.phone}</span>{" "}
            </h1>
          </div>
        </div>
        {/* <button onClick={handleClick}>This is button</button> */}
        <div>
          <PayNow />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;

const getUsers = async () => {};
