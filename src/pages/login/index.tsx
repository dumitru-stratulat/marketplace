import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";

import style from "./login.module.css";

interface Value {
  email: string;
  password: string;
}

const Login = () => {
  const [statusState, setStatusState] = useState<StatusState>({
    status: "idle",
  });

  const [alertCount, setAlertCount] = useState(0);

  const auth = async (value: Value) => {
    try {
      setStatusState({ status: "pending" });
      const res = await axios.post("https://reactive.loca.lt/login/", {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem("token", res.data.token);
      setStatusState({ status: "success" });
      Router.push("/");
    } catch (err) {
      setStatusState({
        status: "error",
        message: err.response.data.message,
      });
    }
  };

  const alertMessages = [
    "Write it down somewhere next time!",
    "Try to remember!",
    "Not my problem",
    "Stop clicking me!!!",
    "Ok, Let's try to guess together",
    "Have you tried 11111?",
    "Maybe 12345?",
    "Then I have no clue...",
    "Here we go again",
  ];
  const showAlert = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    alertCount < 8 ? setAlertCount(alertCount + 1) : setAlertCount(0);
    message.error(alertMessages[alertCount]);
  };

  const loginForm = (
    <Form
      name="normal_login"
      className={style.loginForm}
      initialValues={{ remember: true }}
      onFinish={auth}
      aria-label="Some name"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
        label="Email"
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
        label="Password"
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
        <a className={style.loginForgot} href="" onClick={(e) => showAlert(e)}>
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={style.loginButton}>
          Log in
        </Button>
        Or{" "}
        <Link href="/signup">
          <a href="">register now!</a>
        </Link>
      </Form.Item>
      {statusState.status === "error" && (
        <h4 className={style.error}>{statusState.message}</h4>
      )}
    </Form>
  );

  return (
    <div className={style.loginFormContainer}>
      {statusState.status === "pending" ? (
        <Spin tip="Loading..." style={{ top: "-3rem" }}>
          {loginForm}
        </Spin>
      ) : (
        loginForm
      )}
    </div>
  );
};

export default Login;
