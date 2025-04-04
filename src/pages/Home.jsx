import React, { useEffect, useContext } from "react";
import AuthContext from "../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userAuthToken");
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
