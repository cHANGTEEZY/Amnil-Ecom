import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import BASE_URL from "../constants/ApiUrl";
import ErrorPage from "../../components/Error";

const AuthContext = createContext();

export const AuthenticateProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState({ message: null, code: null });

  useEffect(() => {
    const token = localStorage.getItem("userAuthToken");
    setIsAuthenticated(!!token);
    setUserId(token);
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
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else if (err.response) {
          const status = err.response.status;
          if (status === 401) {
            setError({ message: "Unauthorized access.", code: 401 });
          } else if (status === 404) {
            setError({ message: "User not found.", code: 404 });
          } else {
            setError({ message: "An unexpected error occurred.", code: 500 });
          }
        } else {
          setError({ message: err.message, code: 500 });
        }
      }
    };

    getUserDetails();

    return () => {
      controller.abort();
    };
  }, [userId]);

  if (error.message) {
    return <ErrorPage message={error.message} code={error.code} />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
