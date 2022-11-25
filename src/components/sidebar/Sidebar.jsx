import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  // const [sidebarExpanded, setSidebarExpanded] = useState(
  //   storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  // );
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white border-r-2 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src="fekomi-logo.svg" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("dashboard") && "bg-lightblue"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("dashboard") && "text-deepBlue"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5938 4.64273L8.20629 0.796357C7.80409 0.436615 7.28341 0.237732 6.74379 0.237732C6.20418 0.237732 5.6835 0.436615 5.28129 0.796357L0.893795 4.64273C0.661527 4.85046 0.476178 5.10529 0.35009 5.39025C0.224002 5.67521 0.160068 5.98376 0.162545 6.29536V12.6865C0.162545 13.2683 0.393672 13.8263 0.805079 14.2377C1.21649 14.6491 1.77448 14.8802 2.35629 14.8802H11.1313C11.7131 14.8802 12.2711 14.6491 12.6825 14.2377C13.0939 13.8263 13.325 13.2683 13.325 12.6865V6.28804C13.3265 5.97767 13.262 5.67053 13.136 5.38691C13.0099 5.10329 12.8251 4.84964 12.5938 4.64273ZM8.20629 13.4177H5.28129V9.76148C5.28129 9.56754 5.35834 9.38155 5.49547 9.24441C5.63261 9.10727 5.8186 9.03023 6.01254 9.03023H7.47504C7.66898 9.03023 7.85498 9.10727 7.99212 9.24441C8.12925 9.38155 8.20629 9.56754 8.20629 9.76148V13.4177ZM11.8625 12.6865C11.8625 12.8804 11.7855 13.0664 11.6484 13.2036C11.5112 13.3407 11.3252 13.4177 11.1313 13.4177H9.66879V9.76148C9.66879 9.17966 9.43767 8.62167 9.02626 8.21027C8.61485 7.79886 8.05686 7.56773 7.47504 7.56773H6.01254C5.43073 7.56773 4.87274 7.79886 4.46133 8.21027C4.04992 8.62167 3.81879 9.17966 3.81879 9.76148V13.4177H2.35629C2.16236 13.4177 1.97636 13.3407 1.83922 13.2036C1.70209 13.0664 1.62504 12.8804 1.62504 12.6865V6.28804C1.62518 6.18422 1.64742 6.08161 1.69028 5.98705C1.73315 5.89248 1.79567 5.80813 1.87367 5.73961L6.26117 1.90054C6.39461 1.78331 6.56617 1.71866 6.74379 1.71866C6.92142 1.71866 7.09297 1.78331 7.22642 1.90054L11.6139 5.73961C11.6919 5.80813 11.7544 5.89248 11.7973 5.98705C11.8402 6.08161 11.8624 6.18422 11.8625 6.28804V12.6865Z"
                        fill={
                          pathname.includes("dashboard") ? "#2F93F6" : "#A4B4CB"
                        }
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Analytics */}
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("customers") && "bg-lightblue"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "text-deepBlue"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("customers") ? "#0177FD" : "#A4B4CB"
                        }
                        d="M6.57071 8.14387C6.42608 8.14387 6.2847 8.18676 6.16445 8.26711C6.04419 8.34746 5.95047 8.46167 5.89512 8.59529C5.83978 8.7289 5.82529 8.87593 5.85351 9.01778C5.88172 9.15963 5.95137 9.28993 6.05364 9.39219C6.1559 9.49446 6.2862 9.56411 6.42805 9.59232C6.5699 9.62054 6.71693 9.60606 6.85055 9.55071C6.98416 9.49536 7.09837 9.40164 7.17872 9.28138C7.25907 9.16113 7.30196 9.01975 7.30196 8.87512C7.30196 8.68118 7.22492 8.49519 7.08778 8.35805C6.95064 8.22091 6.76465 8.14387 6.57071 8.14387V8.14387ZM9.49571 8.14387C9.35108 8.14387 9.2097 8.18676 9.08945 8.26711C8.96919 8.34746 8.87547 8.46167 8.82012 8.59529C8.76478 8.7289 8.75029 8.87593 8.77851 9.01778C8.80673 9.15963 8.87637 9.28993 8.97864 9.39219C9.0809 9.49446 9.2112 9.56411 9.35305 9.59232C9.4949 9.62054 9.64193 9.60606 9.77555 9.55071C9.90917 9.49536 10.0234 9.40164 10.1037 9.28138C10.1841 9.16113 10.227 9.01975 10.227 8.87512C10.227 8.68118 10.1499 8.49519 10.0128 8.35805C9.87564 8.22091 9.68965 8.14387 9.49571 8.14387ZM12.4207 8.14387C12.2761 8.14387 12.1347 8.18676 12.0144 8.26711C11.8942 8.34746 11.8005 8.46167 11.7451 8.59529C11.6898 8.7289 11.6753 8.87593 11.7035 9.01778C11.7317 9.15963 11.8014 9.28993 11.9036 9.39219C12.0059 9.49446 12.1362 9.56411 12.278 9.59232C12.4199 9.62054 12.5669 9.60606 12.7005 9.55071C12.8342 9.49536 12.9484 9.40164 13.0287 9.28138C13.1091 9.16113 13.152 9.01975 13.152 8.87512C13.152 8.68118 13.0749 8.49519 12.9378 8.35805C12.8006 8.22091 12.6146 8.14387 12.4207 8.14387ZM9.49571 1.56262C8.53542 1.56262 7.58453 1.75177 6.69734 2.11925C5.81014 2.48674 5.00402 3.02538 4.32499 3.7044C2.95363 5.07576 2.18321 6.93573 2.18321 8.87512C2.17682 10.5637 2.76148 12.2012 3.83583 13.5039L2.37333 14.9664C2.27187 15.0693 2.20313 15.1998 2.1758 15.3417C2.14847 15.4836 2.16377 15.6303 2.21977 15.7635C2.28051 15.8951 2.37897 16.0056 2.50265 16.0811C2.62634 16.1567 2.76967 16.1937 2.91446 16.1876H9.49571C11.4351 16.1876 13.2951 15.4172 14.6664 14.0458C16.0378 12.6745 16.8082 10.8145 16.8082 8.87512C16.8082 6.93573 16.0378 5.07576 14.6664 3.7044C13.2951 2.33304 11.4351 1.56262 9.49571 1.56262V1.56262ZM9.49571 14.7251H4.67677L5.35683 14.0451C5.42593 13.9773 5.4809 13.8966 5.51855 13.8075C5.55621 13.7183 5.57581 13.6226 5.57621 13.5259C5.57346 13.333 5.49461 13.149 5.35683 13.014C4.39932 12.0576 3.80306 10.7987 3.66961 9.45193C3.53617 8.10515 3.87382 6.75377 4.62502 5.62802C5.37622 4.50228 6.49451 3.67181 7.78935 3.27811C9.08419 2.88442 10.4755 2.95185 11.7262 3.46893C12.9769 3.986 14.0096 4.92072 14.6484 6.11384C15.2872 7.30696 15.4926 8.68466 15.2295 10.0122C14.9665 11.3398 14.2513 12.5351 13.2057 13.3944C12.1602 14.2538 10.8491 14.7241 9.49571 14.7251V14.7251Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Customers
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("users-roles") && "bg-lightblue"
                }`}
              >
                <NavLink
                  end
                  to="/users-roles"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("users-roles") && "text-deepBlue"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("users-roles")
                            ? "#0177FD"
                            : "#A4B4CB"
                        }
                        d="M3.81885 7.3374H6.0126C6.20654 7.3374 6.39253 7.26036 6.52967 7.12322C6.66681 6.98609 6.74385 6.80009 6.74385 6.60615C6.74385 6.41221 6.66681 6.22622 6.52967 6.08908C6.39253 5.95194 6.20654 5.8749 6.0126 5.8749H3.81885C3.62491 5.8749 3.43891 5.95194 3.30178 6.08908C3.16464 6.22622 3.0876 6.41221 3.0876 6.60615C3.0876 6.80009 3.16464 6.98609 3.30178 7.12322C3.43891 7.26036 3.62491 7.3374 3.81885 7.3374ZM12.5938 0.0249023H2.35635C1.77453 0.0249023 1.21654 0.256029 0.805132 0.667437C0.393724 1.07884 0.162598 1.63683 0.162598 2.21865V8.7999C0.162598 9.38172 0.393724 9.93971 0.805132 10.3511C1.21654 10.7625 1.77453 10.9937 2.35635 10.9937H12.5938C13.1757 10.9937 13.7337 10.7625 14.1451 10.3511C14.5565 9.93971 14.7876 9.38172 14.7876 8.7999V2.21865C14.7876 1.63683 14.5565 1.07884 14.1451 0.667437C13.7337 0.256029 13.1757 0.0249023 12.5938 0.0249023ZM13.3251 8.7999C13.3251 8.99384 13.2481 9.17984 13.1109 9.31697C12.9738 9.45411 12.7878 9.53115 12.5938 9.53115H2.35635C2.16241 9.53115 1.97641 9.45411 1.83928 9.31697C1.70214 9.17984 1.6251 8.99384 1.6251 8.7999V4.4124H13.3251V8.7999ZM13.3251 2.9499H1.6251V2.21865C1.6251 2.02471 1.70214 1.83872 1.83928 1.70158C1.97641 1.56444 2.16241 1.4874 2.35635 1.4874H12.5938C12.7878 1.4874 12.9738 1.56444 13.1109 1.70158C13.2481 1.83872 13.3251 2.02471 13.3251 2.21865V2.9499Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Users & Roles
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("stock") && "bg-lightblue"
                }`}
              >
                <NavLink
                  end
                  to="/stock"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("stock") && "text-deepBlue"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("stock") ? "#0177FD" : "#A4B4CB"
                        }
                        d="M12.5938 7.875H7.4751V2.75625C7.4751 2.3175 7.1826 2.025 6.74385 2.025C3.0876 2.025 0.162598 4.95 0.162598 8.60625C0.162598 12.2625 3.0876 15.1875 6.74385 15.1875C10.4001 15.1875 13.3251 12.2625 13.3251 8.60625C13.3251 8.1675 13.0326 7.875 12.5938 7.875ZM7.4751 13.6519C4.69635 14.0906 2.06385 12.1163 1.69822 9.3375C1.25947 6.55875 3.23385 3.92625 6.0126 3.56062V8.60625C6.0126 9.045 6.3051 9.3375 6.74385 9.3375H11.7895C11.497 11.6044 9.74197 13.3594 7.4751 13.6519ZM9.66885 0.5625C9.2301 0.5625 8.9376 0.855 8.9376 1.29375V5.68125C8.9376 6.12 9.2301 6.4125 9.66885 6.4125H14.0563C14.4951 6.4125 14.7876 6.12 14.7876 5.68125C14.7876 2.82937 12.5207 0.5625 9.66885 0.5625ZM10.4001 4.95V2.09812C11.8626 2.39062 12.9595 3.4875 13.252 4.95H10.4001Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Stock Inventory
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* E-Commerce */}

              {/* <li
                className={`px-3 py-4 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("all-transaction") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-black ${
                          pathname.includes("customers") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-black  ${
                          pathname.includes("customers") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      All Transaction
                    </span>
                  </div>
                </NavLink>
              </li> */}

              {/* <li
                className={`px-3 py-4 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("customers") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-black ${
                          pathname.includes("customers") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-black  ${
                          pathname.includes("customers") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      All Transaction
                    </span>
                  </div>
                </NavLink>
              </li> */}

              {/* <li
                className={`px-3 py-4 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("customers") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-black ${
                          pathname.includes("customers") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-black  ${
                          pathname.includes("customers") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      All Transaction
                    </span>
                  </div>
                </NavLink>
              </li> */}
              {/*           
              <SidebarLinkGroup activecondition={pathname.includes("agent")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("agent") && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("agent") &&
                                  "text-indigo-500"
                                }`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("agent") &&
                                  "text-indigo-300"
                                }`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Agent
                            </span>
                          </div>

                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/create-agent"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Create Agent
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/all-agents"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                All agents
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* Messages */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("messages") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("messages") && "text-indigo-500"
                        }`}
                        d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("messages") && "text-indigo-300"
                        }`}
                        d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Messages
                    </span>
                  </div>
                </NavLink>
              </li> */}
              {/* Tasks */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("tasks") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("tasks") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("tasks") && "text-indigo-500"
                        }`}
                        d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                      />
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("tasks") && "text-indigo-500"
                        }`}
                        d="M1 1h22v23H1z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("tasks") && "text-indigo-300"
                        }`}
                        d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Tasks
                    </span>
                  </div>
                </NavLink>
              </li> */}
              {/* Inbox */}

              {/* Calendar */}

              {/* Settings */}

              {/* Utility */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
