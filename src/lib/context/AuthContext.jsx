import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import BASE_URL from "../constants/ApiUrl";
import ErrorPage from "../../components/Error";

const AuthContext = createContext();

export const AuthenticateProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState({ message: null, code: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("userAuthToken");
      setIsAuthenticated(!!token);
      setUserId(token);
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();

    const getUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users?id=${userId}`, {
          signal: controller.signal,
        });

        if (!response.data) {
          throw new Error("User data not found");
        }

        setUserDetails(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          const statusCode = error.response?.status || 500;
          const message = error.response?.data?.message || error.message;
          setError({ code: statusCode, message });
          console.error(message);
        }
      }
    };

    getUserDetails();

    return () => {
      controller.abort();
    };
  }, [userId]);

  const login = (token) => {
    localStorage.setItem("userAuthToken", token);
    setIsAuthenticated(true);
    setUserId(token);
  };

  const logout = () => {
    localStorage.removeItem("userAuthToken");
    setIsAuthenticated(false);
    setUserId(null);
    setUserDetails([]);
  };

  if (error.message) {
    return <ErrorPage message={error.message} code={error.code} />;
  }

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userDetails,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
