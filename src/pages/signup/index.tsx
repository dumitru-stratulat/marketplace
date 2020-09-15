import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Form, Input, Button, Cascader } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./signup.module.css";
import { locationOptions } from "utils/locationOptions";

interface Value {
  email: string;
  username: string;
  password: string;
  title: string;
  description: string;
  location: string[];
}

const Signup = () => {
  const [status, setStatus] = useState<Status>("pending");

  const auth = async (value: Value) => {
    try {
      const res = await axios.post("https://reactive.loca.lt/signup/", {
        email: value.email,
        username: value.username,
        password: value.password,
        profileTitle: value.title,
        profileDescription: value.description,
        location: value.location
      });
      localStorage.setItem("token", res.data.token);
      setStatus("success");
      Router.push("/");
    } catch (err) {
      setStatus("error");
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
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input your Location" }]}
        >
          <Cascader
            options={locationOptions}
          />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input your profile title!" }]}
        >
          <Input
            placeholder="Profile title"
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please input your profile description!" }]}
        >
          <Input.TextArea
            autoSize={true}
            placeholder="Profile description"
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
        {status === "error" && (
          <h4 className={style.error}>Oops, something went wrong!</h4>
        )}
      </Form>
    </div>
  );
};

export default Signup;
