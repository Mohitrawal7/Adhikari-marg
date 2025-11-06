import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, Button, Typography, message,DatePicker } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "../style"; 

const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    if (values.password !== values.confirm) {
      messageApi.error({
        content: "Passwords do not match!",
        duration: 2,
        placement: "topRight",
      });
      setLoading(false);
      return;
    }
    
    const formattedValues = {
      ...values,
      DOB: values.DOB.format("YYYY-MM-DD")
    };
     console.log('Registration values:', formattedValues);

    try {
      // Send register request to  backend
      await axios.post("http://localhost:8080/api/auth/register", formattedValues);
      messageApi.success({
        content: "Registration successful! Redirecting to login...",
        duration: 2,
        placement: "topRight",
      });
      setTimeout(() => {
        navigate("/login"); // back to login page
      }, 10000);
    } catch (error) {
      console.error("Registration failed:", error.response);
      const errorMessage =
        error.response?.data || "Registration failed. Please try again.";
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
    <div style={styles.page}>
      {contextHolder}
      <Card style={styles.card}>
        <Title level={3} style={styles.title}>
          Sign Up for Adhikari-Marg
        </Title>
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            rules={[
              { required: true, message: "Please confirm your Password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

         <Form.Item
         name="email"
           rules={[
                 { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email address!" },
                 ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>


         <Form.Item
          name="DOB"
           rules={[{ required: true, message: "Please select your date of birth!" }]}
        >
         <DatePicker
             style={{ width: "100%" }}
             placeholder="Select your date of birth"
              format="YYYY-MM-DD"
            />
          </Form.Item>            

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={styles.button}
            >
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            Already have an account? <Link to="/login">Log in now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// const styles = {
//   page: {
//     minHeight: '100vh',
//     minWidth: '100vw',
//     background: 'linear-gradient(to right top, #6a11cb, #2575fc)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '2rem'
//   },
//   card: {
//     width: '100%',
//     maxWidth: 420,
//     padding: '2rem',
//     borderRadius: '16px',
//     background: 'rgba(244, 212, 175, 0.95)',
//     boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#2575fc',
//     marginBottom: '1.5rem',
//   },
//   label: {
//     fontWeight: 500,
//     color: '#333',
//   },
//   button: {
//     background: '#2575fc',
//     borderColor: '#2575fc',
//     fontWeight: 'bold',
//   },
//   footerText: {
//     textAlign: 'center',
//     marginTop: '1rem',
//     color: '#555',
//   },
//   link: {
//     color: '#2575fc',
//     fontWeight: '500'
//   }
// };

export default RegisterPage;
