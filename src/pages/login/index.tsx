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
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const auth = async (value: Value) => {
    try {
      setLoading(true);
      const res = await axios.post("https://reactive.loca.lt/login/", {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem("token", res.data.token);
      return 200;
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const onFinish = async (value: Value) => {
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
        {!loading ? (
          <h4 className={style.error}>{error}</h4>
        ) : (
          <h4>Loading...</h4>
        )}{" "}
      </Form>
    </div>
  );
};

export default Login;
