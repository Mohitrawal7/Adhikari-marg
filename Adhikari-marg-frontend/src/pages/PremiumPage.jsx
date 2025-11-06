import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Button, Table, Space } from 'antd'; // Using Ant Design Button and Table

const featuresData = [
  {
    key: '1',
    feature: 'Search Jobs',
    free: false,
    premium: true,
  },
  {
    key: '2',
    feature: 'Basic Alerts',
    free: false,
    premium: true,
  },
  {
    key: '3',
    feature: 'Saved Jobs',
    free: false,
    premium: true,
  },
  {
    key: '4',
    feature: 'Course Discovery',
    free: false,
    premium: true,
  },
  {
    key: '5',
    feature: 'Notification Filters',
    free: false,
    premium: true,
  },
  {
    key: '6',
    feature: 'Ad-Free Experience',
    free: false,
    premium: true,
  },
  {
    key: '7',
    feature: 'Priority Support',
    free: false,
    premium: true,
  },
];

const PremiumPage = () => {
  const columns = [
    {
      title: 'Features',
      dataIndex: 'feature',
      key: 'feature',
      render: (text) => <span className="font-medium text-dark-text">{text}</span>,
      className: 'text-left px-4 py-3', // Tailwind for Antd cell padding
    },
    {
      title: (
        <span className="flex flex-col items-center">
          <span className="font-semibold text-dark-text">Free Plan</span>
        </span>
      ),
      dataIndex: 'free',
      key: 'free',
      align: 'center',
      width: 120, // Adjusted for smaller screens
      render: (hasFeature) => (
        hasFeature ? (
          <svg className="w-5 h-5 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        ) : (
          <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        )
      ),
      className: 'px-2 py-3', // Tailwind for Antd cell padding
    },
    {
      title: (
        <span className="flex flex-col items-center">
          <span className="font-semibold text-dark-text">Premium Plan</span>
        </span>
      ),
      dataIndex: 'premium',
      key: 'premium',
      align: 'center',
      width: 120, // Adjusted for smaller screens
      render: (hasFeature) => (
        hasFeature ? (
          <svg className="w-5 h-5 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        ) : (
          <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        )
      ),
      className: 'px-2 py-3', // Tailwind for Antd cell padding
    },
  ];

  return (
    <>
    <Navbar />
    <div className="bg-gray-bg min-h-screen py-8 px-4 sm:px-6  lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-dark-text mb-8 sm:mb-10">Upgrade to Premium</h1>

        {/* Feature Comparison Table */}
        <div className="mb-10">
          <Table
            columns={columns}
            dataSource={featuresData}
            pagination={false}
            bordered={false} // Ant Design table has borders by default, removing for cleaner look
            className="upgrade-table" // Custom class for Tailwind overrides
            rowClassName={() => 'hover:bg-gray-50'} // Add hover effect to rows
          />
          {/* Custom styling for Antd table headers, as direct Tailwind classes on Table don't always apply */}
          <style jsx="true">{`
            .upgrade-table .ant-table-thead > tr > th {
              background-color: #f8f9fa !important; /* Lighter gray for headers */
              color: #333e63 !important; /* Darker text for headers */
              font-weight: 600 !important;
              border-bottom: 1px solid #e0e6ed !important;
              border-right: 1px solid #e0e6ed;
              padding-top: 1rem; /* py-4 */
              padding-bottom: 1rem; /* py-4 */
            }
            .upgrade-table .ant-table-thead > tr > th:first-child {
                border-top-left-radius: 0.5rem; /* rounded-lg */
                border-right: 1px solid #e0e6ed;
            }
            .upgrade-table .ant-table-thead > tr > th:last-child {
                border-top-right-radius: 0.5rem; /* rounded-lg */
                border-right: none;
            }
            .upgrade-table .ant-table-tbody > tr > td {
              border-bottom: 1px solid #e0e6ed;
              border-right: 1px solid #e0e6ed;
              padding: 0.75rem 1rem; /* py-3 px-4 */
            }
             .upgrade-table .ant-table-tbody > tr > td:first-child {
                border-left: none;
            }
            .upgrade-table .ant-table-tbody > tr > td:last-child {
                border-right: none;
            }
            .upgrade-table .ant-table-tbody > tr:last-child > td {
                border-bottom: none; /* No bottom border for the last row */
            }
          `}</style>
        </div>

        {/* Upgrade Now Button */}
        <Link to='/payment' className="flex justify-end mb-10">
          <Button
            type="primary"
            size="large"
            className="w-full sm:w-auto h-auto py-3 px-8 text-lg font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-gradient-start to-blue-gradient-end hover:from-blue-gradient-end hover:to-blue-gradient-start transition duration-300 border-none !text-white"
            onClick={() => console.log('Upgrade Now Clicked!')}
          >
            Upgrade Now
          </Button>
        </Link>

        {/* Accepted Payment Methods */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-light-gray-text mb-4">Accepted Payment Methods</h2>
          <div className="flex flex-wrap items-center gap-6">
            <img src="https://example.com/esewa-logo.png" alt="eSewa" className="h-8 sm:h-10 object-contain" /> {/* Replace with actual logo path */}
            <img src="https://example.com/khalti-logo.png" alt="Khalti" className="h-8 sm:h-10 object-contain" /> {/* Replace with actual logo path */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PremiumPage;