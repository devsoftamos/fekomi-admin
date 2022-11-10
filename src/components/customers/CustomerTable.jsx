import React from "react";

export default function CustomerTable() {
  return (
    <div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
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
                      Date Of Birth
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Gender
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
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img src="/boy.svg" />
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Otto@gmail.com
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      7/7/2021
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      7/7/2022
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Male
                    </td>
                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 text-center py-2 px-1 rounded-lg">
                        Edit
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#f3e3d5] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg">
                        Reject
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                        Block
                      </div>
                    </td>
                  </tr>
                  <tr
                    //onClick={() => navigate("/userdetails")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img src="/boy.svg" />
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Otto@gmail.com
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      7/7/2021
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      7/7/2022
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Male
                    </td>
                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 text-center py-2 px-1 rounded-lg">
                        Edit
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#f3e3d5] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg">
                        Reject
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                        Block
                      </div>
                    </td>
                  </tr>
                  <tr
                    //onClick={() => navigate("/userdetails")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img src="/boy.svg" />
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Otto@gmail.com
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      7/7/2021
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      7/7/2022
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Male
                    </td>
                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 text-center py-2 px-1 rounded-lg">
                        Edit
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#f3e3d5] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg">
                        Reject
                      </div>
                    </td>
                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                        Block
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
