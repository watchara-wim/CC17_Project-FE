import React from "react";
import Button from "./ui/Button";

export default function SelectTable({
   table = [],
   tablesData = [],
   addedTable = [],
   handleClick,
}) {
   const tableStatus = tablesData.reduce((acc, item) => {
      acc[item.table_number] = item.status;
      return acc;
   }, {});
   const addedTableIds = addedTable.map((table) => table.table_id);

   function statusDisplay(tableNumber) {
      const status = tableStatus[tableNumber];
      switch (status) {
         case "empty":
            return "ว่าง";
         case "reserved":
            return "จอง";
         case "full":
            return "เต็ม";
         default:
            return "-";
      }
   }

   return (
      <div className="relative flex justify-center">
         <img src="/map.png" alt="" className="w-4/5" />
         <div className="absolute flex flex-col-reverse items-stretch justify-evenly z-10 h-full w-full">
            <div className=" -translate-y-[35%] flex items-center">
               <Button
                  id="table-1"
                  variant={table[1] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[43%] ${
                     addedTableIds.includes(1) &&
                     !table[1] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("1");
                  }}
               >
                  {statusDisplay("1")}
               </Button>
               <Button
                  id="table-2"
                  variant={table[2] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[55%] ${
                     addedTableIds.includes(2) &&
                     !table[2] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("2");
                  }}
               >
                  {statusDisplay("2")}
               </Button>
               <Button
                  id="table-3"
                  variant={table[3] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[66%] ${
                     addedTableIds.includes(3) &&
                     !table[3] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("3");
                  }}
               >
                  {statusDisplay("3")}
               </Button>
            </div>
            <div className=" translate-y-[35%] flex items-center">
               <Button
                  id="table-4"
                  variant={table[4] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[43%] ${
                     addedTableIds.includes(4) &&
                     !table[4] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("4");
                  }}
               >
                  {statusDisplay("4")}
               </Button>
               <Button
                  id="table-5"
                  variant={table[5] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[55%] ${
                     addedTableIds.includes(5) &&
                     !table[5] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("5");
                  }}
               >
                  {statusDisplay("5")}
               </Button>
               <Button
                  id="table-6"
                  variant={table[6] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[67%] ${
                     addedTableIds.includes(6) &&
                     !table[6] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("6");
                  }}
               >
                  {statusDisplay("6")}
               </Button>
            </div>
            <div className=" translate-y-[25%] flex items-center">
               <Button
                  id="table-7"
                  variant={table[7] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[51%] ${
                     addedTableIds.includes(7) &&
                     !table[7] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("7");
                  }}
               >
                  {statusDisplay("7")}
               </Button>
               <Button
                  id="table-8"
                  variant={table[8] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[63%] ${
                     addedTableIds.includes(8) &&
                     !table[8] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("8");
                  }}
               >
                  {statusDisplay("8")}
               </Button>
            </div>
            <div className=""></div>
            <div className=" -translate-y-[80%] flex items-center">
               <Button
                  id="table-9"
                  variant={table[9] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[18%] ${
                     addedTableIds.includes(9) &&
                     !table[9] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("9");
                  }}
               >
                  {statusDisplay("9")}
               </Button>
               <Button
                  id="table-10"
                  variant={table[10] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[29%] ${
                     addedTableIds.includes(10) &&
                     !table[10] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("10");
                  }}
               >
                  {statusDisplay("10")}
               </Button>
               <Button
                  id="table-11"
                  variant={table[11] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[68.5%] ${
                     addedTableIds.includes(11) &&
                     !table[11] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("11");
                  }}
               >
                  {statusDisplay("11")}
               </Button>
            </div>
            <div className=" -translate-y-[15%] flex items-center">
               <Button
                  id="table-12"
                  variant={table[12] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[26%] ${
                     addedTableIds.includes(12) &&
                     !table[12] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("12");
                  }}
               >
                  {statusDisplay("12")}
               </Button>
               <Button
                  id="table-13"
                  variant={table[13] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[37%] ${
                     addedTableIds.includes(13) &&
                     !table[13] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("13");
                  }}
               >
                  {statusDisplay("13")}
               </Button>
               <Button
                  id="table-14"
                  variant={table[14] ? "select" : "white"}
                  className={`w-10 h-6 relative left-[61%] ${
                     addedTableIds.includes(14) &&
                     !table[14] &&
                     "text-white bg-brand-pinegreen hover:bg-brand-green"
                  }`}
                  onClick={() => {
                     handleClick("14");
                  }}
               >
                  {statusDisplay("14")}
               </Button>
            </div>
         </div>
      </div>
   );
}
