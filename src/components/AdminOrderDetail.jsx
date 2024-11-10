import React, { useEffect, useState } from "react";
import { useAxios } from "../config/axios";
import { notification } from "antd";

export default function AdminOrderDetail() {
   const axios = useAxios();
   const [products, setProducts] = useState([]);

   const fetchProducts = async () => {
      try {
         const response = await axios.get("/product");
         setProducts(response.data.products ?? []);
      } catch (error) {
         console.log("Error fetching tables data:", error);
         notification.error({ message: "ไม่สามารถดึงรายละเอียดสินค้าได้" });
      }
   };

   useEffect(() => {
      console.log("products", products);
   }, [products]);

   useEffect(() => {
      fetchProducts();
   }, []);

   return <div></div>;
}
