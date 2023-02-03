import React from "react";
import { Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stock from "./pages/Stock";
import Transaction from "./pages/Transaction";
import UsersRole from "./pages/UsersRole";
import Revenue from "./pages/Revenue";
import Orders from "./pages/Orders";
import Dating from "./pages/Dating";
import News from "./pages/News";

import NewsDraftPage from "./pages/NewsDraft";
import Econsultation from "./pages/Econsultation";

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
      <Route exact path="/transaction" element={<Transaction />} />
      <Route exact path="/revenue" element={<Revenue />} />
      <Route exact path="/orders" element={<Orders />} />
      <Route exact path="/dating" element={<Dating />} />
      <Route exact path="/news" element={<News />} />
      <Route exact path="/newsdraft/:id" element={<NewsDraftPage />} />
      <Route exact path="/consultation" element={<Econsultation />} />
    </Routes>
  );
};

export default RoutesFile;
