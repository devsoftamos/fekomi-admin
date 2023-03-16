import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { COLUMNS } from "../../column";
import Pagination from "../utils/Pagination";
import TableHeaders from "../utils/TableHeaders";
import TransactionModal from "./modal/TransactionModal";

export default function TransactionTable() {
  const d = new Date();
  let monthNumber = [d.getMonth()];
  let yearNumber = [d.getFullYear()];
  const [monthIndex, setMonthIndex] = useState(monthNumber);
  const [currentYear, setCurrentYear] = useState(yearNumber);
  const [modalOpen, setModalOpen] = useState();
  const [transactionData, setTransactionData] = useState();
  const [loading, setLoading] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [filterTriggered, setFilterTriggered] = useState(false);
  const [filterTransaction, setFilterTransaction] = useState();
  const [searchValue, setSearchValue] = useState();

  var currentDate = new Date(currentYear, monthIndex);
  var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  var lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const getTransaction = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WALLET_URL}/wallet/transactions/all?page=${pageNumber}&limit=${chooseData}`,
        {
          headers: headers,
        }
      );

      setTransactionData(response?.data?.data);
      setLoading(false);
      setFilterTransaction()
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  useEffect(() => {
    getTransaction();
  }, [chooseData, pageNumber]);

  const getTransactionSearch = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WALLET_URL}/wallet/transaction/search?search_key=${searchValue}`,
        {
          headers: headers,
        }
      );

      setFilterTransaction(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  const getFilterTransactionData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WALLET_URL}/wallet/transactions/date?start_date=${firstDay
          .toLocaleDateString()
          .replaceAll("/", "-")}&end_date=${lastDay
          .toLocaleDateString()
          .replaceAll("/", "-")}&limit=30`,
        {
          headers: headers,
        }
      );

      setFilterTransaction(response?.data?.data);
      setLoading(false);
        
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  const nextPage = () => {
    setpageNumber(pageNumber + 1);
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
    }
  };

  useEffect(() => {
    if (filterTriggered) {
      getFilterTransactionData();
    }
  }, [monthIndex]);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="pt-7">
      <TransactionModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <div className="py-3 px-4">
                  <TableHeaders
                    showFilter={true}
                    setMonthIndex={setMonthIndex}
                    setSearchValue={setSearchValue}
                    getProductsSearch={getTransactionSearch}
                    reset={getTransaction}
                    setFilterTriggered={setFilterTriggered}
                    rootElementId="pagetodownload"
                    downloadFileName="Fekomi-Transaction-Table"
                  />
                </div>
              </div>

              <table id="pagetodownload" class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Type
                    </th>
                   
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Date
                    </th>

                    
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Amount Paid (NGN)
                    </th>
                  </tr>
                </thead>
                <tbody>
                {!transactionData?.transactions  &&
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
                  {
                  filterTransaction?.transactions?filterTransaction?.transactions?.map((data,i)=>(
                    <tr
                    //onClick={() => setModalOpen("modal-open")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data?.user[0]?.name||data?.user?.name}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {data?.description}
                    </td>
                     <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {new Date(data?.created_at).toDateString()}
                    </td>

                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      {numberWithCommas(+data?.debit||0)}
                    </td>
                  </tr>
                  )):
                  transactionData?.transactions?.map((data, i) => (
                    <tr
                      //onClick={() => setModalOpen("modal-open")}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data?.user[0]?.name}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                       {data?.description}
                      </td>
                      
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {new Date(data?.created_at).toDateString()}
                      </td>
 
                      <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                        {numberWithCommas(+data?.debit||0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {transactionData?.length == 0 && (
                <div className="flex justify-center items-center h-screen">
                  <div className="text-xl font-black">No Available data</div>
                </div>
              )}
              {filterTransaction?.length == 0 && (
                <div className="flex justify-center items-center h-screen">
                  <div className="text-xl font-black">No Available data</div>
                </div>
              )}
              <div className="flex justify-end items-center pb-20 px-6">
                <Pagination
                  nextPage={nextPage}
                  prevPage={prevPage}
                  setChooseData={setChooseData}
                  chooseData={chooseData}
                  totalPage={transactionData?.total}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
