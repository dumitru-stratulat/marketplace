import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import style from "./signup.module.css";

interface Value {
  email: string;
  username: string;
  password: string;
}

const Signup = () => {
  const [statusState, setStatusState] = useState<StatusState>({
    status: "idle",
  });

  const auth = async (value: Value) => {
    try {
      setStatusState({ status: "pending" });
      const res = await axios.post("https://reactive.loca.lt/signup/", {
        email: value.email,
        username: value.username,
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

  return (
    <div>
      <Form
        name="normal_login"
        className={style.signupForm}
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
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="username"
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
          <Button
            type="primary"
            htmlType="submit"
            className={style.signupButton}
          >
            Sign up
          </Button>
        </Form.Item>
        {statusState.status === "error" && (
          <h4 className={style.error}>{statusState.message}</h4>
        )}
      </Form>
    </div>
  );
};

export default Signup;
