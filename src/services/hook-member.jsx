import React from "react";
import { useAuthen } from "../context/authentication";

export default function useMemberAPI() {
   const { accessToken } = useAuthen();
   return <div></div>;
}
