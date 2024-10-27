import React from "react";
import { Form, Input, Row, Col, Divider, notification } from "antd";
import Title from "antd/lib/typography/Title";
import { useAuthen } from "../context/authentication";
import Button from "./ui/Button";

export default function Login({ setOpenDialog, setAction }) {
   const { setAccessToken } = useAuthen();
   const onFinish = (values) => {
      const body = {
         username: values.username,
         password: values.password,
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
                  name="รหัสผ่าน"
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
                  <Button
                     variant="brand"
                     type="submit"
                     onClick={() => console.log("submit")}
                  >
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
                        setOpenDialog(true);
                        setAction("resetPass");
                     }, 200);
                     setOpenDialog(false);
                  }}
                  className={"text-blue-800"}
               >
                  ลืมรหัสผ่าน ?
               </Button>
               <span className="text-gray-400">{" | "}</span>
               <Button
                  variant={"link"}
                  onClick={() => {
                     setTimeout(() => {
                        setOpenDialog(true);
                        setAction("reg");
                     }, 200);
                     setOpenDialog(false);
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
