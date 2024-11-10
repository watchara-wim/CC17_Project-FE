import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useAuthen } from "../context/authentication";

const pageLinkItems = [
   { key: "home", href: "/", title: "หน้าแรก" },
   { key: "table", href: "/table", title: "ที่นั่ง" },
   { key: "about", href: "/about", title: "ติดต่อเรา" },
];
const memberLinkItems = [
   { key: "register", action: "reg", title: "สมัครสมาชิก" },
   { key: "login", action: "login", title: "เข้าสู่ระบบ" },
];

export default function NavUser({ setIsModalOpen, setAction }) {
   const { role } = useAuthen();
   const location = useLocation();
   const pathname = location.pathname;
   const navigate = useNavigate();
   const member = process.env.REACT_APP_ROLE_MEMBER;

   return (
      <nav
         className={`sticky top-0 flex justify-between bg-white w-full py-2 px-6 border-b-2 z-50`}
      >
         <div className="flex gap-12 items-center">
            <Link to="/">
               <img src="/logo.png" alt="logo" className="h-16" />
            </Link>
            {pageLinkItems.map((item) => (
               <Button
                  key={item.key}
                  variant={"link"}
                  onClick={() => navigate(item.href)}
                  disabled={pathname === item.href}
                  className={item.href === "/about" ? "hidden" : ""}
               >
                  {item.title}
               </Button>
            ))}
         </div>

         <div className="flex gap-4 items-center">
            {role === "customer" &&
               memberLinkItems.map((item) => (
                  <Button
                     key={item.key}
                     variant={item.key === "register" ? "brand" : "default"}
                     onClick={() => {
                        setIsModalOpen(true);
                        setAction(item.action);
                     }}
                  >
                     {item.title}
                  </Button>
               ))}
            {role === member && (
               <Button
                  onClick={() => {
                     setIsModalOpen(true);
                     setAction("profile");
                  }}
               >
                  Profile
               </Button>
            )}
         </div>
      </nav>
   );
}
