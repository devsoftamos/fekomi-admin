import React, { useState } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import TransactionModal from "./modal/TransactionModal";

export default function TransactionTable() {
  const [modalOpen, setModalOpen] = useState();
  return (
    <div className="pt-7">
      <TransactionModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
                      Customer
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Products
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Channel
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
                    onClick={() => setModalOpen("modal-open")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Adeoni Muili Yewande
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Product Purchase
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Herbal Tea
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      26th Aug, 2022
                    </td>

                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      Credit Card
                    </td>
                    <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                      10000
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
