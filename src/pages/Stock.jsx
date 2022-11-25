import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import UsersTable from "../components/users/UsersTable";
import CreateUserModal from "../components/users/usermodals/CreateUserModal";
import CreateRoleModal from "../components/users/usermodals/CreateRoleModal";
import UsersTab from "../components/users/UsersTab";
import RoleTable from "../components/users/RoleTable";
import StockTable from "../components/stock/StockTable";

export default function Stock() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [openRoleModal, setOpenRoleModal] = useState();
  const [active, setActiveTab] = useState(0);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <CreateUserModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <CreateRoleModal
            modalOpen={openRoleModal}
            setModalOpen={setOpenRoleModal}
          />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg">Stock Inventory</div>
              <div>
                <div className="flex">
                  <div className="pl-2">
                    <label
                      onClick={() => setModalOpen("modal-open")}
                      //htmlFor="my-modal-3"
                      className="bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer"
                    >
                      New Stock
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <StockTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
