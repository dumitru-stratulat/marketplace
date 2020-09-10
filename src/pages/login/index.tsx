import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/Link";

import style from "./login.module.css";

interface Value {
  email: string;
  password: string;
}

const Login = () => {
  const [status, setStatus] = useState<Status>("pending");

  const auth = async (value: Value) => {
    try {
      const res = await axios.post("https://reactive.loca.lt/login/", {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem("token", res.data.token);
      setStatus("success");
      Router.push("/");
    } catch (err) {
      setStatus("error");
    }
  };

  const showAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    alert("Try again!");
  };

  return (
    <div>
      <Form
        name="normal_login"
        className={style.loginForm}
        initialValues={{ remember: true }}
        onFinish={auth}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className={style.loginForgot}
            href=""
            onClick={(e) => showAlert(e)}
          >
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={style.loginButton}
          >
            Log in
          </Button>
          Or{" "}
          <Link href="/signup">
            <a href="">register now!</a>
          </Link>
        </Form.Item>
        {status === "error" && (
          <h4 className={style.error}>Oops, something went wrong!</h4>
        )}
      </Form>
    </div>
  );
};

export default Login;
