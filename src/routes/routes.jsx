import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorPage from "../components/Error";
import Home from "../pages/Home";
import Signup from "../pages/SignUp";
import Signin from "../pages/SignIn";
import Product from "../pages/Product";
import AccountPage from "../pages/Account";
import Cart from "../pages/Cart";
import RequireAuth from "./RequireAuth";
import RequireNoAuth from "./RequireNoAuth";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route element={<RequireNoAuth />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
