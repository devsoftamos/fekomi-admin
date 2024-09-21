import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateStorePointModal from "./modal/CreateStorePoint";

function StorePointSideBar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  const { id } = useParams();
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const navigate = useNavigate();

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  // const [sidebarExpanded, setSidebarExpanded] = useState(
  //   storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  // );
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [loading, setLoading] = useState();
  const [modalOpen, setModalOpen] = useState();
  const [selectIndex, setSelectIndex] = useState();
  const [storeList, setStoreList] = useState([]);
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
    getStorePoint();
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const getStorePoint = async () => {
    const token = localStorage.getItem("fekomi-token");
    if (!token) {
      navigate("/");
    }
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
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_OFFLINESTORE}/admin/stores`,
        {
          headers: headers,
        }
      );
      console.log({ stores: response?.data?.data });
      setStoreList(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };

  const SelectPoint = (index) => {
    setSelectIndex(index);
  };

  return (
    <div className="pt-[70px]">
      <CreateStorePointModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
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
        className={`bg-white border-r shadow top-0 h-screen md:w-64 w-3/4  px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          {/* <button
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
          </button> */}
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <div className="font-bold text-black px-4 border-b border-gray-300 py-2">
              All Store Points
            </div>
            <ul className="mt-3">
              {/* Dashboard */}
              {storeList?.map((data, i) => (
                <li
                  className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                    pathname.includes(data?.id) && "bg-lightblue"
                  }`}
                  //onClick={()=>SelectPoint(i)}
                >
                  <NavLink
                    end
                    to={`/store-point/${data?.id}`}
                    className={`block text-black hover:text-black truncate transition duration-150 ${
                      pathname.includes(data?.id) && "text-deepBlue"
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
                            pathname.includes(data?.id) ? "#2F93F6" : "#A4B4CB"
                          }
                        />
                      </svg>

                      <span
                        className={`${
                          pathname.includes(data?.id) ? "text-deepBlue" : ""
                        } "text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"`}
                      >
                        {data?.name}
                      </span>
                    </div>
                  </NavLink>
                </li>
              ))}
              <li
                onClick={() => setModalOpen("modal-open")}
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 cursor-pointer`}
              >
                <div className="text-deepBlue font-black">
                  <div className="flex items-center">
                    <img src="/add.svg" />

                    <span className="text-sm font-black ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Add New Store
                    </span>
                  </div>
                </div>
              </li>

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

export default StorePointSideBar;
