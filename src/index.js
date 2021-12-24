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
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./style-global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import store from "./store/index.js";
import { Provider } from "react-redux";
import AdminLayout from "layouts/Admin.js";
import Login from "views/auth/index";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/admin"
          render={(props) => {
            if (localStorage.getItem("adminToken")) {
              return <AdminLayout {...props} />;
            }
            return <Redirect to="/login" />;
          }}
        />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
