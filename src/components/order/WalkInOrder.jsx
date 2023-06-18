import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import axios from "axios";
import TableHeaders from "../utils/TableHeaders";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../utils/Pagination";
import ProductTable from "./ProductTable";
import PrintModal from "./modal/PrintModal";
export default function WalkInOrder() {
  const [orderData, setOrderData] = useState();
  const [searchValue, setSearchValue] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [productData, setProductData] = useState();
  const [modalOpen, setModalOpen] = useState();
  const getOrderData = async () => {
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_OFFLINESTORE}admin/orders?page=${pageNumber}&limit=${chooseData}`,
        {
          headers: headers,
        }
      );
      setOrderData(response?.data?.data);
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

  const getOrderProduct = (data) => {
    setProductData(data);
    //setModalOpen("modal-open");
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <PrintModal
        modalOpen={modalOpen}
        printData={productData}
        setModalOpen={setModalOpen}
        order={false}
         
      />
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              {/* <TableHeaders /> */}
              <table class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
                  <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Product Name
                    </th>
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
                      Phone Number
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
                      Total Amount
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Mode Of Payment
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
                  {!orderData?.records &&
                    [...new Array(4)].map((d) => (
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
                        <td className="text-sm text-[#0AC293] capitalize font-bold px-6 py-4 whitespace-nowrap">
                          <Skeleton height={15} />
                        </td>
                        <td className="text-sm text-[#0AC293] capitalize font-bold px-6 py-4 whitespace-nowrap">
                          <Skeleton height={15} />
                        </td>
                      </tr>
                    ))}
                  {orderData?.records?.map((data, i) => (
                    <tr
                      key={i}
                      // onClick={() => getOrderProduct(data)}
                      class="bg-white border-gray-300 border-b  transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.ecommerceProduct?.name}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.customerName}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.customerPhone}
                      </td>

                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.customerAddress}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        N{numberWithCommas(data?.totalPrice || 0)}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.quantity}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.modeOfPayment}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {new Date(data?.createdAt).toDateString()}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div
                          onClick={() => {
                            getOrderProduct(data)
                            setModalOpen("modal-open");
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
                  totalPage={orderData?._metadata?.total}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
