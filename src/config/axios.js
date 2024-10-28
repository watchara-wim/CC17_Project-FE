import axios from "axios";
import { notification } from "antd";
import { createContext, useContext, useEffect } from "react";
import { useAuthen } from "../context/authentication";

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
   const { accessToken, removeAccessToken, removeRole } = useAuthen();

   // สร้างอินสแตนซ์ของ axios
   const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080",
   });

   // ตั้งค่า interceptors
   axiosInstance.interceptors.request.use(
      (req) => {
         if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`;
         }
         return req;
      },
      (err) => {
         return Promise.reject(err);
      }
   );

   axiosInstance.interceptors.response.use(
      (res) => {
         return res;
      },
      (err) => {
         if (err.response?.status === 401) {
            removeAccessToken();
            removeRole();
            notification.warning({
               message: "เซสชันหมดอายุ กรุณาล็อคอินใหม่อีกครั้ง",
            });
            setTimeout(() => window.location.reload(), 2000);
         }
         return Promise.reject(err);
      }
   );

   return (
      <AxiosContext.Provider value={axiosInstance}>
         {children}
      </AxiosContext.Provider>
   );
};

export const useAxios = () => {
   return useContext(AxiosContext);
};

export default axios;
