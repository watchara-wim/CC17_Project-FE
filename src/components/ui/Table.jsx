import React from "react";

export default function Table({
   tanstackTable,
   tableClass,
   headerClass,
   bodyClass,
   rowProps = () => ({}),
}) {
   return (
      <table
         className={`relative max-w-full bg-white rounded-xl px-4 ${tableClass}`}
      >
         <thead
            className={`sticky top-0 bg-gray-200 rounded-t-xl px-4 ${headerClass}`}
         >
            {tanstackTable.getHeaderGroups().map((headerGroup) => (
               <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                     <th
                        key={header.id}
                        className={`${
                           !index ? "pl-4" : ""
                        } px-2 py-4 text-left ${headerClass}`}
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
               <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${rowProps(row).className}`}
                  {...rowProps(row)}
               >
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
