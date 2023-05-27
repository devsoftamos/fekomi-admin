import React, { useState,useEffect } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import UsersTab from "./UsersTab";
import axios from "axios";
export default function RoleTable() {
  const [rolesData,setRolesData] =useState()

  const getRolesData = async () => {
    const token = localStorage.getItem("fekomiAuthToken");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_URL}/auth/list_all_roles`,
        {
          headers: headers,
        }
      );
      setRolesData(response?.data?.data);
      console.log(response?.data, "POPO");
    } catch (error) {
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  useEffect(() => {
    getRolesData()
  }, []);
  return (
    <div className="pt-7">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders showFilter={false} />
              </div>

              <table class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
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
                  </tr>
                </thead>
                <tbody>
                  <tr
                    //onClick={() => navigate("/userdetails")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Super Admin
                    </td>

                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#EBFFF3] text-[#61BB84] text-center py-2 px-1 rounded-lg">
                        Edit
                      </div>
                    </td>

                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                        Delete
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap"></td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap"></td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap"></td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
