import React, { useState } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";

export default function ConsultationTable() {
  return (
    <div className="pt-7">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders showFilter={true} />
              </div>

              <table class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
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
                      Date of Appointment
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Time of Appointment
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Type of Appointment
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
                  <tr
                    //onClick={() => navigate("/userdetails")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Adeoni Muili Yewande
                      <div className="text-xs">ade@gmail.com</div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      16th July, 2022
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      8:30AM - 9:00AM
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Online
                    </td>

                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#EBFFF3] text-[#61BB84] text-center py-2 px-1 rounded-lg">
                        Confirm
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#FFEFDF] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg">
                        Reschedule
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                        Cancel
                      </div>
                    </td>
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
