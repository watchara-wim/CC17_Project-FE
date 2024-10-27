import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavUser from "./Navbar-user";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Login from "./Login";
import { Modal } from "antd";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

export default function Layout() {
   const [openDialog, setOpenDialog] = useState(false);
   const [action, setAction] = useState("");
   useEffect(() => {
      console.log("openDialog", openDialog);
      console.log("action", action);
   }, [openDialog, action]);

   return (
      <div>
         <NavUser setAction={setAction} setOpenDialog={setOpenDialog} />

         <main className="pb-12">
            <Outlet />
            <Modal
               open={openDialog}
               // onOk={handleOk}
               // confirmLoading={confirmLoading}
               footer={null}
               onCancel={() => {
                  setOpenDialog(false);
                  setAction("");
               }}
            >
               {action === "login" && (
                  <Login setAction={setAction} setOpenDialog={setOpenDialog} />
               )}
               {action === "reg" && (
                  <Register
                     setAction={setAction}
                     setOpenDialog={setOpenDialog}
                  />
               )}
               {action === "resetPass" && (
                  <ResetPassword
                     setAction={setAction}
                     setOpenDialog={setOpenDialog}
                  />
               )}
            </Modal>
         </main>

         <footer className="bg-black text-white w-full fixed bottom-0 p-2 flex justify-center gap-4">
            <a
               href="#"
               className="rounded-lg p-1 hover:bg-brand-gray hover:text-brand-darkgray hover:scale-110 active:scale-125 transition-transform duration-200"
            >
               <Facebook />
            </a>
            <a
               href="#"
               className="rounded-lg p-1 hover:bg-brand-gray hover:text-brand-darkgray hover:scale-110 active:scale-125 transition-transform duration-200"
            >
               <Instagram />
            </a>
            <a
               href="#"
               className="rounded-lg p-1 hover:bg-brand-gray hover:text-brand-darkgray hover:scale-110 active:scale-125 transition-transform duration-200"
            >
               <Twitter />
            </a>
         </footer>
      </div>
   );
}
