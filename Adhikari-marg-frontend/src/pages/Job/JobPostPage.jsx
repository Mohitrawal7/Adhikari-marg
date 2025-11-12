import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  DatePicker,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";

const { Title } = Typography;
const { TextArea } = Input;

const JobPostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);

    const formattedValues = {
      ...values,
      deadline: values.deadline.format("YYYY-MM-DD"),
      postedOn: new Date().toISOString().split("T")[0],
    };

    // Prepare multipart form data
    const formData = new FormData();
    formData.append(
      "job",
      new Blob([JSON.stringify(formattedValues)], { type: "application/json" })
    );
    if (pdfFile) {
      formData.append("pdfFile", pdfFile);
    }

    try {
      await api.post("/api/jobs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      messageApi.success({
        content: "Job created successfully!",
        duration: 2,
        placement: "topRight",
      });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error("Job creation failed:", error.response);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create job. Please try again.";
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
        <Card style={{ width: 500 }} className="shadow-lg">
          <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
            Post a New Job
          </Title>

          <Form name="jobPost" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="jobTitle"
              label="Job Title"
              rules={[
                { required: true, message: "Please enter the job title!" },
              ]}
            >
              <Input placeholder="e.g., Software Engineer" />
            </Form.Item>

            <Form.Item
              name="agency"
              label="Agency/Organization"
              rules={[
                { required: true, message: "Please enter the agency name!" },
              ]}
            >
              <Input placeholder="e.g., National IT Board" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please enter the job location!" },
              ]}
            >
              <Input placeholder="e.g., Kathmandu" />
            </Form.Item>

            <Form.Item
              name="qualification"
              label="Qualification"
              rules={[
                { required: true, message: "Please enter qualifications!" },
              ]}
            >
              <Input placeholder="e.g., Bachelor's in Computer Science" />
            </Form.Item>

            <Form.Item
              name="requirement"
              label="Job Requirements / Details"
              rules={[{ required: true, message: "Please enter job details!" }]}
            >
              <TextArea
                rows={5}
                placeholder="Describe job responsibilities, experience needed, etc."
              />
            </Form.Item>

            <Form.Item
              name="deadline"
              label="Application Deadline"
              rules={[
                { required: true, message: "Please select the deadline!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item label="Attach PDF (optional)">
              <Upload
                beforeUpload={(file) => {
                  setPdfFile(file);
                  return false; // prevent auto upload
                }}
                accept=".pdf"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select PDF</Button>
              </Upload>
              {pdfFile && (
                <p style={{ marginTop: 8, fontSize: 13 }}>
                  Selected: <strong>{pdfFile.name}</strong>
                </p>
              )}
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
