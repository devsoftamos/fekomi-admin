import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import DatingModal from "./modal/DatingModal";
import Skeleton from "react-loading-skeleton";
import Pagination from "../utils/Pagination";
import TableHeaders from "../utils/TableHeaders";
import axios from "axios";
export default function DatingTable({
  datingData,
  chooseData,
  setChooseData,
  nextPage,
  prevPage,
  getDatingList,
  filterDating,
  setFilterDating,
  filterTriggered,
  setFilterTriggered,
}) {
  const [modalOpen, setModalOpen] = useState();
  const [onClickData, setOnClickData] = useState();
  const [searchValue, setSearchValue] = useState();
  const [loading, setLoading] = useState();

  const getDatingSearch = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATING}/admin/profiles/search/users?page=1&limit=5&searchValue=${searchValue}`,
        {
          headers: headers,
        }
      );

      setFilterDating(response?.data?.data);
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
    getDatingList();
  }, []);

  return (
    <div>
      <DatingModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        datingData={onClickData}
      />
      <div class="flex flex-col bg-white shadow-lg">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders
                  showFilter={false}
                  // setMonthIndex={setMonthIndex}
                  setSearchValue={setSearchValue}
                  getProductsSearch={getDatingSearch}
                  reset={getDatingList}
                  setFilterTriggered={setFilterTriggered}
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
                      Email Address
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
                      Date of Birth
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
                  {!datingData?.records &&
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
                  {filterDating?.records
                    ? filterDating?.records?.map((data, i) => (
                        <tr
                          //onClick={() => navigate("/userdetails")}
                          class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img
                              src={data?.photoUrl}
                              className="rounded-full h-12 w-12"
                            />
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.firstName} {data?.lastName}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.email}
                          </td>
                          <td class="text-sm text-green-600 font-light px-6 py-4 whitespace-nowrap">
                            {data?.phone}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {new Date(data?.dateOfBirth).toDateString()}
                          </td>
                          <td class="text-sm font-bold  px-4 py-4 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setModalOpen("modal-open");
                                setOnClickData(data);
                              }}
                              className="bg-gray-200 font-bold  text-gray-600 text-center py-2 px-2 rounded-lg"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    : datingData?.records?.map((data, i) => (
                        <tr
                          //onClick={() => navigate("/userdetails")}
                          class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img
                              src={data?.photoUrl}
                              className="rounded-full h-12 w-12"
                            />
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.firstName} {data?.lastName}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.email}
                          </td>
                          <td class="text-sm text-green-600 font-light px-6 py-4 whitespace-nowrap">
                            {data?.phone}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {new Date(data?.dateOfBirth).toDateString()}
                          </td>
                          <td class="text-sm font-bold  px-4 py-4 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setModalOpen("modal-open");
                                setOnClickData(data);
                              }}
                              className="bg-gray-200 font-bold  text-gray-600 text-center py-2 px-2 rounded-lg"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <div className="flex justify-end pt-2 pb-24 px-7">
                <div>
                  <Pagination
                    chooseData={chooseData}
                    setChooseData={setChooseData}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    totalPage={datingData?._metadata?.totalCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
