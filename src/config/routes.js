import Admin from "../pages/Admin";
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
   admin: {
      url: "/",
      component: Admin,
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
      allowedRoutes: [components.admin],
      redirectRoutes: "/",
   },
};
