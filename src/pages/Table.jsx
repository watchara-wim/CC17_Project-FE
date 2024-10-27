import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Divider, notification } from "antd";
import FormReservationCheckBox from "../components/form-reservation";
import Clock from "../components/Clock";
import Button from "../components/ui/Button";
import TableReservationUser from "../components/Table-reservation-user";
import dayjs from "dayjs";

const tableList = {
   1: false,
   2: false,
   3: false,
   4: false,
   5: false,
   6: false,
   7: false,
   8: false,
   9: false,
   10: false,
   11: false,
   12: false,
   13: false,
   14: false,
};

export default function Table() {
   const [table, setTable] = useState(tableList);

   useEffect(() => {
      console.log(table);
   }, [table]);

   const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;

      setTable((prev) => ({
         ...prev,
         [name]: checked,
      }));
   };

   const handleSubmit = (e) => {
      const selectedTables = Object.keys(table).filter((key) => table[key]);

      console.log("Selected Options: ", selectedTables);
   };

   const generateTimeOptions = () => {
      const options = [];
      const currentTime = dayjs();
      const minTime = currentTime.add(2, "hour").startOf("minute"); // เวลาที่สามารถเลือกได้ (เพิ่ม 2 ชั่วโมง)

      for (let i = 10; i <= 17; i++) {
         for (let j = 0; j < 60; j += 30) {
            const time = dayjs().hour(i).minute(j).second(0);
            const formattedTime = time.format("HH:mm");

            options.push(
               <Select.Option
                  key={formattedTime}
                  value={formattedTime}
                  disabled={time.isBefore(minTime)} // ทำให้ตัวเลือก disabled ถ้าน้อยกว่า minTime
               >
                  {formattedTime}
               </Select.Option>
            );
         }
      }
      return options;
   };

   return (
      <main>
         <Form onFinish={handleSubmit} className="p-4 flex gap-4">
            <div id="shop-map" className="w-3/5 bg-blue-500/40">
               <div id="status" className="flex justify-between hidden">
                  <div className="flex gap-4 justify-between items-center rounded-3xl border border-black p-2">
                     <span>จำนวนลูกค้า</span>
                     <div className="rounded-3xl text-center bg-brand-gray py-2 w-16">
                        19
                     </div>
                  </div>
                  <div className="flex gap-4 justify-between items-center rounded-3xl border border-black p-2">
                     <span>สถานะ</span>
                     <div className="rounded-3xl text-center text-brand-green bg-brand-gray py-2 w-24">
                        รับจอง
                     </div>
                  </div>
               </div>

               <FormReservationCheckBox
                  table={table}
                  handleCheckboxChange={handleCheckboxChange}
               />
            </div>

            <div
               id="table-detail"
               className="flex flex-col gap-4 w-2/5 bg-red-500/40"
            >
               <Clock />
               <div
                  id="table-detail"
                  className="flex flex-col items-center gap-2 rounded-lg bg-brand-gray p-4"
               >
                  <div className="text-3xl font-semibold text-center">
                     ข้อมูลโต๊ะ
                  </div>
                  <div
                     id="table-number"
                     className="flex justify-between w-full"
                  >
                     <div className="w-2/5 text-end">หมายเลขโต๊ะ</div>
                     <div className="w-2/5">{"3"}</div>
                  </div>
                  <div
                     id="table-capacity"
                     className="flex justify-between w-full"
                  >
                     <div className="w-2/5 text-end">จำนวนผู้นั่งสูงสุด</div>
                     <div className="w-2/5">{"8"}</div>
                  </div>
                  <Button variant={"add"} onClick={() => console.log("เพิ่ม")}>
                     เพิ่มรายการ
                  </Button>
               </div>

               <div
                  id="reservation-detail"
                  className="flex flex-col items-center gap-2 rounded-lg bg-brand-gray p-4"
               >
                  <div className="text-3xl font-semibold text-center">
                     รายละเอียดการจอง
                  </div>
                  <TableReservationUser />
                  <div className="flex justify-between">
                     <div className="w-1/2">
                        <Form.Item
                           name="customer_amount"
                           rules={[
                              {
                                 required: true,
                                 message: "โปรดระบุจำนวน",
                                 whitespace: true,
                              },
                           ]}
                        >
                           <div className="flex items-center gap-2 w-full">
                              <div className="text-end">
                                 <span className="text-red-500">* </span>
                                 จำนวน
                              </div>
                              <div className="w-1/2">
                                 <Input placeholder="ระบุจำนวน" />
                              </div>
                              <div className="">คน</div>
                           </div>
                        </Form.Item>
                     </div>
                     <div className="w-1/2">
                        <Form.Item
                           name="reservation_time"
                           rules={[
                              {
                                 required: true,
                                 message: "โปรดระบุเวลา",
                                 whitespace: true,
                              },
                           ]}
                        >
                           <div className="flex items-center gap-2 w-full">
                              <div className="text-end">
                                 <span className="text-red-500">* </span>
                                 เวลา
                              </div>
                              <div className="w-2/3">
                                 <Select placeholder="เลือกเวลา">
                                    {generateTimeOptions()}
                                 </Select>
                              </div>
                           </div>
                        </Form.Item>
                     </div>
                  </div>
                  <Button
                     variant={"confirm"}
                     type="submit"
                     onClick={() => console.log("จอง")}
                  >
                     จอง
                  </Button>
               </div>
            </div>
         </Form>
      </main>
   );
}
