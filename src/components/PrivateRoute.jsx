import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserLayout from "./UserLayout";
import VerifyEmail from "../pages/VerifyEmail";
import authConfig from "../config/routes";
import ResetPassword from "../pages/ResetPassword";
import AdminLayout from "./AdminLayout";

export default function PrivateRoute({ role }) {
   const allowedRoutes = authConfig[role]?.allowedRoutes ?? [];
   const redirectRoutes = authConfig[role]?.redirectRoutes ?? "/";
   const admin = process.env.REACT_APP_ROLE_ADMIN;
   const location = useLocation();

   useEffect(() => {
      if (role === admin && location.pathname === "/") {
         window.location.replace(redirectRoutes);
      }
   }, [role, redirectRoutes, location.pathname]);

   return (
      <Routes>
         <Route path="/" element={<UserLayout />}>
            {allowedRoutes.map((route) => (
               <Route
                  path={route.url}
                  key={route.url}
                  exact
                  element={<route.component />}
               />
            ))}
            <Route path="*" element={<Navigate to={redirectRoutes} />} />
         </Route>

         {role === admin && (
            <Route path="/admin" element={<AdminLayout />}>
               {allowedRoutes.map((route) => (
                  <Route
                     path={route.url.replace("/admin", "")}
                     key={route.url}
                     exact
                     element={<route.component />}
                  />
               ))}
               <Route path="*" element={<Navigate to="/admin/order" />} />
            </Route>
         )}

         <Route path="/verify-email/:token" element={<VerifyEmail />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
   );
}
