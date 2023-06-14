import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import UsersTable from "../components/users/UsersTable";
import CreateUserModal from "../components/users/usermodals/CreateUserModal";
import CreateRoleModal from "../components/users/usermodals/CreateRoleModal";
import UsersTab from "../components/users/UsersTab";
import RoleTable from "../components/users/RoleTable";
import StockTable from "../components/stock/StockTable";
import StoreModal from "../components/stock/modal/StockModal";
import TransactionTable from "../components/transaction/TransactionTable";

export default function Transaction() {
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
          <StoreModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-black text-lg">Transactions</div>
            </div>

            <div>
              <TransactionTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
