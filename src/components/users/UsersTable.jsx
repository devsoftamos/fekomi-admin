import axios from "axios";
import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import Pagination from "../utils/Pagination";
import TableHeaders from "../utils/TableHeaders";
import UsersTab from "./UsersTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UsersTable() {
  const [userData, setUserData] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [loading, setLoading] = useState();

  const getUserData = async () => {
    const token = localStorage.getItem("fekomiAuthToken");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_URL}/auth/list_all_admin?page=${pageNumber}&limit=${chooseData}`,
        {
          headers: headers,
        }
      );

      setUserData(response?.data?.data);
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

  const blockUser = async (member_id) => {
    setLoading("loading");

    const token = localStorage.getItem("fekomiAuthToken");

    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_ADMIN_URL}/auth/block-members/${member_id}`,
      method: "POST",
      headers: headers,
      data: {},
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
    getUserData();
  }, [pageNumber, chooseData]);
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
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="py-6 overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders showFilter={true} />
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
                      Email
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
                      Roles
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
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.map((data, i) => (
                    <tr
                      key={i}
                      //onClick={() => navigate("/userdetails")}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <img
                          src={data?.profile_image || "/avatar.png"}
                          className="rounded-full h-10 w-10"
                        />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {`${data?.firstname} ${data?.lastname}`}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.email}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.phone_no || "-"}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Super Admin{" "}
                        <span className="btn btn-sm text-[10px]">Change</span>
                      </td>

                      <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                        <div className="bg-[#EBFFF3] text-[#61BB84] text-center py-2 px-1 rounded-lg">
                          Edit
                        </div>
                      </td>
                      {/* <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        <div className="bg-[#FFEFDF] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg">
                          Disable
                        </div>
                      </td> */}
                      <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        <div
                          onClick={() => blockUser(data?.id)}
                          className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg"
                        >
                          Block
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="flex justify-end items-center pb-24 px-6">
                <Pagination
                  nextPage={nextPage}
                  prevPage={prevPage}
                  setChooseData={setChooseData}
                  chooseData={chooseData}
                  totalPage={userData?.total}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
