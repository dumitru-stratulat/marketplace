import React, { useState, useContext } from "react";
import axios from "axios";
import Router from "next/router";
import { Form, Input, Button, Cascader } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./signup.module.css";
import { locationOptions } from "utils/locationOptions";
import { ContextProps, AppContext } from "context/AppContext";
import HeaderLayout from "components/HeaderLayout/HeaderLayout";

interface Value {
  email: string;
  username: string;
  password: string;
  title: string;
  description: string;
  location: string[];
}

const Signup = () => {
  const ctx: ContextProps | null = useContext(AppContext);
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const [status, setStatus] = useState<Status>("pending");

  const auth = async (value: Value) => {
    try {
      const res = await axios.post("${process.env.SERVER_ENDPOINT}signup/", {
        email: value.email,
        username: value.username,
        password: value.password,
        profileTitle: value.title,
        profileDescription: value.description,
        location: value.location
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
        className={style.signupForm}
        initialValues={{ remember: true }}
        onFinish={auth}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Introdu email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Introdu numele utilizator" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="nume utilizator"
          />
        </Form.Item>
        <Form.Item
          label="Locația"
          name="location"
          rules={[{ required: true, message: "Introdu locația" }]}
        >
          <Cascader
            options={locationOptions}
            placeholder="Selectează"
          />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Introdu numele profilului" }]}
        >
          <Input
            placeholder="Numele profilului"
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Introdu descriptia de profil" }]}
        >
          <Input.TextArea
            autoSize={true}
            placeholder="Descripția profilului"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Introdu parola" }]}
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
            className={style.signupButton}
          >
            Înregistrare
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
