import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import VerifyEmail from "../pages/Verify-email";
import authConfig from "../config/routes";
import ResetPassword from "../pages/Reset-password";

export default function PrivateRoute({ role }) {
   const allowedRoutes = authConfig[role]?.allowedRoutes ?? [];
   const redirectRoutes = authConfig[role]?.redirectRoutes ?? "/";

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
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
         <Route path="/verify-email/:token" element={<VerifyEmail />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
   );
}
