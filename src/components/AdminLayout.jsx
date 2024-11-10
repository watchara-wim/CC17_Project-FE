import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useAuthen } from "../context/authentication";

const pageLinkItems = [
   { key: "order", href: "/admin/order", title: "จัดการออร์เดอร์" },
   { key: "reservation", href: "/admin/reservation", title: "การจองโต๊ะ" },
];

export default function AdminLayout() {
   const { removeRole, removeAccessToken } = useAuthen();
   const location = useLocation();
   const pathname = location.pathname;
   const navigate = useNavigate();

   const handleLogout = () => {
      window.location.reload();
      removeRole();
      removeAccessToken();
   };

   return (
      <div>
         <nav
            className={`sticky top-0 flex justify-between bg-brand-gray w-full py-2 px-10 border-b-2 z-50`}
         >
            <div className="flex gap-8 items-center">
               {pageLinkItems.map((item) => (
                  <Button
                     key={item.key}
                     variant={"adminLink"}
                     onClick={() => navigate(item.href)}
                     disabled={pathname === item.href}
                     className={"w-32"}
                  >
                     {item.title}
                  </Button>
               ))}
            </div>

            <Button onClick={handleLogout} variant={"adminLink"}>
               ออกจากระบบ
            </Button>
         </nav>

         <main className="pb-12 bg-brand-darkgray">
            <Outlet />
         </main>
      </div>
   );
}
