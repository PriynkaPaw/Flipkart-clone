import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  fetchCategories,
  getSubCategories,
} from "../reducer/Product_Reducer";
import { useNavigate } from "react-router-dom";
function SubmitProductForm() {
  const dispatch = useDispatch();

  // const category = getCategory()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    brand: "",
    price: "",
    category: "",
    subCategory: "",
    countInStock: "",
  });
  const [isSubmit, setIsSubmit] = useState("");

  const [formError, setFormError] = useState({});
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubCategories());
  }, []);
  const category = useSelector((state) => state.getProduct?.data);
  const subCategory = useSelector((state) => state.getProduct?.getSubCat);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const navigate = useNavigate();

  const Onsubmit = async (e) => {
    e.preventDefault();
    const formData1 = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        formData1.append("image", formData[key]);
      } else {
        formData1.append(key, formData[key]);
      }
    });
    dispatch(addProducts(formData1));
    const formDataError = { ...formData1 };
    setFormError(validate(formDataError));
    setIsSubmit("Product added successfully!!");
    // navigate('/')
  };

  const validate = (values) => {
    const error = {};
    if (!values.name) {
      error.name = "name is required";
    }
  };
  return (
    <div className="bg-gray-200 w-[500px] ml-[36%] mt-[4%]">
      <p className="text-green-400">{isSubmit}</p>
      <div className="container mx-auto max-w-md py-8 ">
        <h2 className="text-2xl font-bold mb-4">Product Details Form</h2>
        <form
          onSubmit={Onsubmit}
          action="/product-from"
          encType="multipart/form-data"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInput}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
            <p className="text-red-500"> {formError?.name} </p>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInput}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageInput}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand:
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInput}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInput}
              step="0.01"
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Sub Category:
            </label>

            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInput}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">Select Sub Category</option>
              {subCategory.map((subcategory, index) => (
                <option key={index} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Category:
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInput}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <option value="">Select Category</option>
              {category.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="CountInStock"
              className="block text-sm font-medium text-gray-700"
            >
              Count In Stock:
            </label>
            <input
              type="text"
              id="countInStock"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleInput}
              required
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitProductForm;
