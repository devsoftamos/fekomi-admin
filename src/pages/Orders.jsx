import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import CustomerTable from "../components/customers/CustomerTable";
import OrderTable from "../components/order/OrderTable";
import OrderTab from "../components/order/OrderTab"; 
import WalkInOrder from "../components/order/WalkInOrder";
export default function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActiveTab] = useState(0);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="font-black text-lg pb-8"> Orders</div>
            <OrderTab active={active} setActiveTab={setActiveTab} />
            {active == 0 && (
              <div className="pt-8">
                <OrderTable />
              </div>
            )}
            {active==1&&<div><WalkInOrder/></div>}
          </div>
        </main>
      </div>
    </div>
  );
}
