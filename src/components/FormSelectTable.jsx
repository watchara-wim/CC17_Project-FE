import React from "react";
import Button from "./ui/Button";

export default function FormSelectTable({
   table = [],
   tablesData = [],
   addedTable = [],
   listOfDisabledTables = [],
   isTakeaway = false,
   handleClick,
}) {
   const tableStatus = tablesData.reduce((acc, item) => {
      acc[item.table_number] = item.status;
      return acc;
   }, {});
   const addedTableIds = addedTable.map((table) => table.table_id);

   const statusDisplay = (tableNumber) => {
      const status = tableStatus[tableNumber];
      switch (status) {
         case "empty":
            return "ว่าง";
         case "reserved":
         case "onHold":
            return "จอง";
         case "full":
            return "เต็ม";
         default:
            return "-";
      }
   };

   const statusStyle = (tableNumber) => {
      const status = tableStatus[tableNumber];
      switch (status) {
         case "reserved":
         case "onHold":
         case "full":
            return "text-brand-crimson";
         default:
            return "";
      }
   };

   const buttonData = [
      {
         translateY: "-translate-y-[35%]",
         buttons: [
            { id: 1, position: "left-[43.0%]" },
            { id: 2, position: "left-[55.0%]" },
            { id: 3, position: "left-[66.0%]" },
         ],
      },
      {
         translateY: "translate-y-[35.0%]",
         buttons: [
            { id: 4, position: "left-[43.0%]" },
            { id: 5, position: "left-[54.5%]" },
            { id: 6, position: "left-[66.5%]" },
         ],
      },
      {
         translateY: "translate-y-[25%]",
         buttons: [
            { id: 7, position: "left-[51.0%]" },
            { id: 8, position: "left-[63.0%]" },
         ],
      },
      { translateY: "", buttons: [] },
      {
         translateY: "-translate-y-[80%]",
         buttons: [
            { id: 9, position: "left-[18.5%]" },
            { id: 10, position: "left-[29%]" },
            { id: 11, position: "left-[68.5%]" },
         ],
      },
      {
         translateY: "-translate-y-[35%]",
         buttons: [
            { id: 12, position: "left-[26.5%]" },
            { id: 13, position: "left-[36.5%]" },
            { id: 14, position: "left-[61.0%] translate-y-[15%]" },
         ],
      },
   ];

   return (
      <div className="relative flex justify-center">
         <img src="/map.png" alt="" className="w-4/5" />
         <div className="absolute flex flex-col-reverse items-stretch justify-evenly z-10 h-full w-full">
            {buttonData.map((group, index) => (
               <div
                  key={index}
                  className={`flex items-center ${group.translateY}`}
               >
                  {group.buttons.map(({ id, position }) => (
                     <Button
                        key={id}
                        id={`table-${id}`}
                        variant={table[id] ? "select" : "white"}
                        className={`w-10 h-6 relative ${position} ${
                           addedTableIds.includes(id) &&
                           !table[id] &&
                           "text-white bg-brand-pinegreen hover:bg-brand-green"
                        }`}
                        onClick={() => handleClick(id.toString())}
                        disabled={
                           listOfDisabledTables.includes(id) || isTakeaway
                        }
                     >
                        <span
                           className={
                              addedTableIds.includes(id)
                                 ? "text-white"
                                 : statusStyle(id.toString())
                           }
                        >
                           {statusDisplay(id.toString())}
                        </span>
                     </Button>
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}
