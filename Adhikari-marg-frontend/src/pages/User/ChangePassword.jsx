import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Form, Input, Button, message } from "antd";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    if (values.newPassword !== values.confirmPassword) {
      messageApi.error({
        content: "Passwords do not match!",
        duration: 2,
        placement: "topRight",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/users/change-password", {
        username: values.username,
        question: values.question,
        answer: values.answer,
        newPassword: values.newPassword
      });

      messageApi.success({
        content: "Password changed successfully! Redirecting to login...",
        duration: 2,
        placement: "topRight",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Change password failed:", error.response);
      const errorMessage = error.response?.data || "Change password failed. Try again.";
      messageApi.error({
        content: errorMessage,
        duration: 2,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="container mt-5">
        <h2>Change Password</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Security Question"
            name="question"
            rules={[{ required: true, message: 'Please enter your security question!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Answer"
            name="answer"
            rules={[{ required: true, message: 'Please enter your answer!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please enter your new password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your new password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default ChangePassword;
