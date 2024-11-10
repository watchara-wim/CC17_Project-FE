import React from "react";
import {
   useReactTable,
   createColumnHelper,
   getCoreRowModel,
} from "@tanstack/react-table";
import Table from "./ui/Table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.locale("th");

export default function AdminOrderList({ data, selectedRow, setSelectedRow }) {
   const columnHelper = createColumnHelper();
   const columns = [
      columnHelper.accessor("order_id", {
         header: "หมายเลขออร์เดอร์",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("table_id", {
         header: "หมายเลขโต๊ะ",
         cell: (info) => info.getValue().join(", "),
      }),
      columnHelper.accessor("created_at", {
         header: "สร้างเมื่อ",
         cell: (info) =>
            dayjs.utc(info.getValue()).tz("Asia/Bangkok").format("HH:mm:ss"),
      }),
   ];

   const handleRowClick = (row) => {
      if (selectedRow?.order_id === row.order_id) {
         setSelectedRow(null);
      } else {
         setSelectedRow(row); // เลือกแถวใหม่
      }
   };

   const table = useReactTable({
      columns,
      data: data || [],
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <div className="relative flex items-start justify-center bg-white overflow-hidden overflow-y-auto h-screen">
         <Table
            tanstackTable={table}
            tableClass={"w-full"}
            rowProps={(row) => ({
               onClick: () => handleRowClick(row.original),
               className:
                  selectedRow?.order_id === row.original.order_id
                     ? "bg-gray-100"
                     : "hover:bg-gray-50",
            })}
         />
      </div>
   );
}
