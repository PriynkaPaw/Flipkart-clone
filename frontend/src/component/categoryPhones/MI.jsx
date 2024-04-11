import React, { useEffect, useState } from 'react'
import SideBar from '../MobileProducts/SideBar'
import axios from "axios"

function MI() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:4441/api/v1/product');
          console.log("Get API response =>", response.data);
          setProducts(response.data);
        } catch (error) {
          console.log("ERROR IN PRODUCT GET API", error);
          // Handle error if needed
        }
      };
  
      fetchData();
    }, []);
      
  return (
    <div>
      {
          products?.map((item)=>(
              <div> 
              {item.category.name === "Electronics"?<h1>{item.category.name}</h1>:<h1>Category Nt found</h1>}
              </div>
  ))
      }
    </div>
  )
}

export default MI  