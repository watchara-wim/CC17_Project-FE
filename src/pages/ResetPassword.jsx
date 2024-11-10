import React from "react";
import { Form, Input, Row, Col, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../config/axios";
import Button from "../components/ui/Button";

export default function ResetPassword() {
   const axios = useAxios();
   const [form] = Form.useForm();
   const { token } = useParams();
   const navigate = useNavigate();

   const handleSubmit = (value) => {
      const body = {
         newPassword: value.new_password,
      };

      console.log(body);
      axios
         .patch(`/user/reset-password/${token}`, body)
         .then((res) => {
            notification.success({
               message: "ส่งคำขอสำเร็จ",
               description: res.data.message,
            });
         })
         .then(() => {
            setTimeout(() => {
               navigate("/");
            }, 3000);
         })
         .catch((err) => {
            notification.error({
               message: "ส่งคำขอล้มเหลว",
               description: err?.response?.data?.message,
            });
         });
   };

   return (
      <div className="relative flex items-center justify-center w-full h-screen">
         <img src="/logo.png" alt="logo" className="absolute top-[10%] w-1/4" />
         <div className="flex flex-col h-1/3 w-1/3 border rounded-3xl">
            <div className="bg-brand-pinegreen text-white text-center font-semibold text-2xl rounded-t-3xl p-6">
               ตั้งค่ารหัสผ่านใหม่
            </div>
            <div className="flex items-center justify-center h-full p-4 text-center">
               <Form form={form} onFinish={handleSubmit} className="w-full">
                  <Col
                     // xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}
                     className="w-full p-4"
                  >
                     <Row justify="center" className="mb-2">
                        <Col span={8} className="text-end pr-4">
                           <div className="text-end">
                              <span className="text-red-500">* </span>
                              รหัสผ่านใหม่
                           </div>
                        </Col>
                        <Col span={14}>
                           <Form.Item
                              name="new_password"
                              rules={[
                                 {
                                    required: true,
                                    message: "กรุณาระบุรหัสผ่าน",
                                 },
                                 {
                                    min: 6,
                                    max: 12,
                                    message:
                                       "รหัสผ่านใหม่ต้องมีความยาว 6 ถึง 12 ตัวอักษร",
                                 },
                                 {
                                    pattern:
                                       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
                                    message:
                                       "รหัสผ่านใหม่ต้องประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลข",
                                 },
                              ]}
                              hasFeedback
                           >
                              <Input.Password
                                 placeholder="รหัสผ่านใหม่"
                                 className="w-full"
                              />
                           </Form.Item>
                        </Col>
                     </Row>

                     <Row justify="center" className="mb-2">
                        <Col span={8} className="text-end pr-4">
                           <div className="text-end">
                              <span className="text-red-500">* </span>
                              ยืนยันรหัสผ่านใหม่
                           </div>
                        </Col>
                        <Col span={14}>
                           <Form.Item
                              name="confirm_new_password"
                              dependencies={["new_password"]}
                              rules={[
                                 {
                                    required: true,
                                    message: "กรุณายืนยันรหัสผ่าน",
                                 },
                                 {
                                    min: 6,
                                    max: 12,
                                    message:
                                       "รหัสผ่านใหม่ต้องมีความยาว 6 ถึง 12 ตัวอักษร",
                                 },
                                 ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                       if (
                                          !value ||
                                          getFieldValue("new_password") ===
                                             value
                                       ) {
                                          return Promise.resolve();
                                       }
                                       return Promise.reject(
                                          "รหัสผ่านใหม่ที่ยืนยันไม่ตรงกับที่ตั้งไว้"
                                       );
                                    },
                                 }),
                              ]}
                              hasFeedback
                           >
                              <Input.Password
                                 placeholder="ยืนยันรหัสผ่านใหม่"
                                 className="w-full"
                              />
                           </Form.Item>
                        </Col>
                     </Row>
                  </Col>
                  <div className="flex justify-center">
                     <Button variant="brand" type="submit">
                        รีเซ็ตรหัสผ่าน
                     </Button>
                  </div>
               </Form>
            </div>
         </div>
      </div>
   );
}
