import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function Transaction() {
  const [loading, setLoading] = useState();
  const [latestData, setLatestData] = useState();
  const [transactionData, setTransactionData] = useState();

  const getLatestTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/transactions/latest`,
        {
          headers: headers,
        }
      );

      console.log({ latest: response.data.data });

      setTransactionData(response.data?.data?.transactions);
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
    getLatestTransactions();
  }, []);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="p-8 grid gap-4 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg text-center">
          Recent Transactions
        </h2>
        <Link to="/transaction">
          <div className="px-6 py-2 hover:text-deepBlue hover:bg-lightblue rounded-lg">
            View All
          </div>
        </Link>
      </div>
      <table id="pagetodownload" class="min-w-full">
        <thead class="bg-white border-b   border-gray-300">
          <tr className="font-extrabold">
            <th
              scope="col"
              class="text-sm font-extrabold text-[#174A84] px-6 py-4 text-left"
            >
              Customer
            </th>

            <th
              scope="col"
              class="text-md font-extrabold text-[#174A84] px-6 py-4 text-left"
            >
              Type
            </th>
            <th
              scope="col"
              class="text-md font-extrabold text-[#174A84] px-6 py-4 text-left"
            >
              Reference ID
            </th>
            <th
              scope="col"
              class="text-md font-extrabold text-[#174A84] px-6 py-4 text-left"
            >
              Date
            </th>

            <th
              scope="col"
              class="text-md font-extrabold text-[#174A84] px-6 py-4 text-left"
            >
              Amount Paid (NGN)
            </th>
          </tr>
        </thead>
        <tbody className="max-h-[40vh] overflow-y-auto">
          {!transactionData &&
            [...new Array(6)].map((d) => (
              <tr
                //key={i}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                  <Skeleton height={15} />
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Skeleton height={15} />
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Skeleton height={15} />
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Skeleton height={15} />
                </td>

                <td
                  //onClick={() => handleGetData(data)}
                  className="text-sm text-[#0AC293] capitalize font-bold px-6 py-4 whitespace-nowrap"
                >
                  <Skeleton height={15} />
                </td>
                <td className="text-sm text-[#0AC293] capitalize font-bold px-6 py-4 whitespace-nowrap">
                  <Skeleton height={15} />
                </td>
              </tr>
            ))}
          {transactionData?.length &&
            transactionData?.map((data, i) => (
              <tr
                //onClick={() => setModalOpen("modal-open")}
                class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {data?.user?.name || "GUEST"}
                </td>

                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {data?.description}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {data?.transaction_reference}
                </td>

                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {new Date(data?.created_at).toDateString()}
                </td>

                <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                  ₦ {numberWithCommas(+data?.amount || 0)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {transactionData?.data?.length == 0 && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl font-black">No Available data</div>
        </div>
      )}
    </div>
  );
}
