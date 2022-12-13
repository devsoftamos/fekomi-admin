import axios from "axios";
import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function StockTable({ productsData }) {
  const d = new Date();
  let monthNumber = [d.getMonth()];
  let yearNumber = [d.getFullYear()];
  const [monthIndex, setMonthIndex] = useState(monthNumber);
  const [currentYear, setCurrentYear] = useState(yearNumber);
  const [filterProduct, setFilterProduct] = useState();
  const [loading, setLoading] = useState();
  const [searchValue, setSearchValue] = useState();

  var currentDate = new Date(currentYear, monthIndex);
  var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  var lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  console.log(
    firstDay.toLocaleDateString().replaceAll("/", "-"),
    lastDay,
    "POP"
  );
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const getProductsData = async () => {
    console.log(process.env.REACT_APP_DATING);
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/products?start_date=${firstDay
          .toLocaleDateString()
          .replaceAll("/", "-")}&end_date=${lastDay
          .toLocaleDateString()
          .replaceAll("/", "-")}&limit=30`,
        {
          headers: headers,
        }
      );

      setFilterProduct(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  const getProductsSearch = async () => {
    console.log(process.env.REACT_APP_DATING);
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/products/search?search_key=${searchValue}`,
        {
          headers: headers,
        }
      );

      setFilterProduct(response?.data?.data);
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
    getProductsData();
  }, [monthIndex]);
  return (
    <div className="pt-7">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders
                  showFilter={true}
                  setMonthIndex={setMonthIndex}
                  setSearchValue={setSearchValue}
                  getProductsSearch={getProductsSearch}
                  reset={getProductsData}
                />
              </div>

              <table class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      No Available
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Number Sold
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      SKU Number
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Price (NGN)
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {!productsData?.products?.data &&
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
                  {filterProduct
                    ? filterProduct?.products?.map((data, i) => (
                        <tr
                          key={i}
                          //onClick={() => navigate("/userdetails")}
                          class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img
                              className="rounded-full h-14 w-14"
                              src={data?.main_image}
                            />
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.category}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.quantity}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            3
                          </td>

                          <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                            FEK122445
                          </td>
                          <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                            {numberWithCommas(data?.price || 0)}
                          </td>
                          <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                            <div className="bg-[#cecfe0] font-bold  text-black text-center py-2 px-1 rounded-lg">
                              Edit
                            </div>
                          </td>
                          <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                            <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                              Delete
                            </div>
                          </td>
                        </tr>
                      ))
                    : productsData?.products?.data?.map((data, i) => (
                        <tr
                          //onClick={() => navigate("/userdetails")}
                          class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img
                              className="rounded-full h-14 w-14"
                              src={data?.main_image}
                            />
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.category}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.quantity}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            3
                          </td>

                          <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                            FEK122445
                          </td>
                          <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                            {numberWithCommas(data?.price || 0)}
                          </td>
                          <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                            <div className="bg-[#cecfe0] font-bold  text-black text-center py-2 px-1 rounded-lg">
                              Edit
                            </div>
                          </td>
                          <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                            <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                              Delete
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {filterProduct?.products?.length == 0 && (
                <div className="flex justify-center items-center h-screen">
                  <div className="text-xl font-black">No Available data</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
