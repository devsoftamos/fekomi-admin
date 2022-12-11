import React, { useState } from "react";
import { COLUMNS } from "../../column";
import DatingModal from "./modal/DatingModal";
export default function DatingTable({ datingData }) {
  const [modalOpen, setModalOpen] = useState();
  const [onClickData, setOnClickData] = useState();
  return (
    <div>
      <DatingModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        datingData={onClickData}
      />
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
                  {datingData?.records?.map((data, i) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
