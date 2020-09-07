import React from "react";
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
  const auth = async (value: Value) => {
    try {
      await axios.post("https://reactive.loca.lt/signup/", {
        email: value.email,
        username: value.username,
        password: value.password,
      });
      return 201;
    } catch (err) {
      console.error(err);
    }
  };

  const onFinish = async (value: Value) => {
    const status = await auth(value);
    if (status === 201) {
      Router.push("/");
    }
  };

  return (
    <div>
      <Form
        name="normal_login"
        className={style.signupForm}
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
      </Form>
    </div>
  );
};

export default Signup;
