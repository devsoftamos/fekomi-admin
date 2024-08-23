import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import axios from "axios";
import TableHeaders from "../utils/TableHeaders";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../utils/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductTable({
  modalOpen,
  productData,
  setModalOpen,
  getAllOrderData,
}) {
  const [orderData, setOrderData] = useState();
  const [searchValue, setSearchValue] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [loading, setLoading] = useState();


  const getOrderData = async () => {
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/orders/all?page=${pageNumber}&limit=${chooseData}`,
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

  const updateStatus = (data, status) => {
    const token = localStorage.getItem("fekomi-token");
    setLoading("loading");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_ECOMMERCE}/order-item/${data?.id}/delivery-status`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {
        status: status,
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // window.location.reload();
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

  return (
    <div>
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
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen} `}>
        <div className="modal-box bg-[#FAFAFA] max-w-7xl  overflow-hidden">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Order Items</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>
          <div class="flex flex-col">
            <div class="sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white">
                  <table class="min-w-full ">
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
                          Status
                        </th>

                        <th
                          scope="col"
                          class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!productData?.orderitems &&
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
                      {productData?.orderitems?.map((data, i) => (
                        <tr
                          key={i}
                          //onClick={() => navigate("/userdetails")}
                          class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img
                              src={data?.product?.main_image}
                              className="h-10 w-10"
                            />
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.product?.name}
                          </td>

                          <td class="text-sm text-green-600 font-light px-6 py-4 whitespace-nowrap">
                            {data?.product?.status}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ₦ {data?.product?.price}
                          </td>
                          <td class="text-sm font-bold  px-4 py-4 whitespace-nowrap">
                            <Menu
                              as="div"
                              className="relative inline-block   text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                  Delivery Status
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 ml-2 -mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[9999] focus:outline-none">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          onClick={() =>
                                            updateStatus(data, "SHIPPED")
                                          }
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          SHIPPED
                                        </div>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          onClick={() =>
                                            updateStatus(data, "DELIVERED")
                                          }
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          DELIVERED
                                        </div>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          onClick={() =>
                                            updateStatus(
                                              data,
                                              "DELIVERY_FAILED"
                                            )
                                          }
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                          )}
                                        >
                                          DELIVERY FAILED
                                        </div>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                            {/* <div className="dropdown  ">
                              <button
                                tabIndex={0}
                                className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-2 rounded-lg"
                              >
                                Out for Delivery
                              </button>
                              <ul
                                tabIndex={0}
                                className="dropdown-content z-[9999] menu p-2 shadow bg-base-100 rounded-box w-52"
                              >
                                <li>
                                  <a>Item 1</a>
                                </li>
                                <li>
                                  <a>Item 2</a>
                                </li>
                              </ul>
                            </div> */}
                          </td>
                        </tr>
                      ))}
                      <tr className=" ">
                        <td className="pt-36"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
