/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import PostManagement from "views/PostManagement/PostManagement";
import UserList from "views/UserManagement/UserManagement";
import Login from "views/auth/Login";
import ReportManagementPost from "views/ReportManagementPost/ReportManagementPost";
import ReportManagement from "views/ReportManagement/ReportManagement";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/table/:keySearch",
    name: "USERS MANAGEMENT",
    icon: "nc-icon nc-notes",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-notes",
    component: Login,
    layout: "/login",
  },
  // {
  //   path: "/reportpost/:keySearch",
  //   name: "Post Report",
  //   icon: "nc-icon nc-notes",
  //   component: ReportManagementPost,
  //   layout: "/admin",
  // },
  // {
  //   path: "/reportuser/:keySearch",
  //   name: "User Report",
  //   icon: "nc-icon nc-notes",
  //   component: ReportManagement,
  //   layout: "/admin",
  // },
  {
    path: "/postmanagement/:keySearch",
    name: "Post Management",
    icon: "nc-icon nc-notes",
    component: PostManagement,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
