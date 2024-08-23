import React, { useState } from "react";
//import SearchModal from "./header/SearchModal";

// import Help from "./header/Help";
// import UserMenu from "./header/UserMenu";
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";
import WalkOrder from "../walkorder/WalkOrder";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [modalCatOpen, setModalCatOpen] = useState();

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <WalkOrder
        modalCatOpen={modalCatOpen}
        setModalCatOpen={setModalCatOpen}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <div className="">
              <div class="relative text-gray-600 focus-within:text-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    class="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-6 h-6"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="q"
                  class="py-3 text-sm px-44 bg-gray-200 rounded-md pl-10 outline-none focus:text-gray-900"
                  placeholder="Search..."
                  autocomplete="off"
                />
              </div>
            </div>
          </div>

          {/* Header: Right side */}

          <div className="flex items-center">
            {/* <button
              className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${
                searchModalOpen && "bg-slate-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSearchModalOpen(true);
              }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-slate-500"
                  d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                />
                <path
                  className="fill-current text-slate-400"
                  d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                />
              </svg>
            </button> */}
            {/* 
           
            <Help /> */}
            <div onClick={() => setModalCatOpen("modal-open")}>
              <button className="rounded-3xl bg-[#020B32] text-sm px-3 py-2 text-white ">
                Place a Walk-In Order
              </button>
            </div>

            <Link to="/orders">
              <div className="pl-5">
                <button className="rounded-3xl bg-deepBlue text-sm px-3 py-2 text-white ">
                  My Orders
                </button>
              </div>
            </Link>

            {/* <Notifications /> */}
            {/*  Divider */}
            {/* <hr className="w-px h-6 bg-slate-200 mx-3" /> */}
            {/* <UserMenu /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
