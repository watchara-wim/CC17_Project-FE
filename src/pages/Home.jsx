import React from "react";

export default function Home() {
   return (
      <main>
         <div
            className="bg-cover bg-center flex flex-col items-center pb-12"
            style={{ backgroundImage: "url('/background.png')" }}
         >
            <img src="/logo_transparent.png" alt="" />
            <div className="flex flex-col gap-4 items-center text-3xl">
               <span>ร้านคาเฟอิน ยินดีต้อนรับ</span>
               <span>เปิดให้บริการทุกวัน จันทร์ - อาทิตย์</span>
               <span>10:00 - 17:00</span>
            </div>
         </div>
      </main>
   );
}
