import React from "react";
import { Form, Input, Row, Col, Divider, notification } from "antd";
import Title from "antd/lib/typography/Title";
import { useAuthen } from "../context/authentication";
import Button from "./ui/Button";

export default function ResetPassword({ setOpenDialog, setAction }) {
   const { setAccessToken } = useAuthen();
   const onFinish = (values) => {
      const body = {
         email: values.email,
      };
      // axios
      //    .post("/users/login", body)
      //    .then((res) => {
      //       localStorageService.setToken(res.data.token);
      //       props.setRole("user");
      //       notification.success({
      //          message: "Login success",
      //       });
      //    })
      //    .catch((err) => {
      //       notification.error({
      //          message: "Login failed",
      //       });
      // });
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
            <Form onFinish={onFinish} className="w-full">
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
