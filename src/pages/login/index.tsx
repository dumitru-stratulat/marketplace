import React, { useState, useContext } from "react";
import axios from "axios";
import Router from "next/router";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import style from "./login.module.css";
import { ContextProps, AppContext } from "context/AppContext";
import HeaderLayout from "components/HeaderLayout/HeaderLayout";

interface Value {
  email: string;
  password: string;
}

const Login = () => {
  const ctx: ContextProps | null = useContext(AppContext);
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const [status, setStatus] = useState<Status>("pending");
  const auth = async (value: Value) => {
    try {
      const res = await axios.post("https://reactive.loca.lt/login/", {
        email: value.email,
        password: value.password,
      });
      localStorage.setItem("token", res.data.token);
      setStatus("success");
      await ctx.setUserInfo()
      Router.push("/");
    } catch (err) {
      setStatus("error");
    }
  };
  return (
    <div>
      <HeaderLayout />
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
          label="Parolă"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Parolă"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={style.loginButton}
          >
            Intră
          </Button>
          sau {" "}
          <Link href="/signup">
            <a href="">Înregistrare</a>
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
