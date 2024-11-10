import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavUser from "./Navbar";
import { Facebook, Instagram, Twitter } from "lucide-react";
import ModalLogin from "./ModalLogin";
import { Modal } from "antd";
import ModalRegister from "./ModalRegister";
import ModalResetPassword from "./ModalResetPassword";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import Button from "./ui/Button";
import ModalProfile from "./ModalProfile";

export default function UserLayout() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [action, setAction] = useState("");

   useEffect(() => {
      if (action === "confirmEmail") {
         setTimeout(() => {
            setIsModalOpen(false);
            setAction("");
         }, 8000);
      }
   }, [action]);

   return (
      <div>
         <NavUser setAction={setAction} setIsModalOpen={setIsModalOpen} />
         <main className="pb-12">
            <Outlet />
            <Modal
               open={isModalOpen}
               // onOk={handleOk}
               // confirmLoading={confirmLoading}
               footer={null}
               onCancel={() => {
                  setIsModalOpen(false);
                  setAction("");
               }}
            >
               {action === "login" && (
                  <ModalLogin
                     setAction={setAction}
                     setIsModalOpen={setIsModalOpen}
                  />
               )}
               {action === "reg" && (
                  <ModalRegister
                     setAction={setAction}
                     setIsModalOpen={setIsModalOpen}
                  />
               )}
               {action === "resetPass" && (
                  <ModalResetPassword
                     setAction={setAction}
                     setIsModalOpen={setIsModalOpen}
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
                                 setIsModalOpen(false);
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
                  <ModalProfile
                     setAction={setAction}
                     setIsModalOpen={setIsModalOpen}
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
