import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import UsersTable from "../components/users/UsersTable";
import CreateUserModal from "../components/users/usermodals/CreateUserModal";
import CreateRoleModal from "../components/users/usermodals/CreateRoleModal";
import UsersTab from "../components/users/UsersTab";
import RoleTable from "../components/users/RoleTable";
import StockTable from "../components/stock/StockTable";
import StoreModal from "../components/stock/modal/StockModal";
import axios from "axios";

export default function Stock() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [loading, setLoading] = useState();
  const [openRoleModal, setOpenRoleModal] = useState();
  const [productsData, setProductsData] = useState();
  const [active, setActiveTab] = useState(0);
  const getProductsData = async () => {
    console.log(process.env.REACT_APP_DATING);
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/products/all`,
        {
          headers: headers,
        }
      );
      console.log(response?.data?.data);
      setProductsData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <StoreModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

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
              <StockTable productsData={productsData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
