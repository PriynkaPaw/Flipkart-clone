import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reducer/Product_Reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header1 from "../../MComponent/header/Header";
import ProdutNav from "../ProdutNav";

function SideBar() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.getProduct.data);
  const [subCatId, setSubCatId] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    priceRange: { min: 250, max: 200000 },
    brands: new Set(),
    brand: "", // Keep track of selected brands
    rating: new Set(), // Keep track of selected ratings
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setSubCatId(productList);
  }, [productList]);

  const navigate = useNavigate();

  const OnchangeFunctionFromChild = (id) => {
    const selectedItem = productList.find((item) => item?.subCategory === id);
    if (selectedItem) {
      setSubCatId([selectedItem]);
    } else {
      setSubCatId(productList);
    }
  };

  const onClickButton = async (id) => {
    try {
      const data = await getProductById(id);
      navigate("/electronics/info", { state: { data } });
    } catch (error) {
      console.log("error ==>", error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const clearAllFilters = () => {
    setFilters({
      name: "",
      priceRange: { min: 250, max: 200000 },
      brands: new Set(),
      brand: "",
      rating: new Set(),
    });
  };

  const filteredProducts = subCatId.filter((item) => {
    const price = item.price;
    const brand = item.brand;
    const rating = item.rating;
    const passesPriceFilter =
      price >= filters.priceRange.min && price <= filters.priceRange.max;
    const passesBrandFilter =
      filters.brands.size === 0 || filters.brands.has(brand);
    // Check if rating is equal to 3 or 4
    const passesRatingFilter =
      filters.rating.size === 0 ||
      (filters.rating.has("3") && rating >= 3) ||
      (filters.rating.has("4") && rating >= 4);

    return passesPriceFilter && passesBrandFilter && passesRatingFilter;
  });

  return (
    <>
      <Header1 />
      <ProdutNav OnchangeFunctionFromChild={OnchangeFunctionFromChild} />
      <div className="flex mt-4 ml-[90px]">
        <div className="h-[1000px] bg-gray-300 w-[300px]">
          <div className="flex">
            <h1 className="ml-4 mt-4 text-xl font-normal">Filters</h1>
            <button
              className="text-xs text-[#2874f0] mt-4 ml-32"
              onClick={clearAllFilters}
            >
              CLEAR ALL
            </button>
          </div>
          <hr />
          <div className="mt-4 w-full">
            <label className="ml-4 mt-6 text-xl" htmlFor="priceRange">
              Price
            </label>
            <br />
            <p className="ml-4 mt-2">
              {filters.priceRange.min} - {filters.priceRange.max}
            </p>
            <input
              className="w-[80%] ml-2 mt-2"
              type="range"
              id="priceRange"
              name="priceRange"
              min="250"
              value={filters.priceRange.min}
              onChange={(e) =>
                handleFilterChange("priceRange", {
                  ...filters.priceRange,
                  min: parseInt(e.target.value),
                })
              }
              max="200000"
            />
          </div>
          <hr />

          <div>
            <h1 className="ml-4 mt-4 text-xl font-normal">Brand</h1>
            <input
              className="ml-4 rounded-sm p-1"
              type="search"
              placeholder="search brand..."
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            />

            {Array.from(
              new Set(
                productList
                  .filter((item) =>
                    item.brand
                      ?.toLowerCase()
                      .includes(filters.brand?.toLowerCase())
                  ) // Filter brands based on input
                  .map((item) => item.brand)
              )
            ).map((brand, index) => (
              <div className="ml-4 mt-1" key={index}>
                <input
                  type="checkbox"
                  id={`brand_${index}`}
                  value={brand}
                  checked={filters.brands.has(brand)}
                  onChange={() => {
                    const updatedBrands = new Set(filters.brands);
                    if (updatedBrands.has(brand)) {
                      updatedBrands.delete(brand);
                    } else {
                      updatedBrands.add(brand);
                    }
                    handleFilterChange("brands", updatedBrands);
                  }}
                />
                <label className="ml-2" htmlFor={`brand_${index}`}>
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <hr />

          <div>
            <h1 className="ml-4 mt-4 text-xl font-normal">Rating</h1>

            <div className="ml-4">
              <input
                type="checkbox"
                id={`rating_4`}
                value="4"
                checked={filters.rating.has("4")}
                onChange={() => {
                  const updatedRatings = new Set(filters.rating);
                  if (updatedRatings.has("4")) {
                    updatedRatings.delete("4");
                  } else {
                    updatedRatings.add("4");
                  }
                  handleFilterChange("rating", updatedRatings);
                }}
              />
              <label className="ml-2" htmlFor={`rating_4`}>
                {" "}
                4+
              </label>
            </div>

            <div className="ml-4">
              <input
                type="checkbox"
                id={`rating_3`}
                value="3"
                checked={filters.rating.has("3")}
                onChange={() => {
                  const updatedRatings = new Set(filters.rating);
                  if (updatedRatings.has("3")) {
                    updatedRatings.delete("3");
                  } else {
                    updatedRatings.add("3");
                  }
                  handleFilterChange("rating", updatedRatings);
                }}
              />
              <label className="ml-2" htmlFor={`rating_3`}>
                {" "}
                3+
              </label>
            </div>
          </div>
        </div>

        <div className="ml-2">
          {filteredProducts.map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 h-[300px] w-[1400px] ml-2 flex border border-gray-300"
            >
              <div className="mt-6 pt-4">
                <img
                  className="h-[180px] mt-6 w-[240px]"
                  src={item?.image}
                  alt="Product"
                />
              </div>
              <div className="mt-6 w-[940px] pt-4 ml-6">
                <h1 className="text-xl">{item?.description}</h1>
                <ul className="pl-0 ml-0 list-disc">
                  <li>AMD Ryzen 7 Octa Core Processor</li>
                  <li>16 GB DDR5 RAM</li>
                  <li>Windows 11 Operating System</li>
                  <li>512 GB SSD</li>
                  <li>39.62 cm (15.6 Inch) Display</li>
                </ul>
                <button
                  onClick={() => onClickButton(item?.id)}
                  className="p-2 mt-8 border border-gray-500 bg-green-400 rounded-md"
                  type="submit"
                >
                  View more details
                </button>
              </div>
              <div className="pl-16 pt-12">
                <h1 className="text-3xl">{item?.price} /-</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getProductById(id) {
  try {
    const response = await axios.get(
      `http://localhost:4441/api/v1/product/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("ERROR IN PRODUCT GET API BY ID", error);
    throw error;
  }
}

export default SideBar;
