import React, { useEffect, useState } from "react";
import { Form, Input, Select, notification } from "antd";
import FormSelectTable from "../components/FormSelectTable";
import Clock from "../components/Clock";
import Button from "../components/ui/Button";
import UserTableReservation from "../components/UserTableReservation";
import dayjs from "dayjs";
import { useAxios } from "../config/axios";
import { useAuthen } from "../context/authentication";

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
   const { role, accessToken } = useAuthen();
   const axios = useAxios();
   const [form] = Form.useForm();
   const [table, setTable] = useState(tableList);
   const [tablesData, setTablesData] = useState([]);
   const [reservation, setReservation] = useState({});
   const [selectedTable, setSelectedTable] = useState({});
   const [addedTable, setAddedTable] = useState([]);

   useEffect(() => {
      if (reservation.table_id) {
         setAddedTable(
            tablesData.filter((table) =>
               reservation.table_id.includes(table.table_id)
            )
         );
      }
   }, [reservation]);

   const fetchTables = async () => {
      try {
         const response = await axios.get("/table");
         setTablesData(response.data.tables ?? []);
      } catch (error) {
         console.log("Error fetching tables data:", error);
         notification.error({ message: "ไม่สามารถดึงข้อมูลโต๊ะได้" });
      }
   };

   const fetchReservation = async () => {
      try {
         const response = await axios.get("/reservation/user");
         setReservation(response.data.reservation ?? []);
      } catch (error) {
         console.log(error.response?.data?.message);
      }
   };

   // if (reservation.table_id) {
   // }

   useEffect(() => {
      fetchTables();
      if (accessToken) fetchReservation();
   }, []);

   useEffect(() => {
      console.log("reservation", reservation);
   }, [reservation]);

   useEffect(() => {
      console.log("addedTable", addedTable);
   }, [addedTable]);

   useEffect(() => {
      console.log("tablesData", tablesData);
   }, [tablesData]);

   useEffect(() => {
      const selectedTableNumber = Object.keys(table).find((key) => table[key]);

      const selectedData = tablesData?.find(
         (item) => item.table_number === selectedTableNumber
      );

      if (selectedData) {
         setSelectedTable(selectedData);
      } else {
         setSelectedTable({});
      }
   }, [table]);

   const handleClick = (tableNumber) => {
      setTable((prevTable) => {
         const newTable = { ...prevTable };

         newTable[tableNumber] = !newTable[tableNumber];

         if (newTable[tableNumber]) {
            for (let key in newTable) {
               if (key !== tableNumber && newTable[key]) {
                  newTable[key] = false;
               }
            }
         }

         return newTable;
      });
   };

   const handleDelete = (rowId) => {
      const newAddedTable = addedTable.filter(
         (item) => item.table_id !== rowId
      );

      setAddedTable(newAddedTable);
   };

   const handleSubmit = (values) => {
      const table_id = addedTable.map((table) => table.table_id);
      const capacity = addedTable.reduce(
         (total, item) => total + item.capacity,
         0
      );
      const dataToSend = {
         ...values,
         table_id,
         capacity,
      };

      axios
         .post("/reservation", dataToSend)
         .then((res) => {
            notification.success({
               message: "จองสำเร็จ",
               description: res?.response?.data?.message,
            });
            fetchTables();
            fetchReservation();
         })
         .catch((err) => {
            notification.error({
               message: "การจองล้มเหลว",
               description: err?.response?.data?.message,
            });
         });
   };

   const generateTimeOptions = () => {
      const options = [];
      // const currentTime = dayjs();
      // const minTime = currentTime.add(2, "hour").startOf("minute");

      for (let i = 10; i <= 17; i++) {
         for (let j = 0; j < 60; j += 30) {
            const time = dayjs().hour(i).minute(j).second(0);
            const formattedTime = time.format("HH:mm");

            options.push({
               label: formattedTime,
               value: formattedTime,
               // disabled: time.isBefore(minTime),
            });
         }
      }
      return options;
   };

   const getButtonDisPlay = () => {
      switch (reservation.reservation_status) {
         case "pending":
            return "กำลังดำเนินการ";
         case "accept":
            return "การจองสำเร็จ";
         case "arrive":
            return "Checked in !";
         default:
            return "ยืนยันการจอง";
      }
   };

   return (
      <main>
         <Form
            form={form}
            onFinish={handleSubmit}
            className="p-4 flex gap-4"
            disabled={role === "customer" || reservation.reservation_id}
         >
            <div
               id="shop-map"
               className="flex items-center justify-center w-3/5"
            >
               {/* <div id="status" className="flex justify-between">
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
               </div> */}

               <FormSelectTable
                  table={table}
                  tablesData={tablesData}
                  addedTable={addedTable}
                  handleClick={handleClick}
               />
            </div>

            <div id="table-detail" className="flex flex-col gap-4 w-2/5">
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
                     <div className="w-2/5">{selectedTable.table_number}</div>
                  </div>
                  <div
                     id="table-capacity"
                     className="flex justify-between w-full"
                  >
                     <div className="w-2/5 text-end">จำนวนผู้นั่งสูงสุด</div>
                     <div className="w-2/5">{selectedTable.capacity}</div>
                  </div>
                  <Button
                     variant={"add"}
                     onClick={() =>
                        setAddedTable((prev) => [...prev, selectedTable])
                     }
                     disabled={
                        !selectedTable.status ||
                        selectedTable.status === "reserved" ||
                        selectedTable.status === "full" ||
                        reservation.reservation_id ||
                        role === "customer" ||
                        addedTable.some(
                           (item) => item.table_id === selectedTable.table_id
                        )
                     }
                  >
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
                  <UserTableReservation
                     data={addedTable}
                     hasReservation={reservation.reservation_id}
                     handleDelete={handleDelete}
                  />
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
                              },
                           ]}
                        >
                           <div className="flex items-center gap-2 w-full">
                              <div className="text-end">
                                 <span className="text-red-500">* </span>
                                 เวลา
                              </div>
                              <div className="w-2/3">
                                 <Select
                                    placeholder="เลือกเวลา"
                                    options={generateTimeOptions()}
                                    onChange={(value) =>
                                       form.setFieldsValue({
                                          reservation_time: value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </Form.Item>
                     </div>
                  </div>
                  <Button
                     variant={"confirm"}
                     type="submit"
                     disabled={
                        role === "customer" || reservation.reservation_id
                     }
                  >
                     {getButtonDisPlay()}
                  </Button>
               </div>
            </div>
         </Form>
      </main>
   );
}
