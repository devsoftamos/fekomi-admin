import React, { useState } from "react";
import MoneyFlow from "../components/dashboard/MoneyFlow";
import RecentJoin from "../components/dashboard/RecentJoin";
import Stats from "../components/dashboard/Stats";
import TopProducts from "../components/dashboard/TopProducts";
import Transaction from "../components/dashboard/Transaction";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div> Dashboard</div>
            <div className="flex items-start gap-6">
              <div className="w-2/3">
                <div>
                  <Stats />
                </div>
                <div className="py-4">
                  <RecentJoin />
                </div>
                <div className="py-4">
                  <Transaction />
                </div>
              </div>
              <div className="w-1/3">
                <div>
                  <MoneyFlow />
                </div>
                <div className="pt-6">
                  <TopProducts />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
