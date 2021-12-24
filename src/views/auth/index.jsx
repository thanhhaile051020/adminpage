import { Card } from "antd";
import { useState } from "react";
import Login from "./Login";
import React from 'react';
import "./style.scss"
const AuthPage = () => {
  const tabList = [
    {
      key: "login",
      tab: "Đăng nhập",
    }
  ];
  const [activeTabKey, setActiveTabKey] = useState("login");
  const contentList = {
    login: <Login />
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  return (
    <div className="auth__container">
      <div className="auth__warrper">
        <div className="auth__warrper__left">
          <img
            src="https://dotnettrickscloud.blob.core.windows.net/uploads/CourseImages/becomeamernstackdeveloper-mobile.png"
            className="mx-auto"
            alt=""
          />
        </div>
        <div className="auth__warrper__right">
          <Card
            style={{ width: "100%" }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => {
              onTabChange(key);
            }}
          >
            {contentList[activeTabKey]}
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
