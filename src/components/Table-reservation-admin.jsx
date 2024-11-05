import React, { useEffect, useState } from "react";
import {
   useReactTable,
   createColumnHelper,
   getCoreRowModel,
} from "@tanstack/react-table";
import Button from "./ui/Button";
import Table from "./ui/Table";
import { notification } from "antd";
import { useAxios } from "../config/axios";

export default function TableReservationAdmin() {
   const axios = useAxios();
   const [data, setData] = useState([]);

   const fetchData = () => {
      axios
         .get("/reservation")
         .then((res) => {
            setData(res.data?.reservations);
            console.log(res.data?.reservations);
         })
         .catch((err) => {
            notification.error({
               message: "การดึงข้อมลล้มเหลว",
               description: err?.response?.data?.message,
            });
         });
   };

   const handleConfirm = (reservationId) => {
      const dataToSend = {
         reservation_status: "accepted",
         response_at: new Date(),
      };
      axios
         .patch(`/reservation/${reservationId}`, dataToSend)
         .then(() => fetchData());
   };

   const handleCheckIn = (reservationId) => {
      const dataToSend = {
         reservation_status: "arrive",
      };
      axios
         .patch(`/reservation/${reservationId}`, dataToSend)
         .then(() => fetchData());
   };

   const handleFinish = (reservationId) => {
      const dataToSend = {
         reservation_status: "finish",
         finish_at: new Date(),
      };
      axios
         .patch(`/reservation/${reservationId}`, dataToSend)
         .then(() => fetchData());
   };

   const handleCancel = (reservationId) => {
      const dataToSend = {
         reservation_status: "cancel",
         finish_at: new Date(),
      };
      axios
         .patch(`/reservation/${reservationId}`, dataToSend)
         .then(() => fetchData());
   };

   const columnHelper = createColumnHelper();
   const columns = [
      columnHelper.accessor("reservation_id", {
         header: "เลขที่การจอง",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("table_id", {
         header: "หมายเลขโต๊ะ",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("capacity", {
         header: "จำนวนที่นั่ง",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("customer_amount", {
         header: "จำนวนลูกค้า",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("reservation_time", {
         header: "เวลาจอง",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("customer_detail.customer_name", {
         header: "ชื่อลูกค้า",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("customer_detail.customer_tel", {
         header: "เบอร์ติดต่อ",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("reservation_status", {
         header: "สถานะ",
         cell: ({ row }) => {
            const status = row.getValue("reservation_status");
            let display =
               status === "pending"
                  ? "รอดำเนินการ"
                  : status === "accepted"
                  ? "รอเช็คอิน"
                  : status === "arrive"
                  ? "เช็นอินแล้ว"
                  : status === "finish"
                  ? "เสร็จสิ้น"
                  : "ยกเลิก";
            return (
               <span
                  className={`${
                     status === "pending"
                        ? "text-brand-crimson"
                        : status === "waiting"
                        ? "text-brand-blue"
                        : status === "complete"
                        ? "text-brand-green"
                        : "text-brand-darkgray"
                  }`}
               >
                  {display}
               </span>
            );
         },
      }),
      // {
      //    id: "edit",
      //    cell: ({ row }) => (
      //       <Button onClick={() => handleEdit(row.original.table_id)}>
      //          แก้ไข
      //       </Button>
      //    ),
      // },
      {
         id: "actions",
         cell: ({ row }) => {
            const isDisabled =
               row.getValue("reservation_status") === "finish" ||
               row.getValue("reservation_status") === "cancel";
            switch (row.getValue("reservation_status")) {
               case "pending":
                  return (
                     <Button
                        variant={"confirm"}
                        className="w-[150px]"
                        onClick={() =>
                           handleConfirm(row.getValue("reservation_id"))
                        }
                        disabled={isDisabled}
                     >
                        ยืนยัน
                     </Button>
                  );
               case "accepted":
                  return (
                     <Button
                        variant={"confirm"}
                        className="w-[150px]"
                        onClick={() =>
                           handleCheckIn(row.getValue("reservation_id"))
                        }
                        disabled={isDisabled}
                     >
                        Check in
                     </Button>
                  );
               case "arrive":
                  return (
                     <Button
                        variant={"confirm"}
                        className="w-[150px]"
                        onClick={() =>
                           handleFinish(row.getValue("reservation_id"))
                        }
                        disabled={isDisabled}
                     >
                        เสร็จสิ้น
                     </Button>
                  );
               default:
                  return (
                     <Button
                        variant={"confirm"}
                        className="w-[150px]"
                        onClick={() =>
                           handleConfirm(row.getValue("reservation_id"))
                        }
                        disabled={isDisabled}
                     >
                        ยืนยัน
                     </Button>
                  );
            }
         },
      },
      {
         id: "cancel",
         cell: ({ row }) => (
            <Button
               variant={"cancel"}
               onClick={() => handleCancel(row.original.table_id)}
               disabled={
                  row.getValue("reservation_status") === "finish" ||
                  row.getValue("reservation_status") === "cancel"
               }
            >
               ยกเลิก
            </Button>
         ),
      },
   ];

   useEffect(() => {
      fetchData();
   }, []);

   const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <div className="relative flex items-start justify-center bg-white overflow-hidden overflow-y-auto h-screen">
         <Table tanstackTable={table} tableClass={"w-full"} />
      </div>
   );
}
