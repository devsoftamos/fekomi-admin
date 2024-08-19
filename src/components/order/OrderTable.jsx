import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import axios from "axios";
import TableHeaders from "../utils/TableHeaders";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../utils/Pagination";
import ProductTable from "./ProductTable";
import PrintModal from "./modal/PrintModal";
export default function OrderTable() {
  const [orderData, setOrderData] = useState();
  const [searchValue, setSearchValue] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [productData, setProductData] = useState();
  const [modalOpen, setModalOpen] = useState();
  const [printModalOpen, setPrintModalOpen] = useState();
  const getOrderData = async () => {
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/fetch-all-orders?page=${pageNumber}&limit=${chooseData}`,
        {
          headers: headers,
        }
      );

      setOrderData(response?.data?.data?.data);
      console.log(response?.data?.data?.data, "POPO");
    } catch (error) {
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
    getOrderData();
  }, [pageNumber, chooseData]);

  const getOrderProduct = (data, print) => {
    setProductData(data);
    if (!print) {
      setModalOpen("modal-open");
    } else {
    }
  };
  return (
    <div>
      <ProductTable
        modalOpen={modalOpen}
        productData={productData}
        setModalOpen={setModalOpen}
        getAllOrderData={getOrderData}
      />
      <PrintModal
        modalOpen={printModalOpen}
        setModalOpen={setPrintModalOpen}
        printData={productData}
        order={true}
      />
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <TableHeaders />
              <table class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Email Address
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Delivery Address
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Delivery Cost
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Transaction Reference
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Total Amount
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Date of Transaction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!orderData?.products &&
                    [...new Array(4)].map((d, i) => (
                      <tr
                        key={i}
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
                        <td className="text-sm text-[#0AC293] capitalize font-bold px-6 py-4 whitespace-nowrap">
                          <Skeleton height={15} />
                        </td>
                        <td className="text-sm text-[#0AC293] capitalize font-bold px-6 py-4 whitespace-nowrap">
                          <Skeleton height={15} />
                        </td>
                      </tr>
                    ))}
                  {orderData?.products?.map((data, i) => (
                    <tr
                      key={i}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td
                        onClick={() => getOrderProduct(data, false)}
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        {data?.customer_name}
                      </td>
                      <td
                        onClick={() => getOrderProduct(data, false)}
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        {data?.customer_email}
                      </td>

                      <td
                        onClick={() => getOrderProduct(data, false)}
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        {data?.delivery_address}
                      </td>
                      <td
                        onClick={() => getOrderProduct(data, false)}
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        ₦ {data?.delivery_cost}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.transaction?.transaction_reference}
                      </td>
                      <td
                        onClick={() => getOrderProduct(data, false)}
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        ₦ {data?.total_cost}
                      </td>
                      <td
                        onClick={() => getOrderProduct(data, false)}
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        {new Date(data?.created_at).toDateString()}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div
                          onClick={() => {
                            getOrderProduct(data, true);
                            setPrintModalOpen("modal-open");
                          }}
                          className="bg-[#cecfe0] cursor-pointer font-bold  text-black text-center py-2 px-1 rounded-lg"
                        >
                          Print Receipt
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end items-center pb-24 px-6">
                <Pagination
                  nextPage={nextPage}
                  prevPage={prevPage}
                  setChooseData={setChooseData}
                  chooseData={chooseData}
                  totalPage={orderData?.total}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
