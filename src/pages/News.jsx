import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import CustomerTable from "../components/customers/CustomerTable";
import OrderTable from "../components/order/OrderTable";
import NewsDraft from "../components/news/NewsDraft";
import CreateNews from "../components/news/modal/CreateNews";

export default function News() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  return (
    <div className="flex h-screen overflow-hidden">
      <CreateNews modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg"> News Draft</div>
              <div onClick={() => setModalOpen("modal-open")}>
                <button className="bg-[#2F93F6] px-8 text-[#fff] rounded-lg py-4 cursor-pointer">
                  Create
                </button>
              </div>
            </div>

            <div>
              <NewsDraft />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
