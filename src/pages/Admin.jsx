import React from "react";
import Button from "../components/ui/Button";
import TableReservationAdmin from "../components/Table-reservation-admin";

export default function Admin() {
   return (
      <>
         <nav className="sticky top-0 flex justify-end w-full py-2 px-6 border-b-2 z-50 bg-white">
            <Button
               onClick={() => {
                  console.log("logout");
               }}
            >
               ออกจากระบบ
            </Button>
         </nav>
         <TableReservationAdmin />
      </>
   );
}
