import React, { useEffect, useState } from "react";
import AdminOrderList from "../components/AdminOrderList";
import { notification } from "antd";
import { useAxios } from "../config/axios";
import AdminCreateOrder from "../components/AdminCreateOrder";
import AdminOrderDetail from "../components/AdminOrderDetail";

export default function AdminOrder() {
   const axios = useAxios();
   const [data, setData] = useState([]);
   const [selectedRow, setSelectedRow] = useState(null);

   useEffect(() => {
      console.log("selectedRow", selectedRow);
   }, [selectedRow]);

   const fetchOrder = () => {
      axios
         .get("/order")
         .then((res) => {
            setData(res.data?.orders ?? []);
            console.log(res.data?.orders);
         })
         .catch((err) => {
            notification.error({
               message: "การดึงข้อมลล้มเหลว",
               description: err?.response?.data?.message,
            });
         });
   };

   useEffect(() => {
      fetchOrder();
   }, []);

   return (
      <div className="py-5 px-10 flex justify-between gap-6">
         <div id="left" className="bg-brand-gray p-4 w-full">
            <AdminCreateOrder fetchOrder={fetchOrder} />
         </div>

         <div id="center" className="bg-brand-gray p-4 w-full">
            <AdminOrderList
               data={data}
               selectedRow={selectedRow}
               setSelectedRow={setSelectedRow}
            />
         </div>

         <div id="right" className="bg-brand-gray p-4 w-full">
            <AdminOrderDetail />
         </div>
      </div>
   );
}
