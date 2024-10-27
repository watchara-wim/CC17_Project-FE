import React from "react";

export default function FormReservationCheckBox({
   table,
   handleCheckboxChange,
}) {
   return (
      <div className="relative flex justify-center">
         <img src="/map.png" alt="" className="w-4/5" />
         <div className="absolute grid grid-rows-6 items-center z-10 h-full w-full">
            <div className="translate-y-[125%] flex relative">
               <input
                  name="12"
                  type="checkbox"
                  className="relative left-[28.2%] h-5 w-5"
                  checked={table[12]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="13"
                  type="checkbox"
                  className="relative left-[41.6%] h-5 w-5"
                  checked={table[13]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="14"
                  type="checkbox"
                  className="relative left-[69.7%] translate-y-[30%] h-5 w-5"
                  checked={table[14]}
                  onChange={handleCheckboxChange}
               />
            </div>

            <div className="translate-y-[10%] flex relative">
               <input
                  name="9"
                  type="checkbox"
                  className="relative left-[20.5%] h-5 w-5"
                  checked={table[9]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="10"
                  type="checkbox"
                  className="relative left-[34.4%] h-5 w-5"
                  checked={table[10]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="11"
                  type="checkbox"
                  className="relative left-[77%] h-5 w-5"
                  checked={table[11]}
                  onChange={handleCheckboxChange}
               />
            </div>

            <div className="bg-blue-400/40"></div>

            <div className="-translate-y-[55%] flex relative">
               <input
                  name="7"
                  type="checkbox"
                  className="relative left-[52.5%] h-5 w-5"
                  checked={table[7]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="8"
                  type="checkbox"
                  className="relative left-[68%] h-5 w-5"
                  checked={table[8]}
                  onChange={handleCheckboxChange}
               />
            </div>

            <div className="-translate-y-[70%] flex relative">
               <input
                  name="4"
                  type="checkbox"
                  className="relative left-[44.7%] h-5 w-5"
                  checked={table[4]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="5"
                  type="checkbox"
                  className="relative left-[59.5%] h-5 w-5"
                  checked={table[5]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="6"
                  type="checkbox"
                  className="relative left-[75%] h-5 w-5"
                  checked={table[6]}
                  onChange={handleCheckboxChange}
               />
            </div>

            <div className="-translate-y-[230%] flex relative">
               <input
                  name="1"
                  type="checkbox"
                  className="relative left-[45%] h-5 w-5"
                  checked={table[1]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="2"
                  type="checkbox"
                  className="relative left-[60%] h-5 w-5"
                  checked={table[2]}
                  onChange={handleCheckboxChange}
               />
               <input
                  name="3"
                  type="checkbox"
                  className="relative left-[75%] h-5 w-5"
                  checked={table[3]}
                  onChange={handleCheckboxChange}
               />
            </div>
         </div>
      </div>
   );
}
