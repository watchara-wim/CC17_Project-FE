import React from "react";
import { Form, Input, Row, Col, Divider, notification } from "antd";
import Title from "antd/lib/typography/Title";
import Button from "./ui/Button";
import { useAxios } from "../config/axios";

export default function ResetPassword({ setOpenDialog, setAction }) {
   const axios = useAxios();
   const [form] = Form.useForm();

   const onSubmit = (values) => {
      const body = {
         email: values.email,
      };
      axios
         .patch("/user/reset-password", body)
         .then((res) => {
            notification.success({
               message: "ส่งคำขอสำเร็จ",
               description: res.data.message,
            });
            setOpenDialog(false);
            setAction("");
         })
         .catch((err) => {
            notification.error({
               message: "ส่งคำขอล้มเหลว",
               description: err?.response?.data?.message,
            });
         });
   };

   return (
      <Row justify="center">
         <Col
            // xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}
            className="w-4/5 p-4"
         >
            <Row justify="center" className="mb-6">
               <Title level={2}>ตั้งค่ารหัสผ่านใหม่</Title>
            </Row>
            <Form form={form} onFinish={onSubmit} className="w-full">
               <Form.Item
                  label="อีเมล"
                  name="email"
                  rules={[
                     {
                        type: "email",
                        message: "อีเมลไม่ถูกต้อง", // antd - err message เมื่อ input ไม่ตรง type
                     },
                     {
                        required: true,
                        message: "กรุณากรอกอีเมล",
                     },
                  ]}
               >
                  <Input placeholder="อีเมล" />
               </Form.Item>

               <div className="flex justify-center">
                  <Button type="submit" onClick={() => console.log("submit")}>
                     รีเซ็ตรหัสผ่าน
                  </Button>
               </div>
            </Form>
         </Col>
      </Row>
   );
}
