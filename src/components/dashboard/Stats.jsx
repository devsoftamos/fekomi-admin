import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function Stats() {
  const [loading, setLoading] = useState();
  const [productStat, setProductStat] = useState();
  const [revenueStats, setRevenueStats] = useState();
  const [transactionStats, setTransactionStats] = useState();

  const [totalCustomer, setTotalCustomer] = useState();
  const getProductStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/products/statistics`,
        {
          headers: headers,
        }
      );
      setProductStat(response.data.data?.data);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getCustomerStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomiAuthToken");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_URL}/auth/total-members`,
        {
          headers: headers,
        }
      );
      console.log(response.data, "Total");
      setTotalCustomer(response?.data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getRevenueStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/transactions/revenue/total?service=ECOMMERCE`,
        {
          headers: headers,
        }
      );

      setRevenueStats(response.data.data.total_revenue);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const getTransactionsStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/transactions/all`,
        {
          headers: headers,
        }
      );
      setTransactionStats(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  useEffect(() => {
    getProductStats();
    getRevenueStats();
    getTransactionsStats();
    getCustomerStats();
  }, []);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const numberReplace = (data) => {
    if (data.length >= 4) {
      return data.split(",")[0] + "K";
    } else {
      return data;
    }
  };
  return (
    // <div className="grid gap-8 bg-transparent">
    <div className="p-8 grid gap-4 bg-white rounded-lg shadow-md">
      <h2 className="font-semibold text-lg text-center">Statistics</h2>
      <div className="flex justify-evenly">
        <div className="flex gap-2 items-center">
          <img src="/customer-icon.svg" alt="" />

          <div className="grid">
            <span className="font-extrabold text-xl">{totalCustomer || 0}</span>
            <span className="">Customers</span>
          </div>
        </div>

        <div className="flex gap-2 items-center ">
          <img src="/revenue-icon.svg" alt="" />

          <div className="grid">
            <span className="font-extrabold text-xl">
              {revenueStats
                ? parseFloat(revenueStats).toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })
                : 0}
            </span>
            <span className="">Revenue</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <img src="/transaction-icon.svg" alt="" />

          <div className="grid">
            <span className="font-extrabold text-xl">
              {transactionStats?.total || 0}
            </span>
            <span className="">Transactions</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <img src="/customer-icon.svg" alt="" />

          <div className="grid">
            <span className="font-extrabold text-xl">
              {productStat?.total_products}
            </span>
            <span className="">Products</span>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
