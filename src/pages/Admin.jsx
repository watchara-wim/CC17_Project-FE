import React from "react";
import Button from "../components/ui/Button";
import TableReservationAdmin from "../components/Table-reservation-admin";
import { useAuthen } from "../context/authentication";

export default function Admin() {
   return (
      <>
         <TableReservationAdmin />
      </>
   );
}
