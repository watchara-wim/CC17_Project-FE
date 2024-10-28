import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../config/axios";

export default function VerifyEmail() {
   const axios = useAxios();
   const { token } = useParams();
   const [message, setMessage] = useState("");
   const [messageStyle, setMessageStyle] = useState("");

   useEffect(() => {
      const verifyEmail = async () => {
         try {
            const response = await axios.get(
               `/verification/verify-email/${token}`
            );
            setMessage(response.data.message);
            setMessageStyle("text-brand-green");
         } catch (error) {
            setMessage(error.response?.data.message ?? "เกิดข้อผิดพลาด");
            setMessageStyle("text-brand-crimson");
         }
      };

      if (token) {
         verifyEmail();
      }
   }, []);

   return (
      <div className="relative flex items-center justify-center w-full h-screen">
         <img src="/logo.png" alt="logo" className="absolute top-[10%] w-1/4" />
         <div className="flex flex-col h-1/4 w-1/3 border rounded-3xl">
            <div className="bg-brand-pinegreen text-white text-center font-semibold text-2xl rounded-t-3xl p-6">
               ผลการยืนยันอีเมล
            </div>
            <div className="flex items-center justify-center h-full">
               <span className={messageStyle}>{message}</span>
            </div>
         </div>
      </div>
   );
}
