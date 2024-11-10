import React, { useEffect } from "react";
import { Form, Input, Row, Col, Divider, notification } from "antd";
import Title from "antd/lib/typography/Title";
import { useAuthen } from "../context/authentication";
import { useAxios } from "../config/axios";
import Button from "./ui/Button";

export default function ModalLogin({ setIsModalOpen, setAction }) {
   const axios = useAxios();
   const { accessToken, setAccessToken, role, setRole } = useAuthen();
   const onFinish = (values) => {
      const body = {
         username: values.username,
         password: values.password,
      };
      axios
         .post("/user/login", body)
         .then((res) => {
            setAccessToken(res.data.token);
            setRole(res.data.access);
            setIsModalOpen(false);
            setAction("");
            notification.success({
               message: "Login สำเร็จ",
               description: res?.response?.data?.message,
            });
         })
         .catch((err) => {
            notification.error({
               message: "Login ไม่สำเร็จ",
               description: err?.response?.data?.message,
            });
         });
   };

   useEffect(() => {
      console.log("accessToken", accessToken);
      console.log("role", role);
   }, [accessToken, role]);

   return (
      <Row justify="center">
         <Col
            className="w-3/4 p-4"
            // xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}
         >
            <Row justify="center" className="mb-6">
               <Title level={2}>เข้าสู่ระบบ</Title>
            </Row>
            <Form onFinish={onFinish} className="w-full">
               <Form.Item
                  label="ชื่อผู้ใช้งาน"
                  name="username"
                  rules={[
                     {
                        required: true,
                        message: "กรุณากรอกชื่อผู้ใช้งาน",
                     },
                  ]}
               >
                  <Input placeholder="กรอกชื่อผู้ใช้งาน" />
               </Form.Item>

               <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: "กรุณากรอกรหัสผ่าน",
                     },
                  ]}
               >
                  <Input.Password placeholder="กรอกรหัสผ่าน" />
               </Form.Item>

               <div className="flex justify-center">
                  <Button variant="brand" type="submit">
                     เข้าสู่ระบบ
                  </Button>
               </div>
            </Form>
            <Divider className="border-black" />
            <div className="flex items-center justify-center gap-2">
               <Button
                  variant={"link"}
                  onClick={() => {
                     setTimeout(() => {
                        setIsModalOpen(true);
                        setAction("resetPass");
                     }, 200);
                     setIsModalOpen(false);
                  }}
                  className={"text-red-500"}
               >
                  ลืมรหัสผ่าน ?
               </Button>
               <span className="text-gray-400">{" | "}</span>
               <Button
                  variant={"link"}
                  onClick={() => {
                     setTimeout(() => {
                        setIsModalOpen(true);
                        setAction("reg");
                     }, 200);
                     setIsModalOpen(false);
                  }}
                  className={"text-blue-800"}
               >
                  สมัครสมาชิก
               </Button>
            </div>
         </Col>
      </Row>
   );
}
