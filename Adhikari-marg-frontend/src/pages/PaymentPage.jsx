import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests to your backend
import api from '../api/axiosConfig'; // Your axios config with auth headers
const BACKEND_URL = 'http://localhost:8080'; // Your backend URL

// Function to load Khalti Checkout script
const loadKhaltiScript = (publicKey) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('khalti-checkout-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.khalti.com/widget/khalti-checkout-v2.js';
    script.onload = resolve;
    script.onerror = reject;
    script.id = 'khalti-checkout-script';
    document.body.appendChild(script);
  });
};

const PaymentPage = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded Khalti Public Key for frontend (this is safe to expose)
  const KHALTI_PUBLIC_KEY = 'YOUR_KHALTI_PUBLIC_KEY_HERE'; // Replace with your actual public key

  // Product details for the premium access
  const productInfo = {
    amount: 1000, // Amount in paisa (e.g., 1000 paisa = Rs 10)
    product_identity: 'premium-access-plan-1',
    product_name: 'Premium Content Access',
    customer_info: {
      name: 'Test User', // Replace with actual user's name if available
      email: 'test@example.com', // Replace with actual user's email
      phone: '98XXXXXXXX' // Replace with actual user's phone
    }
  };

  // --- Fetch User Status on Load ---
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/users/me/");
        if (response.data.success) {
          setIsPremium(response.data.isPremium);
        }
      } catch (err) {
        console.error('Failed to fetch user status:', err);
        setError('Failed to fetch user status.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, []);

  // --- Initialize Khalti Checkout ---
  const handleKhaltiPayment = async () => {
    setError(null);

    // 1. Initiate payment on your backend
    try {
      const response = await axios.post(`${BACKEND_URL}/api/initiate-payment`, {
        amount: productInfo.amount,
        product_identity: productInfo.product_identity,
        product_name: productInfo.product_name,
        customer_info: productInfo.customer_info,
        user_id: userId, // Pass user ID to backend
      });

      if (response.data.success && response.data.payment_url) {
        // Redirect user to Khalti payment page
        window.location.href = response.data.payment_url;
      } else {
        setError(response.data.message || 'Failed to initiate payment with Khalti.');
      }
    } catch (err) {
      console.error('Error initiating payment:', err.response ? err.response.data : err.message);
      setError('Error initiating payment. Please try again.');
    }
  };

  // --- Verify Payment after Khalti Redirect (This is triggered by the URL parameters) ---
  useEffect(() => {
    const verifyPaymentFromURL = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pidx = urlParams.get('pidx'); // Payment index from Khalti
      const transactionId = urlParams.get('transaction_id');
      const amount = urlParams.get('amount'); // Amount in paisa
      const status = urlParams.get('status');
      const signature = urlParams.get('signature');
      const purchase_order_id = urlParams.get('purchase_order_id');
      const user_id_from_url = urlParams.get('user_id'); // Our custom user ID passed to Khalti

      // Only attempt verification if all necessary params are present and payment was successful
      if (status === 'Completed' && pidx && amount && user_id_from_url && purchase_order_id) {
        try {
          // Clear URL parameters after reading them to avoid re-triggering
          window.history.replaceState({}, document.title, window.location.pathname);

          const response = await axios.post(`${BACKEND_URL}/api/verify-payment`, {
            token: pidx, // Khalti uses 'pidx' as the verification token
            amount: amount,
            user_id: user_id_from_url,
            product_identity: purchase_order_id
          });

          if (response.data.success) {
            setIsPremium(true);
            setPremiumLink(response.data.premiumLink);
            alert('Payment Successful! You now have premium access.');
          } else {
            setError(response.data.message || 'Payment verification failed.');
          }
        } catch (err) {
          console.error('Error verifying payment after redirect:', err.response ? err.response.data : err.message);
          setError('Payment verification failed. Please contact support.');
        } finally {
          setLoading(false);
        }
      } else if (status === 'Failed' || status === 'Pending') {
         setError(`Payment ${status}. Please try again.`);
         window.history.replaceState({}, document.title, window.location.pathname); // Clear params
      }
    };

    verifyPaymentFromURL();
  }, []); // Run once on component mount

  if (loading) {
    return <div className="text-center p-4">Loading premium status...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Premium Access</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {isPremium ? (
        <div className="text-center">
          <p className="text-green-600 text-lg font-semibold mb-4">
            Congratulations! You have premium access.
          </p>
          <p className="text-gray-700 mb-2">Your exclusive premium link:</p>
          <a
            href={premiumLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out text-lg"
          >
            Go to Premium Content
          </a>
          <p className="text-sm text-gray-500 mt-2">(Link: {premiumLink || 'N/A'})</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 text-lg mb-4">
            Unlock exclusive content for just Rs {productInfo.amount / 100}!
          </p>
          <button
            onClick={handleKhaltiPayment}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out text-xl"
          >
            Pay with Khalti
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;