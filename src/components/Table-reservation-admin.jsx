import React from "react";
import {
   useReactTable,
   createColumnHelper,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
} from "@tanstack/react-table";
import Button from "./ui/Button";
import Table from "./ui/Table";

const mock = [
   {
      reservation_id: 1,
      customer_id: 10,
      table_id: [1, 2],
      capacity: 16,
      customer_amount: "7",
      resetvation_time: "17:00",
      customer_name: "คุณ จอย",
      customer_tel: "092-222-3367",
      reservation_status: "pending",
   },
   {
      reservation_id: 2,
      customer_id: 13,
      table_id: [11],
      capacity: 4,
      customer_amount: "3",
      resetvation_time: "13:00",
      customer_name: "คุณ บอย",
      customer_tel: "092-222-3367",
      reservation_status: "waiting",
   },
   {
      reservation_id: 3,
      customer_id: 16,
      table_id: [15],
      capacity: 8,
      customer_amount: "6",
      resetvation_time: "13.3",
      customer_name: "คุณ ทอย",
      customer_tel: "092-222-3367",
      reservation_status: "cancel",
   },
];

export default function TableReservationAdmin({
   data = [],
   handleEdit = (rowId) => console.log(rowId),
   handleConfirm = (rowId) => console.log(rowId),
   handleCancel = (rowId) => console.log(rowId),
}) {
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
      columnHelper.accessor("resetvation_time", {
         header: "เวลาจอง",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("customer_name", {
         header: "ชื่อลูกค้า",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("customer_tel", {
         header: "เบอร์ติดต่อ",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("reservation_status", {
         header: "สถานะ",
         cell: (info) => {
            const status = info.getValue();
            let display =
               status === "pending"
                  ? "รอดำเนินการ"
                  : status === "waiting"
                  ? "รอเช็คอิน"
                  : status === "complete"
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
      {
         id: "edit",
         cell: ({ row }) => (
            <Button onClick={() => handleEdit(row.original.table_id)}>
               แก้ไข
            </Button>
         ),
      },
      {
         id: "actions",
         cell: ({ row }) => (
            <Button
               variant={"confirm"}
               onClick={() => handleConfirm(row.original.table_id)}
            >
               ยืนยัน
            </Button>
         ),
      },
      {
         id: "cancel",
         cell: ({ row }) => (
            <Button
               variant={"cancel"}
               onClick={() => handleCancel(row.original.table_id)}
            >
               ยกเลิก
            </Button>
         ),
      },
   ];

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
