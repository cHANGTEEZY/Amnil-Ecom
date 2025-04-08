import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Avatar, message as antdMessage } from "antd";

import AuthContext from "../lib/context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BASE_URL from "../lib/constants/ApiUrl";

const AccountPage = () => {
  const { userDetails } = useContext(AuthContext);
  const [apiResponseMessage, setApiResponseMessage] = useState("");

  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const currentUser = Array.isArray(userDetails) ? userDetails[0] : null;

  useEffect(() => {
    if (currentUser) {
      setAccountData((prevData) => ({
        ...prevData,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: currentUser.password,
      }));
    }
  }, [currentUser]);

  const passwordRef = useRef();
  const newPasswordRef = useRef();

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const validatePassword = (currentPassword, newPassword) => {
    const newErrors = {};

    if (currentPassword !== accountData.password)
      newErrors.currentPassword =
        "Current Password do not match with your account password";

    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (newPassword.length < 6)
      newErrors.newPassword = "New password must be at least 6 characters";

    return newErrors;
  };

  const handleNewPassword = async () => {
    const currentPassword = passwordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    const validationErrors = validatePassword(currentPassword, newPassword);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/users/${currentUser.id}`,
        {
          password: newPassword,
        },
      );

      console.log(response);

      if (response.status === 200) {
        setApiResponseMessage("Password updated successfully");
      } else {
        setApiResponseMessage(
          "Failed to update password. Please check your current password.",
        );
      }
    } catch (error) {
      setApiResponseMessage("Error updating password. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <Header showNav={false} showSearch={false} />
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Account Settings
        </h1>
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 ">
          <div className="flex items-center space-x-4">
            <Avatar size={64} className="uppercase">
              {currentUser?.firstName?.charAt(0)}{" "}
              {currentUser?.lastName?.charAt(0)}
            </Avatar>
            <div className="ml-4">
              <p className="text-lg font-semibold">
                {accountData.firstName} {accountData.lastName}
              </p>
              <p className="text-sm text-gray-500">{accountData.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-xl ">
              <p className="text-sm text-gray-500 mb-1">First Name</p>
              <p className="text-lg font-medium">{accountData.firstName}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Last Name</p>
              <p className="text-lg font-medium">{accountData.lastName}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg font-medium">{accountData.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Password</p>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Enter current password"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.currentPassword}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">New Password</p>
              <input
                ref={newPasswordRef}
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleNewPassword}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
            >
              Update Password
            </button>
          </div>
          {apiResponseMessage && (
            <span className="text-green-300">{apiResponseMessage}</span>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default AccountPage;
