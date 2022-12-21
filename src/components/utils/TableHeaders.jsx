import React, { useState } from "react";

export default function TableHeaders(props) {
  const [chooseData, setChooseData] = useState();
  const [showDropDown, setShowDropDown] = useState(true);
  const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(null, i + 1, null).toLocaleDateString("en", {
      month: "long",
    });
  });
  const handleChange = (e) => {
    props.setSearchValue(e.target.value);
  };
  return (
    <div className="flex justify-between">
      <div className="">
        <div class="relative text-gray-600 focus-within:text-gray-400 flex items-center">
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
            onChange={handleChange}
          />
          <div className="pl-4">
            <button
              onClick={props.getProductsSearch}
              className="bg-deepBlue text-white px-3 py-2 rounded-md"
            >
              Search
            </button>
          </div>
          <div className="pl-4">
            <button
              onClick={() => {
                props.setFilterTriggered(false);
                props.reset();
              }}
              className="bg-deepBlue text-white px-3 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {props.showFilter && (
        <div>
          <div className="flex  items-center">
            <div className="border flex items-center py-2 border-gray-300 px-3 rounded-2xl">
              Download
              <div className="pl-1">
                <img src="/outline.svg" />
              </div>
            </div>

            <div className="pl-7">Filter</div>
            <div className="pl-7">
              <div className="dropdown dropdown-left dropdown-bottom">
                <label
                  tabIndex={0}
                  onClick={() => setShowDropDown(true)}
                  className="border py-2 border-gray-300 px-3 rounded-2xl"
                >
                  <div className="inline-flex items-center">
                    {chooseData || "Month"}
                    <span className="pl-1">
                      <img src="/down.svg" />
                    </span>
                  </div>
                </label>
                {showDropDown && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu z-50 p-2 shadow bg-base-100 rounded-box w-60"
                  >
                    {months?.map((data, i) => (
                      <li
                        onClick={() => {
                          props.setMonthIndex(i);
                          setChooseData(data);
                          setShowDropDown(false);
                          props.setFilterTriggered(true);
                        }}
                      >
                        <a>{data}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
