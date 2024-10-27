import React from "react";

export default function Table({
   tanstackTable,
   tableClass,
   headerClass,
   bodyClass,
}) {
   return (
      <table className={`min-w-full bg-white rounded-xl px-4 ${tableClass}`}>
         <thead className="px-4">
            {tanstackTable.getHeaderGroups().map((headerGroup) => (
               <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                     <th
                        key={header.id}
                        className={`${
                           !index ? "pl-4" : ""
                        } px-2 py-4 border-b text-left ${headerClass}`}
                     >
                        {header.isPlaceholder
                           ? null
                           : header.column.columnDef.header}
                     </th>
                  ))}
               </tr>
            ))}
         </thead>
         <tbody className="px-4">
            {tanstackTable.getRowModel().rows.map((row) => (
               <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell, index) => (
                     <td
                        key={cell.id}
                        className={`${
                           !index ? "pl-4" : ""
                        } px-2 py-2 border-b ${bodyClass}`}
                     >
                        {cell.column.columnDef.cell(cell.getContext())}
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
}
