import AdminOrder from "../pages/AdminOrder";
import AdminReservation from "../pages/AdminReservation";
import Home from "../pages/Home";
import Table from "../pages/Table";

const components = {
   home: {
      url: "/",
      component: Home,
   },
   table: {
      url: "/table",
      component: Table,
   },
   adminOrder: {
      url: "order",
      component: AdminOrder,
   },
   adminReservation: {
      url: "reservation",
      component: AdminReservation,
   },
};

const ROLE_MEMBER = process.env.REACT_APP_ROLE_MEMBER;
const ROLE_ADMIN = process.env.REACT_APP_ROLE_ADMIN;

export default {
   customer: {
      allowedRoutes: [components.home, components.table],
      redirectRoutes: "/",
   },
   [ROLE_MEMBER]: {
      allowedRoutes: [components.home, components.table],
      redirectRoutes: "/",
   },
   [ROLE_ADMIN]: {
      allowedRoutes: [components.adminOrder, components.adminReservation],
      redirectRoutes: "/admin/order",
   },
};
