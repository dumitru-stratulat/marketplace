import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/Link";

import style from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = async (login: string, password: string) => {
    try {
      await axios.post("https://reactive.loca.lt/login/", {
        email: login,
        password: password,
      });
      return 200;
    } catch (err) {
      console.error(err);
    }
  };

  const onFinish = async () => {
    const status = await auth(email, password);
    if (status === 200) {
      Router.push("/");
    }
  };

  const showAlert = (e: any) => {
    e.preventDefault();
    alert("Try again!");
  };

  return (
    <div>
      <Form
        name="normal_login"
        className={style.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
      </Form>
    </div>
  );
};

export default Login;
