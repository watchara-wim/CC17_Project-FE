import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, notification, DatePicker } from "antd";
import Title from "antd/lib/typography/Title";
import Button from "./ui/Button";
import dayjs from "dayjs";
import { useAxios } from "../config/axios";

export default function ModalRegister({ setIsModalOpen, setAction }) {
   const axios = useAxios();
   const [form] = Form.useForm();

   const onFinish = (values) => {
      const body = {
         username: values.username,
         password: values.password,
         name: values.name,
         email: values.email,
         birth_date: values.birth_date,
         tel: values.tel,
      };
      console.log("body", body);
      axios
         .post("/user/register", body)
         .then((res) => {
            notification.success({
               message: `ลงทะเบียนเสร็จสิ้น`,
               description: res?.response?.data?.message,
            });
            setTimeout(() => {
               setIsModalOpen(false);
               setAction("confirmEmail");
               setIsModalOpen(true);
            }, 1000);
         })
         .catch((err) => {
            notification.error({
               message: `ลงทะเบียนล้มเหลว`,
               description: err?.response?.data?.message,
            });
         });
   };

   const [phone, setPhone] = useState("");

   const handleChange = (event) => {
      const { value } = event.target;

      // กรองเฉพาะตัวเลข (0-9)
      const numericValue = value.replace(/\D/g, "");

      // เติม "-" ตามตำแหน่งที่ต้องการ
      let formattedPhone = numericValue;

      if (numericValue.length > 3) {
         formattedPhone = `${numericValue.slice(0, 3)}-${numericValue.slice(
            3
         )}`;
      }
      if (numericValue.length > 6) {
         formattedPhone = `${numericValue.slice(0, 3)}-${numericValue.slice(
            3,
            6
         )}-${numericValue.slice(6, 10)}`;
      }

      setPhone(formattedPhone);
   };

   const disabledDate = (current) => {
      return current && current > dayjs().endOf("day");
   };

   return (
      <Row justify="center" className="w-full">
         <Col
            // xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}
            className="w-full p-4"
         >
            <Row justify="center" className="mb-6">
               <Title level={2}>สมัครสมาชิก</Title>
            </Row>
            <Form form={form} onFinish={onFinish} className="w-full">
               <Form.Item
                  name="username"
                  rules={[
                     {
                        required: true,
                        message: "กรุณากรอกชื่อผู้ใช้งาน",
                     },
                     {
                        pattern: /^[A-Za-z0-9]+$/,
                        message:
                           "ชื่อผู้ใช้งานต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น",
                     },
                     {
                        min: 6,
                        max: 12,
                        message: "ชื่อผู้ใช้งานต้องมีความยาว 6 ถึง 12 ตัวอักษร",
                     },
                  ]}
               >
                  <div className="flex items-center gap-2 w-full">
                     <div className="text-end w-1/4">
                        <span className="text-red-500">* </span>
                        ชื่อผู้ใช้งาน:
                     </div>
                     <div className="w-3/4 pr-6">
                        <Input className="w-full" />
                     </div>
                  </div>
               </Form.Item>

               <Form.Item
                  name="email"
                  rules={[
                     {
                        type: "email",
                        message: "อีเมลไม่ถูกต้อง",
                     },
                     {
                        required: true,
                        message: "กรุณากรอกอีเมล",
                     },
                  ]}
               >
                  <div className="flex items-center gap-2 w-full">
                     <div className="text-end w-1/4">
                        <span className="text-red-500">* </span>
                        อีเมล:
                     </div>
                     <div className="w-3/4 pr-6">
                        <Input className="w-full" />
                     </div>
                  </div>
               </Form.Item>

               <Form.Item
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: "กรุณากรอกรหัสผ่าน",
                     },
                     {
                        min: 6,
                        max: 12,
                        message: "รหัสผ่านต้องมีความยาว 6 ถึง 12 ตัวอักษร",
                     },
                     {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
                        message:
                           "รหัสผ่านต้องประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลข",
                     },
                  ]}
                  hasFeedback
               >
                  <div className="flex items-center gap-2 w-full">
                     <div className="text-end w-1/4">
                        <span className="text-red-500">* </span>
                        รหัสผ่าน:
                     </div>
                     <div className="w-3/4 pr-6">
                        <Input.Password className="w-full" />
                     </div>
                  </div>
               </Form.Item>

               <Form.Item
                  name="confirm"
                  dependencies={["password"]} // dependency กับ field "password" (เป็น arr เนื่องจาก dependency กับหลาย field ได้)
                  rules={[
                     {
                        required: true,
                        message: "กรุณายืนยันรหัสผ่าน",
                     },
                     ({ getFieldValue }) => ({
                        validator(rule, value) {
                           if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(
                              "รหัสผ่านที่ยืนยันไม่ตรงกับที่ตั้งไว้"
                           );
                        },
                     }),
                  ]}
                  hasFeedback
               >
                  <div className="flex items-center gap-2 w-full">
                     <div className="text-end w-1/4">
                        <span className="text-red-500">* </span>
                        ยืนยันรหัสผ่าน:
                     </div>
                     <div className="w-3/4 pr-6">
                        <Input.Password className="w-full" />
                     </div>
                  </div>
               </Form.Item>

               <Form.Item
                  name="name"
                  rules={[
                     {
                        required: true,
                        message: "โปรดใส่ชื่อของคุณ",
                     },
                  ]}
               >
                  <div className="flex items-center gap-2 w-full">
                     <div className="text-end w-1/4">
                        <span className="text-red-500">* </span>
                        ชื่อ:
                     </div>
                     <div className="w-3/4 pr-6">
                        <Input className="w-full" />
                     </div>
                  </div>
               </Form.Item>

               <Form.Item
                  name="tel"
                  rules={[
                     {
                        required: true,
                        message: "เบอร์ติดต่อ",
                     },
                  ]}
               >
                  <div className="flex items-center gap-2 w-full">
                     <div className="text-end w-1/4">
                        <span className="text-red-500">* </span>
                        เบอร์โทรศัพท์:
                     </div>
                     <div className="w-3/4 pr-6">
                        <Input
                           className="w-full"
                           value={phone}
                           onChange={handleChange}
                           maxLength={13} // จำกัดความยาวสูงสุดรวมกับ "-" เป็น 13
                           placeholder="เช่น 012-345-6789"
                        />
                     </div>
                  </div>
               </Form.Item>

               <Form.Item
                  name="birth_date"
                  rules={[
                     {
                        required: true,
                        message: "กรุณากรอกวันเกิด",
                     },
                  ]}
               >
                  <div className="flex items-center gap-2 w-full">
                     <div className="text-end w-1/4">
                        <span className="text-red-500">* </span>
                        วันเกิด:
                     </div>
                     <div className="w-3/4 pr-6">
                        <DatePicker
                           disabledDate={disabledDate}
                           format="YYYY-MM-DD"
                           className="w-full"
                           onChange={(value) =>
                              form.setFieldsValue({
                                 birth_date: dayjs(value).format("YYYY-MM-DD"),
                              })
                           }
                        />
                     </div>
                  </div>
               </Form.Item>

               <div className="flex justify-center">
                  <Button type="submit" className="w-1/2">
                     สมัครสมาชิก
                  </Button>
               </div>
            </Form>

            <Divider className="border-black" />
            <div className="flex items-center justify-center gap-2">
               <div>มีรหัสสมาชิกอยู่แล้วใช่ไหม ? </div>
               <Button
                  variant={"link"}
                  onClick={() => {
                     setTimeout(() => {
                        setIsModalOpen(true);
                        setAction("login");
                     }, 200);
                     setIsModalOpen(false);
                  }}
                  className={"text-blue-800"}
               >
                  เข้าสู่ระบบเลย
               </Button>
            </div>
         </Col>
      </Row>
   );
}
