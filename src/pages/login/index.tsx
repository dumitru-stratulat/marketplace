import React from "react";
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
  const auth = async (value: Value) => {
    try {
      await axios.post("https://reactive.loca.lt/login/", {
        email: value.email,
        password: value.password,
      });
      return 200;
    } catch (err) {
      console.error(err);
    }
  };

  const onFinish = async (value: Value) => {
    console.log("onFinish -> value", value);

    const status = await auth(value);
    if (status === 200) {
      Router.push("/");
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
        onFinish={onFinish}
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
      </Form>
    </div>
  );
};

export default Login;
