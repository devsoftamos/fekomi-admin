import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import ConsultationTable from "../components/consultation/ConsultationTable";
import Consultation from "../components/consultation/modal/Consultation";
import MySchedule from "../components/consultation/modal/MySchedule";

export default function Econsultation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [openSchedule, setOpenSchedule] = useState();
  const [images, setImages] = useState([]);
  const handleProduct = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Consultation modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <MySchedule
        openSchedule={openSchedule}
        setOpenSchedule={setOpenSchedule}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg">Appointments</div>
              <div>
                <div className="flex items-center">
                  <div className="pl-2">
                    <button
                      onClick={() => {
                        setOpenSchedule("modal-open");
                      }}
                      className="px-2 py-3 capitalize font-black text-[#2F93F6] border border-[#2F93F6] rounded"
                    >
                      My Schedules
                    </button>
                  </div>
                  <div className="pl-2">
                    <div className="">
                      <label
                        onClick={() => setModalOpen("modal-open")}
                        className="bg-[#2F93F6] px-8 text-[#fff] rounded-lg py-4 cursor-pointer"
                      >
                        Create Schedule
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <ConsultationTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
