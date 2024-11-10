import React, { useEffect, useState } from "react";
import FormSelectTable from "./FormSelectTable";
import { useAxios } from "../config/axios";
import { Form, Input, Modal, notification } from "antd";
import Button from "./ui/Button";

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

export default function AdminCreateOrder({ fetchOrder }) {
   const axios = useAxios();
   const [table, setTable] = useState(tableList);
   const [tablesData, setTablesData] = useState([]);
   const [addedTable, setAddedTable] = useState([]);
   const [listOfDisabledTables, setListOfDisabledTables] = useState([]);
   const [isTakeaway, setIsTakeaway] = useState(false);
   const [customerId, setCustomerId] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [form] = Form.useForm();

   const fetchTables = async () => {
      try {
         const response = await axios.get("/table");
         setTablesData(response.data.tables ?? []);

         const disabledTableIds = response.data.tables
            .filter((table) => !["empty"].includes(table.status))
            .map((table) => table.table_id);

         setListOfDisabledTables(disabledTableIds);
      } catch (error) {
         console.log("Error fetching tables data:", error);
         notification.error({ message: "ไม่สามารถดึงข้อมูลโต๊ะได้" });
      }
   };

   useEffect(() => {
      fetchTables();
   }, []);

   useEffect(() => {
      console.log("table", table);
   }, [table]);
   useEffect(() => {
      console.log("tablesData", tablesData);
   }, [tablesData]);
   useEffect(() => {
      console.log("addedTable", addedTable);
   }, [addedTable]);

   const handleClick = (tableNumber) => {
      setTable((prevTable) => {
         const newTable = { ...prevTable };

         newTable[tableNumber] = !newTable[tableNumber];

         return newTable;
      });

      setAddedTable((prevAddedTable) => {
         let tableList = [];
         if (prevAddedTable.includes(tableNumber)) {
            tableList = prevAddedTable.filter((item) => item !== tableNumber);
         } else {
            tableList = [...prevAddedTable, tableNumber];
         }

         return tableList.sort((a, b) => a - b);
      });
   };

   const handleClear = () => {
      setAddedTable([]);
      setIsTakeaway(false);
   };

   const handleModalSubmit = () => {
      form
         .validateFields()
         .then((values) => {
            setCustomerId(values.customer_id);
            setIsModalOpen(false);
         })
         .catch((info) => {
            console.log("Validate Failed:", info);
         });
   };

   const handleCreateOrder = async () => {
      if (!isTakeaway && addedTable.length === 0) {
         notification.error({ message: "โปรดเลือกโต๊ะที่ต้องการ" });
         return;
      }

      const orderData = {
         customer_id: customerId,
         table_id: isTakeaway ? [] : addedTable,
         net_price: 0,
      };

      try {
         const response = await axios.post("/order", orderData);
         console.log(response.data.order);
         fetchOrder();
         fetchTables();
         setAddedTable([]);
         setTable((prevTable) => {
            const resetTable = {};
            for (const key in prevTable) {
               resetTable[key] = false;
            }
            return resetTable;
         });
      } catch (error) {
         notification.error({ message: error.response.data.message });
      }
   };

   return (
      <div>
         <div className="p-4 mb-4 bg-white">
            <div className="flex gap-4 mb-4">
               <input
                  type="radio"
                  value="dine-in"
                  checked={!isTakeaway}
                  onChange={() => setIsTakeaway(false)}
               />
               <label>ทานที่ร้าน</label>
            </div>
            <FormSelectTable
               table={table}
               tablesData={tablesData}
               addedTable={addedTable}
               handleClick={handleClick}
               listOfDisabledTables={listOfDisabledTables}
               isTakeaway={isTakeaway}
            />
         </div>
         <input
            type="radio"
            value="takeaway"
            checked={isTakeaway}
            onChange={() => setIsTakeaway(true)}
         />
         <label className="ml-4">กลับบ้าน</label>

         <div className="flex gap-4 mt-4">
            <Button variant="white" onClick={handleClear}>
               Clear
            </Button>
            <Button variant="white" onClick={() => setIsModalOpen(true)}>
               หมายเลขสมาชิก
            </Button>
            <Button variant="white" onClick={handleCreateOrder}>
               สร้างออร์เดอร์
            </Button>
         </div>

         <Modal
            title="กรุณากรอกหมายเลขสมาชิก"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
         >
            <Form form={form} onFinish={handleModalSubmit}>
               <Form.Item
                  name="customer_id"
                  label="หมายเลขสมาชิก"
                  rules={[
                     { required: true, message: "กรุณากรอกหมายเลขสมาชิก!" },
                  ]}
               >
                  <Input />
               </Form.Item>
               <div className="flex justify-center gap-2">
                  <Button type="submit">ยืนยัน</Button>
               </div>
            </Form>
         </Modal>
      </div>
   );
}
