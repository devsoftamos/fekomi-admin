import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import UsersTable from "../components/users/UsersTable";
import CreateUserModal from "../components/users/usermodals/CreateUserModal";
import CreateRoleModal from "../components/users/usermodals/CreateRoleModal";
import UsersTab from "../components/users/UsersTab";
import RoleTable from "../components/users/RoleTable";  
import axios from "axios";
import ProductCategory from "../components/stock/modal/ProductCategory";
import ProductTable from "../components/products/ProductTable";
import StoreModal from "../components/stock/modal/StockModal";
import CreateProduct from "../components/products/modal/CreateProduct";
 

export default function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [loading, setLoading] = useState();
  const [openRoleModal, setOpenRoleModal] = useState();
  const [productsData, setProductsData] = useState();
  const [active, setActiveTab] = useState(0);
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [filterTriggered, setFilterTriggered] = useState(false);
  const [filterProduct, setFilterProduct] = useState();
  const [modalCatOpen, setModalCatOpen] = useState();
  const [total, setTotal] = useState();
  const [reload, setReload] = useState(false);
  const [modalType, setModalType] = useState(false);
  const getAllProductsData = async () => {
    setLoading(true);
    setReload(true);
    const token = localStorage.getItem("fekomi-token");
    const covertedToken = JSON.parse(token);
    const tokenParsed = {
      firstName: covertedToken.firstname,
      lastName: covertedToken.lastname,
      userId: covertedToken.id,
      role: {
        admin: true,
        superAdmin: true,
      },
      permission: {
        dating: true,
      },
    };
    const headers = {
      "content-type": "application/json",
      Authorization: `${JSON.stringify(tokenParsed)}`,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_OFFLINESTORE}admin/products?page=${pageNumber}&limit=${chooseData}`,
        {
          headers: headers,
        }
      );
      setFilterTriggered(false);
      setFilterProduct();
      console.log(response?.data,"DATA");
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
  const nextPage = () => {
    setpageNumber(pageNumber + 1);
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
    }
  };
  useEffect(() => {
    getAllProductsData();
  }, [chooseData, pageNumber, reload]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <CreateProduct
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            getAllProductsData={getAllProductsData}
            modalType={modalType}
            setModalType={setModalType}
          />
          <ProductCategory
            modalCatOpen={modalCatOpen}
            setModalCatOpen={setModalCatOpen}
          />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg">Stock Inventory</div>
              <div>
                <div className="flex items-center">
                  <div className="pl-2">
                    <button
                      onClick={() => {
                        setModalOpen("modal-open");
                        setModalType(true);
                      }}
                      className="px-2 py-3 capitalize font-black text-[#2F93F6] border border-[#2F93F6] rounded"
                    >
                     Add Products
                    </button>
                  </div>
                  <div className="pl-2">
                    
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ProductTable
                productsData={productsData}
                nextPage={nextPage}
                prevPage={prevPage}
                getAllProductsData={getAllProductsData}
                filterTriggered={filterTriggered}
                setFilterProduct={setFilterProduct}
                filterProduct={filterProduct}
                setFilterTriggered={setFilterTriggered}
                setModalOpen={setModalOpen}
                chooseData={chooseData}
                setChooseData={setChooseData}
                reload={reload}
                setReload={setReload}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
