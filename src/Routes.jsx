import React from "react";
import { Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stock from "./pages/Stock";
import UsersRole from "./pages/UsersRole";

const RoutesFile = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/forget-password" element={<ForgetPassword />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/customers" element={<Customers />} />
      <Route exact path="/users-roles" element={<UsersRole />} />
      <Route exact path="/stock" element={<Stock />} />
    </Routes>
  );
};

export default RoutesFile;
