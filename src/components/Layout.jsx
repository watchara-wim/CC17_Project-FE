import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavUser from "./Navbar-user";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Login from "./Login";
import { Modal } from "antd";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import Button from "./ui/Button";
import Profile from "./Profile";
import { useAuthen } from "../context/authentication";

export default function Layout() {
   const { role } = useAuthen();
   const [openDialog, setOpenDialog] = useState(false);
   const [action, setAction] = useState("");

   const admin = process.env.REACT_APP_ROLE_ADMIN;

   useEffect(() => {
      if (action === "confirmEmail") {
         setTimeout(() => {
            setOpenDialog(false);
            setAction("");
         }, 8000);
      }
   }, [action]);

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
               {action === "confirmEmail" && (
                  <Row justify="center">
                     <Col className="w-full p-4">
                        <Row justify="center" className="mb-2">
                           <Title level={3}>ลงทะเบียนเสร็จสิ้น</Title>
                        </Row>
                        <Row justify="center" className="mb-6">
                           โปรดยืนยันตัวตนด้วยอีเมลที่ท่านลงทะเบียน
                           ก่อนลงชื่อใช้งาน
                        </Row>
                        <div className="flex justify-center">
                           <Button
                              onClick={() => {
                                 setOpenDialog(false);
                                 setAction("");
                              }}
                           >
                              ปิดหน้าต่าง
                           </Button>
                        </div>
                     </Col>
                  </Row>
               )}
               {action === "profile" && (
                  <Profile
                     setAction={setAction}
                     setOpenDialog={setOpenDialog}
                  />
               )}
            </Modal>
         </main>

         {role !== admin && (
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
         )}
      </div>
   );
}
