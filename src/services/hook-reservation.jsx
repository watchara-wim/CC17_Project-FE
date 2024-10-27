import React from "react";
import { useAuthen } from "../context/authentication";

export default function useReservationAPI() {
   const { accessToken } = useAuthen();
   return <div></div>;
}
