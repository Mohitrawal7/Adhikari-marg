import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig"; // uses axios with JWT token already attached
import { Card, Form, Input, Button, Typography, message, DatePicker } from "antd";
import Navbar from "../components/Navbar";

const { Title } = Typography;

const JobPostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      deadline: values.deadline.format("YYYY-MM-DD"),
      postedOn: new Date().toISOString().split("T")[0],
    };

    console.log("Job Post Values:", formattedValues);

    try {
      await api.post("/api/jobs", formattedValues);
      messageApi.success({
        content: "Job created successfully!",
        duration: 2,
        placement: "topRight",
      });

      setTimeout(() => {
        navigate("/jobs"); // redirect to job list
      }, 1000);
    } catch (error) {
      console.error("Job creation failed:", error.response);
      const errorMessage =
        error.response?.data?.message || "Failed to create job. Please try again.";
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
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        {contextHolder}
        <Card style={{ width: 400 }} className="shadow-lg">
          <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
            Post a New Job
          </Title>

          <Form name="jobPost" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="jobTitle"
              label="Job Title"
              rules={[{ required: true, message: "Please enter the job title!" }]}
            >
              <Input placeholder="e.g., Software Engineer" />
            </Form.Item>

            <Form.Item
              name="agency"
              label="Agency/Organization"
              rules={[{ required: true, message: "Please enter the agency name!" }]}
            >
              <Input placeholder="e.g., National IT Board" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter the job location!" }]}
            >
              <Input placeholder="e.g., Kathmandu" />
            </Form.Item>

            <Form.Item
              name="qualification"
              label="Qualification"
              rules={[{ required: true, message: "Please enter qualifications!" }]}
            >
              <Input placeholder="e.g., Bachelor's in Computer Science" />
            </Form.Item>

            <Form.Item
              name="deadline"
              label="Application Deadline"
              rules={[{ required: true, message: "Please select the deadline!" }]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="bg-primary hover:bg-blue-600"
              >
                Create Job
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default JobPostPage;
