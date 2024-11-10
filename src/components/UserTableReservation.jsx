import React from "react";
import {
   useReactTable,
   createColumnHelper,
   getCoreRowModel,
} from "@tanstack/react-table";
import Button from "./ui/Button";
import Table from "./ui/Table";

export default function UserTableReservation({
   data = [],
   hasReservation = false,
   handleDelete = (rowId) => console.log(rowId),
}) {
   const columnHelper = createColumnHelper();

   const columns = [
      columnHelper.accessor("table_number", {
         header: "หมายเลขโต๊ะ",
         cell: (info) => info.getValue(),
         size: 151,
         minSize: 151,
         maxSize: 151,
      }),
      columnHelper.accessor("capacity", {
         header: "จำนวนที่นั่ง",
         cell: (info) => info.getValue(),
         size: 151,
         minSize: 151,
         maxSize: 151,
      }),
      columnHelper.accessor("status", {
         header: "สถานะ",
         cell: (info) => {
            const status = info.getValue();
            let display =
               status === "full"
                  ? "เต็ม"
                  : status === "reserved"
                  ? "ถูกจอง"
                  : status === "onHold"
                  ? "ถูกจอง"
                  : status === "empty"
                  ? "ว่าง"
                  : "";
            return (
               <span
                  className={`${
                     status === "reserved" ||
                     status === "full" ||
                     status === "onHold"
                        ? "text-red-500"
                        : "text-green-500"
                  }`}
               >
                  {display}
               </span>
            );
         },
         size: 101,
         minSize: 101,
         maxSize: 101,
      }),
      {
         id: "actions",
         cell: ({ row }) => (
            <Button
               variant={"cancel"}
               onClick={() => handleDelete(row.original.table_id)}
               disabled={hasReservation}
            >
               Delete
            </Button>
         ),
      },
   ];

   const table = useReactTable({
      columns,
      data: data || [],
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <div className="relative flex items-start justify-center rounded-xl bg-white overflow-hidden overflow-y-auto w-3/4 h-[300px]">
         <Table
            tanstackTable={table}
            tableClass={"w-full"}
            headerClass={"text-center"}
            bodyClass={"text-center"}
         />
      </div>
   );
}
