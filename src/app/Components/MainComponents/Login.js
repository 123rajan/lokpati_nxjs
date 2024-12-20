"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Post } from "../Redux/API";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, [router]);
  const checkToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Token");
      if (token && token !== "null") {
        // Check that token exists and is not null
        router.push("/dashboard");
      }
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await Post({ url: "/user/login/", data: values });
      localStorage.setItem("Token", response.tokens.access);
      message.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.log("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 min-h-screen w-[100vw] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" width={200} height={80} alt="logo" priority />
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          className="space-y-6"
        >
          <Form.Item
            name="user_name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-lg font-semibold rounded-md"
              style={{ backgroundColor: "#070f6e", borderColor: "#070f6e" }}
              loading={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
