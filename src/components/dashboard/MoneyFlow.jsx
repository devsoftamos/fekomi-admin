import axios from "axios";
import React, { useState,useEffect } from "react";

import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
export default function MoneyFlow() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const [graphData, setGraphData] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      // {
      //   name: "series2",
      //   data: [11, 32, 45, 32, 34, 52, 41],
      // },
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
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  const [monthlyData, setMonthlyData] = useState([])
  const [loading,setLoading] = useState()
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        `${process.env.REACT_APP_WALLET_URL}/wallet/revenue/total/monthly`,
        {
          headers: headers,
        }
      );
 console.log(response.data.data);
 setMonthlyData(response.data.data?.data)
      setLoading(false);
       
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  useEffect(()=>{
    getMonthly()
  },[])
  return (
    <div className="bg-white h-[323px] w-full ">
      <div className="flex justify-between px-2 pt-1">
        <div className="font-bold">Money Flow</div>
        <div>
          <div className="inline-flex">
            <div>NGN</div>
            <div className="pl-2 font-bold">{numberWithCommas(4000000)}</div>
          </div>
        </div>
      </div>
      {/* <div className="font-black text-[#004976] px-5 py-2 text-3xl">
        {numberWithCommas(4000000)}
      </div> */}
      <div className="text-[#63799B] px-5 py-1">Members</div>
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
