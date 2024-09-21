import axios from "axios";
import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
export default function MoneyFlow() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let months = [];
  let revenue = [];

  const [graphData, setGraphData] = useState({
    series: [
      {
        name: "Monthly Revenue",
        data: [],
      },
    ],
    options: {
      colors: ["#D0EBFC"],
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#0177FB"],
      },
      xaxis: {
        type: "string",
        categories: [],
      },
      tooltip: {
        x: {
          format: "M",
        },
      },
    },
  });

  const formatMonth = (monthNumber) => {
    // Assuming the current year for the date. Adjust if necessary.
    const date = new Date(new Date().getFullYear(), monthNumber - 1, 1);
    return date.toLocaleString("default", { month: "short" });
  };

  const getMonthly = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/transactions/revenue/total/monthly`,
        {
          headers: headers,
        }
      );
      const revenue = response.data.data?.total_revenue.map((revenue) =>
        parseFloat(revenue.total_monthly_transaction)
      );

      const months = response.data.data?.total_revenue.map((revenue) =>
        formatMonth(parseInt(revenue.month))
      );

      const totalRevenue = revenue.reduce((sum, amount) => sum + amount, 0);

      setGraphData((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Monthly Revenue",
            data: revenue,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: months,
          },
        },
      }));

      setTotalRevenue(totalRevenue);
    } catch (error) {
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    } finally {
      setLoading(false);
      console.log({ months, revenue });
    }
  };
  useEffect(() => {
    getMonthly();
  }, []);

  useEffect(() => {
    console.log({ monthly: monthlyData });
  }, [monthlyData]);

  return (
    <div className="p-3 grid gap-3 bg-white w-full rounded-lg shadow-md ">
      <div className="flex justify-between px-2 pt-1">
        <div className="font-bold">Money Flow</div>
        <div>
          <div className="inline-flex">
            <span className="pl-2 font-bold">
              {totalRevenue?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </span>
          </div>
        </div>
      </div>

      <ReactApexChart
        options={graphData.options}
        series={graphData.series}
        type="area"
        height={200}
      />

      {/* <ResponsiveContainer>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis stroke="" />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#D0EBFC" fill="#D0EBFC" />
        </AreaChart>
      </ResponsiveContainer> */}
    </div>
  );
}
