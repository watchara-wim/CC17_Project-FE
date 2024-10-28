import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Divider, notification } from "antd";
import Title from "antd/lib/typography/Title";
import { useAuthen } from "../context/authentication";
import Button from "./ui/Button";
import { useAxios } from "../config/axios";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/th";

dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.locale("th");
dayjs.updateLocale("th", {
   formats: { LT: "H:mm น." },
});

export default function Profile({ setOpenDialog, setAction }) {
   const axios = useAxios();
   const [form] = Form.useForm();
   const { removeAccessToken, removeRole } = useAuthen();
   const [profile, setProfile] = useState({});
   const [newProfile, setNewProfile] = useState({});
   const [isEdit, setIsEdit] = useState(false);
   const [isEmailEdit, setIsEmailEdit] = useState(false);
   const [isLogOutDisabled, setIsLogOutDisabled] = useState(false);

   useEffect(() => {
      console.log("newProfile", newProfile);
   }, [newProfile]);

   const getProfile = () => {
      axios
         .get("/user/profile")
         .then((res) => {
            setProfile(res.data.profile);
         })
         .catch((err) => {
            notification.error({
               message: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง",
            });
         });
   };

   const onUpdateProfile = (values) => {
      const body = {
         name: values.new_name,
         tel: values.new_tel,
         password: values.password,
         new_password: values.new_password,
      };

      console.log("body", body);

      axios
         .patch("/user/update-profile", body)
         .then((res) => {
            notification.success({
               message: `แก้ไขข้อมูลสำเร็จ`,
               description: res?.response?.data?.message,
            });
            setTimeout(() => {
               setIsEdit((prev) => !prev);
            }, 1000);
         })
         .then(() => {
            getProfile();
         })
         .catch((err) => {
            notification.error({
               message: `แก้ไขข้อมูลไม่สำเร็จ`,
               description: err?.response?.data?.message,
            });
         });
   };

   const handleTelChange = (event) => {
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

      setNewProfile((prev) => ({ ...prev, tel: formattedPhone }));
   };

   const handleLogout = () => {
      removeRole();
      removeAccessToken();
      setOpenDialog(false);
      setAction("");
      window.location.reload();
   };

   useEffect(() => {
      getProfile();
   }, []);

   useEffect(() => {
      form.setFieldsValue({
         username: profile?.username,
         name: profile?.name,
         new_name: newProfile?.name,
         tel: profile?.tel,
         new_tel: newProfile?.tel,
         email: profile?.email,
         birth_date: dayjs(profile.birth_date).format("D MMMM"),
      });
   }, [profile, newProfile]);

   return (
      <Row justify="center">
         <Col
            // xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}
            className="w-full p-4"
         >
            <Row justify="center" className="mb-6">
               <Title level={2}>ข้อมูลสมาชิก</Title>
            </Row>
            <Form form={form} onFinish={onUpdateProfile} className="w-full">
               <Row justify="center" className="mb-2">
                  <Col span={6} className="text-end pr-4">
                     ชื่อผู้ใช้งาน
                  </Col>
                  <Col span={14}>
                     <Form.Item name="username">
                        <Input className="text-center" disabled />
                     </Form.Item>
                  </Col>
               </Row>

               <Row justify="center" className="mb-2">
                  <Col span={6} className="text-end pr-4">
                     อีเมล
                  </Col>
                  <Col span={14}>
                     <Form.Item name="email">
                        <Input className="text-center" disabled />
                     </Form.Item>
                  </Col>
               </Row>

               {isEdit ? (
                  <Row justify="center" className="mb-2">
                     <Col span={6} className="text-end pr-4">
                        <div className="text-end">
                           <span className="text-red-500">* </span>
                           ชื่อ
                        </div>
                     </Col>
                     <Col span={14}>
                        <Form.Item
                           name="new_name"
                           rules={[
                              {
                                 required: true,
                                 message: "โปรดใส่ชื่อของคุณ",
                              },
                           ]}
                        >
                           <Input className="text-center" />
                        </Form.Item>
                     </Col>
                  </Row>
               ) : (
                  <Row justify="center" className="mb-2">
                     <Col span={6} className="text-end pr-4">
                        ชื่อ
                     </Col>
                     <Col span={14}>
                        <Form.Item name="name">
                           <Input className="text-center" disabled />
                        </Form.Item>
                     </Col>
                  </Row>
               )}

               {isEdit ? (
                  <Row justify="center" className="mb-2">
                     <Col span={6} className="text-end pr-4">
                        <div className="text-end">
                           <span className="text-red-500">* </span>
                           เบอร์โทรศัพท์
                        </div>
                     </Col>
                     <Col span={14}>
                        <Form.Item
                           name="new_tel"
                           rules={[
                              {
                                 required: true,
                                 message: "เบอร์ติดต่อ",
                              },
                           ]}
                        >
                           <Input
                              className="text-center"
                              value={newProfile.tel}
                              onChange={handleTelChange}
                              maxLength={13} // จำกัดความยาวสูงสุดรวมกับ "-" เป็น 13
                              placeholder="กรุณากรอกเบอร์โทรศัพท์"
                              disabled={!isEdit}
                           />
                        </Form.Item>
                     </Col>
                  </Row>
               ) : (
                  <Row justify="center" className="mb-2">
                     <Col span={6} className="text-end pr-4">
                        เบอร์โทรศัพท์
                     </Col>
                     <Col span={14}>
                        <Form.Item name="tel">
                           <Input className="text-center" disabled />
                        </Form.Item>
                     </Col>
                  </Row>
               )}

               <Row justify="center" className="mb-2">
                  <Col span={6} className="text-end pr-4">
                     วันเกิด
                  </Col>
                  <Col span={14}>
                     <Form.Item name="birth_date">
                        <Input className="text-center" disabled />
                     </Form.Item>
                  </Col>
               </Row>

               {/* <Row justify="center" className="mb-2">
                  <Col span={6} className="text-end pr-4">
                     แต้มคงเหลือ
                  </Col>
                  <Col span={14}>
                     <Form.Item name="point">
                        <Input className="text-center" disabled />
                     </Form.Item>
                  </Col>
               </Row> */}

               {isEdit ? (
                  <>
                     <Row justify="center" className="mb-2">
                        <Col span={6} className="text-end pr-4">
                           รหัสผ่านใหม่
                        </Col>
                        <Col span={14}>
                           <Form.Item
                              name="new_password"
                              rules={[
                                 {
                                    required: false,
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
                        <Col span={6} className="text-end text-xs pr-4">
                           ยืนยันรหัสผ่านใหม่
                        </Col>
                        <Col span={14}>
                           <Form.Item
                              name="confirm_new_password"
                              dependencies={["new_password"]}
                              rules={[
                                 {
                                    required: false,
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
                                 placeholder="รหัสผ่านใหม่ของคุณ"
                                 className="w-full"
                              />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row justify="center" className="mb-2">
                        <Col span={6} className="text-end pr-4">
                           <div className="text-end">
                              <span className="text-red-500">* </span>
                              รหัสผ่าน
                           </div>
                        </Col>
                        <Col span={14}>
                           <Form.Item
                              name="password"
                              rules={[
                                 {
                                    required: true,
                                    message:
                                       "กรุณากรอกรหัสผ่าน เพื่อยืนยันการแก้ไขข้อมูล",
                                 },
                                 {
                                    min: 6,
                                    max: 12,
                                    message:
                                       "รหัสผ่านต้องมีความยาว 6 ถึง 12 ตัวอักษร",
                                 },
                              ]}
                           >
                              <Input.Password
                                 placeholder="รหัสผ่านของคุณ"
                                 className="w-full"
                              />
                           </Form.Item>
                        </Col>
                     </Row>

                     <Row justify="center" className="mb-2">
                        <Col span={12} className="flex justify-center">
                           <Button
                              onClick={() => setIsEdit(false)}
                              className="w-28"
                           >
                              ยกเลิก
                           </Button>
                        </Col>
                        <Col span={12} className="flex justify-end pr-9">
                           <Button
                              variant={"confirm"}
                              className="w-28"
                              type="submit"
                           >
                              ยืนยัน
                           </Button>
                        </Col>
                     </Row>
                  </>
               ) : (
                  <Row justify="center" className="mb-2">
                     <Col span={12} className="flex justify-center">
                        <Button
                           variant={"brand"}
                           className={"hover:scale-100 w-28"}
                           onClick={() => {
                              setIsEdit(true);
                              setNewProfile(profile);
                              form.setFieldsValue({ password: "" });
                           }}
                        >
                           แก้ไขข้อมูล
                        </Button>
                     </Col>
                     <Col span={12} className="flex justify-end pr-9">
                        <Button
                           variant={"cancel"}
                           className="w-28"
                           onClick={handleLogout}
                           disabled={isLogOutDisabled}
                        >
                           ออกจากระบบ
                        </Button>
                     </Col>
                  </Row>
               )}
            </Form>
         </Col>
      </Row>
   );
}
