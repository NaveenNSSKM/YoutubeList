// components/Login.tsx
import React, { useState } from "react";

type LoginPageProps = {
  onSuccess: () => void;
};

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // For successful login modal
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (email.trim() === "") {
      setError("Please enter a valid email.");
    } else {
      setError("");
      setShowModal(true);
    }
  };

  const confirmOtpSend = () => {
    setShowModal(false);
    setIsOtpSent(true);
  };

  const validateOtp = () => {
    if (otp.trim() === "") {
      setError("Please enter the OTP.");
    } else if (otp !== "1234") {
      setError("Invalid OTP. Try again.");
    } else {
      setError("");
     
      setShowSuccessModal(true); // Show the success modal when OTP is validated
      onSuccess(); // Trigger the onSuccess callback after successful login
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-indigo-600 to-blue-400 p-4">
      <div className="w-full max-w-md md:max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Login via OTP
        </h2>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:bg-purple-200 focus:outline-none focus:border-purple-600 transition"
          />
        </div>

        {isOtpSent && (
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:bg-purple-200 focus:outline-none focus:border-purple-600 transition"
            />
          </div>
        )}

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={isOtpSent ? validateOtp : sendOtp}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {isOtpSent ? "Submit" : "Send OTP"}
        </button>
      </div>

      {/* OTP Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm md:max-w-xl lg:max-w-2xl min-h-[30vh] max-h-[60vh] overflow-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              OTP Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              An OTP has been sent to your email: <strong>{email}</strong>.<br />
              Please confirm to proceed.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmOtpSend}
                className="py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal after login */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm md:max-w-xl lg:max-w-2xl min-h-[30vh] max-h-[60vh] overflow-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Login Successful!
            </h3>
            <p className="text-gray-600 mb-6">Welcome back, {email}!</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeSuccessModal}
                className="py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
