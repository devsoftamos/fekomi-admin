import React from "react";

export default function TableHeaders() {
  return (
    <div className="flex justify-between">
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
      <div>
        <div className="flex items-center">
          <div className="border flex items-center py-2 border-gray-300 px-3 rounded-2xl">
            Download
            <div className="pl-1">
              <img src="/outline.svg" />
            </div>
          </div>

          <div className="pl-2">Filter</div>
          <div className="pl-2">
            <div className="dropdown dropdown-left dropdown-bottom">
              <label
                tabIndex={0}
                className="border py-2 border-gray-300 px-3 rounded-2xl"
              >
                Month
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
