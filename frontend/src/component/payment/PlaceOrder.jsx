import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postOrder } from "../../reducer/Product_Reducer";
import PayNow from "./PayNow";
import ShowOrderDetail from "./ShowOrderDetail";
const PlaceOrder = () => {
  const [toggle, setToggle] = useState("true");
  const onClickhandle = () => {
    setToggle(false);
    console.log("Type Of Toggle", typeof toggle);
  };
  return (
    <div className="flex">
      <div className="flex">
        <div>
          <ShowOrderDetail />
          <PayNow />
        </div>

        {toggle === "true" ? (
          <button
            onClick={onClickhandle}
            className="p-1 bg-green-500 ml-4 h-[50px] mt-4 rounded-[5px]"
          >
            Add Another Address
          </button>
        ) : (
          <AddAddressForm />
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;

const AddAddressForm = () => {
  const userId = localStorage.getItem("userId");
  const productId = localStorage.getItem("productId");
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    orderItems: [
      { quantity: 1, product: productId },
      { quantity: 2, product: "65e6e46a2baf7a8ae66d410c" },
    ],
    user: userId,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postOrder(formData));
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    console.log("OrderData", JSON.stringify(formData));
  };

  return (
    <div className="max-w-md w-[35%] mr-4 mx-auto mt-10 p-6 bg-white rounded-md shadow-md ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">ADD ADDRESS</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="shippingAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Shipping Address
          </label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            className="mt-1 p-2 block w-full rounded-md border-gray-900 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-700"
          >
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};
