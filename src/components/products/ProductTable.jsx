import axios from "axios";
import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "../utils/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink, CSVDownload } from "react-csv";
import StoreModal from "../stock/modal/StockModal";
export default function ProductTable({
  productsData,
  nextPage,
  prevPage,
  getAllProductsData,
  filterTriggered,
  setFilterTriggered,
  filterProduct,
  setFilterProduct,
  setChooseData,
  chooseData,
  reload,
  setReload,
}) {
  const d = new Date();
  let monthNumber = [d.getMonth()];
  let yearNumber = [d.getFullYear()];
  const [monthIndex, setMonthIndex] = useState(monthNumber);
  const [currentYear, setCurrentYear] = useState(yearNumber);
  const [modalOpen, setModalOpen] = useState();
  const [loading, setLoading] = useState();
  const [pageNumber, setpageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [editData, setEditData] = useState();
  const [modalType, setModalType] = useState(false);
  const [deleteData, setDeleteData] = useState();
  var currentDate = new Date(currentYear, monthIndex);
  var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  var lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getFilterProductsData = async () => {
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
  const deleteProduct = (data) => {
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const covertedToken = JSON.parse(token);
    const tokenParsed = {
      firstName: covertedToken.firstname,
      lastName: covertedToken.lastname,
      userId: covertedToken.id,
      role: {
        admin: true,
        superAdmin: true,
      },
      permission: {
        dating: true,
      },
    };
    const headers = {
      "content-type": "application/json",
      Authorization: `${JSON.stringify(tokenParsed)}`,
    };
    const options = {
      url: `${process.env.REACT_APP_OFFLINESTORE}/admin/products/${data?.id}`,
      method: "DELETE",
      headers: headers,
      data: {},
    };

    axios(options)
      .then((response) => {
        setLoading("");

        setReload(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getAllProductsData();
      })
      .catch((error) => {
        setLoading("");
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  useEffect(() => {
    if (filterTriggered) {
      getFilterProductsData();
    }
  }, [monthIndex]);

  useEffect(() => {
    console.log({ productsData });
  }, [productsData]);

  return (
    <div className="pt-7">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <StoreModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        edit={true}
        editData={editData}
        reload={reload}
        setReload={setReload}
        modalType={modalType}
        setModalType={setModalType}
        getAllProductsData={getAllProductsData}
      />
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders
                  showFilter={false}
                  setMonthIndex={setMonthIndex}
                  setSearchValue={setSearchValue}
                  getProductsSearch={getProductsSearch}
                  reset={getAllProductsData}
                  setFilterTriggered={setFilterTriggered}
                  rootElementId="pagetodownload"
                  downloadFileName="Fekomi-Product-Table"
                />
              </div>

              <table class="min-w-full " id="pagetodownload">
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
                      Date/Time
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
                  {!productsData &&
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
                            {data?.productcategory[0]?.name}
                          </td>

                          {/* <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                            <div
                              onClick={() => {
                                setEditData(data);
                                setModalOpen("modal-open");
                              }}
                              className="bg-[#cecfe0] font-bold  text-black text-center py-2 px-1 rounded-lg"
                            >
                              Edit
                            </div>
                          </td> */}
                          <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                            <div
                              onClick={() => deleteProduct(data)}
                              className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg"
                            >
                              Delete
                            </div>
                          </td>
                        </tr>
                      ))
                    : productsData?.records?.map((data, i) => (
                        <tr
                          key={i}
                          //onClick={() => navigate("/userdetails")}
                          class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img
                              className="rounded-full h-14 w-14"
                              src={data?.imageUrl}
                            />
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.category?.name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {new Date(data?.createdAt).toLocaleDateString()},{" "}
                            {new Date(data?.createdAt).toLocaleTimeString()}
                          </td>

                          {/* <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                          <div
                            onClick={() => {
                              setEditData(data);
                              setModalOpen("modal-open");
                            }}
                            className="bg-[#cecfe0] font-bold  text-black text-center py-2 px-1 rounded-lg"
                          >
                            Edit
                          </div>
                        </td> */}
                          <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                            <div
                              onClick={() => deleteProduct(data)}
                              className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg"
                            >
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
              {productsData?.records?.length == 0 && (
                <div className="flex justify-center items-center h-screen">
                  <div className="text-xl font-black">No Available data</div>
                </div>
              )}
              <div className="flex justify-end items-center pb-20 px-6">
                <Pagination
                  nextPage={nextPage}
                  prevPage={prevPage}
                  pageNumber={pageNumber}
                  setChooseData={setChooseData}
                  chooseData={chooseData}
                  totalPage={productsData?._metadata?.totalCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
