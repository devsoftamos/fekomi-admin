import React from "react";
import { COLUMNS } from "../../column";
export default function RevenueTable() {
  const bag2 = "/card-wallet.svg";
  return (
    <div>
      <div className="">
        <div className="flex  gap-4">
          <div
            className="bg-no-repeat pb-4 h-[220px] w-[415px] bg-cover"
            style={{ backgroundImage: `url(${bag2})` }}
          >
            <div>
              <div className="flex justify-end  px-2 py-6 text-right">
                <select className="py-4 text-white outline-none bg-transparent px-2 w-[95px] border border-white rounded-3xl">
                  <option disabled selected>
                    NGN
                  </option>
                  <option className="bg-gray-500">USD</option>
                  <option className="bg-gray-500">JPY</option>
                </select>
              </div>
              <div className="px-4">
                <div className="text-white">Total Revenue</div>
                <div className="py-2 text-white font-black text-lg">
                  200,000,000
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5  ">
            <div className="bg-white py-10 flex justify-evenly rounded-3xl h-[220px]">
              <div>
                <div className="inline-flex">
                  <div>
                    <img src="/customer-icon.svg" />
                  </div>
                  <div className="font-medium pl-2">
                    220k
                    <div className="font-normal pt-1">
                      Successful Transactions
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex">
                  <div>
                    <img src="/revenue-icon.svg" />
                  </div>
                  <div className="font-medium pl-2">
                    220k
                    <div className="font-normal pt-1">Pending Transactions</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-flex">
                  <div>
                    <img src="/transaction-icon.svg" />
                  </div>
                  <div className="font-medium pl-2">
                    220k
                    <div className="font-normal">Monthly Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    >
                      Customer
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
                      Date Paid
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
                      Amount Paid (NGN)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    //onClick={() => navigate("/userdetails")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Adeoni Muili Yewande
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      softamos@gmail.com
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Oct 28, 2022
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        <div className="bg-[#EBFFF3] font-bold  text-[#61BB84] text-center py-2 px-1 rounded-lg">
                          success
                        </div>
                      </td>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      10,000
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
