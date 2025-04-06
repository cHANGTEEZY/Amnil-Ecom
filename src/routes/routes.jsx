import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ErrorPage from "../components/Error";
import Home from "../pages/Home";
import Signup from "../pages/SignUp";
import Signin from "../pages/SignIn";
import Product from "../pages/Product";
import AccountPage from "../pages/Account";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
