import React from "react";
import Navbar from "../../components/Navbar";
import { Table, Button, message } from "antd";
import api from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const featuresData = [
  {
    key: "1",
    feature: "Feature 1",
    free: "✔",
    user: "✔",
    organization: "✔",
    institute: "✔",
  },
  {
    key: "2",
    feature: "Feature 2",
    free: "❌",
    user: "✔",
    organization: "✔",
    institute: "✔",
  },
  {
    key: "3",
    feature: "Feature 3",
    free: "❌",
    user: "❌",
    organization: "✔",
    institute: "✔",
  },
  {
    key: "4",
    feature: "Feature 4",
    free: "❌",
    user: "❌",
    organization: "❌",
    institute: "✔",
  },
  {
    key: "5",
    feature: "Feature 5",
    free: "✔",
    user: "✔",
    organization: "❌",
    institute: "❌",
  },
  {
    key: "6",
    feature: "Payment",
    free: "",
    user: "$1/mo",
    organization: "$2/mo",
    institute: "$3/mo",
  },
];

const PremiumPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const columns = [
    {
      title: "Features",
      dataIndex: "feature",
      key: "feature",
      render: (text) => <strong>{text}</strong>,
    },
    { title: "Free", dataIndex: "free", key: "free", align: "center" },
    { title: "User", dataIndex: "user", key: "user", align: "center" },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      align: "center",
    },
    {
      title: "Institute",
      dataIndex: "institute",
      key: "institute",
      align: "center",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      console.log("Sending to backend:", { userId, plan });

      const response = await api.post("/api/payment/pay", { userId, plan });
      const data = response.data;

      message.success(
        `Plan ${data.plan} selected! Role: ${data.role}, Premium: ${data.isPremium}`
      );
       setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      console.error(error);
      message.error("Payment failed!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-bg min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-dark-text mb-6">
            Select a Plan
          </h1>

          <Table
            columns={columns}
            dataSource={featuresData}
            pagination={false}
            bordered
            rowClassName={(record) =>
              record.feature === "Payment" ? "bg-gray-100 font-semibold" : ""
            }
          />

          <div className="flex justify-end mt-6 space-x-4">
            <Button onClick={() => handlePayment("Free")}>Choose Free</Button>
            <Button type="primary" onClick={() => handlePayment("User")}>
              Choose User
            </Button>
            <Button
              type="primary"
              onClick={() => handlePayment("Organization")}
            >
              Choose Organization
            </Button>
            <Button type="primary" onClick={() => handlePayment("Institute")}>
              Choose Institute
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumPage;
