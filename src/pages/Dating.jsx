import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import CustomerTable from "../components/customers/CustomerTable";
import OrderTable from "../components/order/OrderTable";
import DatingTable from "../components/dating/DatingTable";
import axios from "axios";
import InterestModal from "../components/dating/modal/InterestModal";
import DatingUsers from "../components/dating/DatingUsers";

export default function Dating() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState();
  const [datingData, setDatingData] = useState();
  const [modalOpen, setModalOpen] = useState();
  const getDatingList = async () => {
    console.log(process.env.REACT_APP_DATING);
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATING}/admin/profiles`,
        {
          headers: headers,
        }
      );
      console.log(response?.data?.data);
      setDatingData(response?.data?.data);

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
    getDatingList();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <InterestModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-4/5">
                <div className="flex justify-between">
                  <div className="font-black text-lg"> Dating Management</div>
                  <div>
                    <button
                      onClick={() => setModalOpen("modal-open")}
                      className="border border-[#2F93F6] rounded-xl px-3 py-3 text-[#2F93F6] font-bold"
                    >
                      All Interests
                    </button>
                  </div>
                </div>

                <div>
                  <DatingTable datingData={datingData} />
                </div>
              </div>
              <div>
                <DatingUsers />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
