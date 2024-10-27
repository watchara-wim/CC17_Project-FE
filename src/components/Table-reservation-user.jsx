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
   { table_id: 1, table_number: "1", capacity: 8, status: "full" },
   { table_id: 2, table_number: "2", capacity: 8, status: "empty" },
   { table_id: 3, table_number: "3", capacity: 8, status: "empty" },
   { table_id: 4, table_number: "4", capacity: 4, status: "reserved" },
   { table_id: 5, table_number: "5", capacity: 4, status: "empty" },
];

export default function TableReservationUser({
   data = mock,
   handleDelete = (rowId) => console.log(rowId),
}) {
   const columnHelper = createColumnHelper();

   const columns = [
      columnHelper.accessor("table_number", {
         header: "หมายเลขโต๊ะ",
         cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("capacity", {
         header: "จำนวนที่นั่ง",
         cell: (info) => info.getValue(),
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
                  : status === "empty"
                  ? "ว่าง"
                  : "";
            return (
               <span
                  className={`${
                     status === "reserved" || status === "full"
                        ? "text-red-500"
                        : "text-green-500"
                  }`}
               >
                  {display}
               </span>
            );
         },
      }),
      {
         id: "actions",
         cell: ({ row }) => (
            <Button
               variant={"cancel"}
               onClick={() => handleDelete(row.original.table_id)}
            >
               Delete
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
      <div className="overflow-x-auto">
         <Table
            tanstackTable={table}
            headerClass={"text-center"}
            bodyClass={"text-center"}
         />
      </div>
   );
}
