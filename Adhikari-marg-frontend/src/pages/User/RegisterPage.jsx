// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   Form,
//   Input,
//   Button, 
//    Select,
//   Typography,
//   message,
//   DatePicker,
// } from "antd";
// import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
// import styles from "../../style";
// import api from "../../api/axiosConfig";

// const { Title } = Typography;

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();

//   const onFinish = async (values) => {
//     setLoading(true);
//     if (values.password !== values.confirm) {
//       messageApi.error({
//         content: "Passwords do not match!",
//         duration: 2,
//         placement: "topRight",
//       });
//       setLoading(false);
//       return;
//     }

//     const formattedValues = {
//       ...values,
//       DOB: values.DOB.format("YYYY-MM-DD"),
//     };
//     console.log("Registration values:", formattedValues);

//     try {
//       // Send register request to  backend
//       await api.post("/api/auth/register", formattedValues);
//       messageApi.success({
//         content: "Registration successful! Redirecting to login...",
//         duration: 2,
//         placement: "topRight",
//       });
//       setTimeout(() => {
//         navigate("/login"); // back to login page
//       }, 10000);
//     } catch (error) {
//       console.error("Registration failed:", error.response);
//       const errorMessage =
//         error.response?.data || "Registration failed. Please try again.";
//       messageApi.error({
//         content: errorMessage,
//         duration: 2,
//         placement: "topRight",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {contextHolder}
//       <Card style={styles.card}>
//         <Title level={3} style={styles.title}>
//           Sign Up for Adhikari-Marg
//         </Title>
//         <Form name="register" onFinish={onFinish} scrollToFirstError  >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: "Please input your Username!" }]}
//             style={{ marginBottom: 10 }}
//           >
//             <Input prefix={<UserOutlined />} placeholder="Username" />
//           </Form.Item>
       

//           <Form.Item
//             name="email"
//             rules={[
//               { required: true, message: "Please input your email!" },
//               { type: "email", message: "Please enter a valid email address!" },
//             ]}
//             style={{ marginBottom: 10 }}
//           >
//             <Input prefix={<MailOutlined />} placeholder="Email" />
//           </Form.Item>

//           <Form.Item
//             name="DOB"
//             rules={[
//               { required: true, message: "Please select your date of birth!" },
//             ]}
//             style={{ marginBottom: 10 }}
//           >
//             <DatePicker
//               style={{ width: "100%" }}
//               placeholder="Select your date of birth"
//               format="YYYY-MM-DD"
//             />
//           </Form.Item>

//           <Form.Item name="userType"
//             rules={[{ required: true, message: "Please select user type!" }]}
//             style={{ marginBottom: 10 }}
//             >
//             <Select type="option" defaultValue="USER" placeholder="Select User Type" style={{ width: '100%' }}  name="userType"
//               rules={[{ required: true, message: "Please select user type!" }]}>
//               <Select.Option value="USER">User</Select.Option>
//               <Select.Option value="ORGANIZATION">Organization</Select.Option>
//               <Select.Option value="INSTITUTION">Institution</Select.Option>
//             </Select>
//           </Form.Item>

//              <Form.Item
//             name="password"
//             rules={[{ required: true, message: "Please input your Password!" }]}
//             style={{ marginBottom: 10 }}
//           >
//             <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//           </Form.Item>

//           <Form.Item
//             name="confirm"
//             rules={[
//               { required: true, message: "Please confirm your Password!" },
//             ]}
//             style={{ marginBottom: 20 }}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder="Confirm Password"
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               loading={loading}
//               style={styles.button}
//             >
//               Sign Up
//             </Button>
//           </Form.Item>
          

//           <Form.Item style={{ textAlign: "center" }}>
//             Already have an account? <Link to="/login">Log in now!</Link>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };


// export default RegisterPage;





import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Typography,
  message,
  DatePicker,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import api from "../../api/axiosConfig";

const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    if (values.password !== values.confirm) {
      return messageApi.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        DOB: values.DOB.format("YYYY-MM-DD"),
      };
      console.log("Registration values:", formattedValues);

      await api.post("/api/auth/register", formattedValues);

      messageApi.success("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Registration failed:", error.response);
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      messageApi.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right top, #6a11cb, #2575fc)",
        padding: "2rem",
      }}
    >
      {contextHolder}
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "2rem",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Optional icon/image at top */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            src="/register-icon.png" // replace with your own image path
            alt="Register"
            style={{ width: 60, height: 60 }}
          />
        </div>

        <Title level={3} style={{ textAlign: "center", color: "#2575fc", marginBottom: "1.5rem" }}>
          Create an Account
        </Title>

        <Form name="register" onFinish={onFinish} scrollToFirstError layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
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
              disabledDate={(current) => current && current > new Date()}
            />
          </Form.Item>

          <Form.Item
            name="userType"
            rules={[{ required: true, message: "Please select user type!" }]}
          >
            <Select placeholder="Select User Type">
              <Select.Option value="USER">User</Select.Option>
              <Select.Option value="ORGANIZATION">Organization</Select.Option>
              <Select.Option value="INSTITUTION">Institution</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            rules={[{ required: true, message: "Please confirm your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                background: "#2575fc",
                borderColor: "#2575fc",
                fontWeight: "bold",
                borderRadius: 8,
              }}
            >
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
            Already have an account? <Link to="/login">Log in now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;

