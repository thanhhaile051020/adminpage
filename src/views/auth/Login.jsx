import { Form, Input, Button, message } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { HTTP_CONNECT } from "config";
import { getConfig } from "util/index";
import axios from "axios";
const Login = () => {
  let history = useHistory();

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        `${HTTP_CONNECT}/auth/login`,
        values,
        getConfig()
      );
      if (res.data.message === "Login successfully") {
        await localStorage.setItem("adminToken", res.data.accessToken);
        history.push("/admin/table/:keySearch");
        // window.location.reload();
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken") != "")
      history.push("/admin/table/:keySearch");
    else{
      history.push("/login");
    }
  },[]);

  return (
    <Form
      name="basic"
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Tài khoản"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu." }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
        <Checkbox>Lưu tài khoản</Checkbox>
      </Form.Item> */}

      <div className="w-full text-right">
        <Button type="primary" htmlType="submit" className="bg-green-4">
          Đăng nhập
        </Button>
      </div>
    </Form>
  );
};

export default Login;
