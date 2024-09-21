import React, { useState } from "react";
import "./css/pagination.css";
export default function Pagination(props) {
  const [showDropDown, setShowDropDown] = useState(true);

  const numbers = [10, 20, 30];

  const lowerLimit = props.chooseData * props.pageNumber - 9;
  const upperLimit = props.chooseData * props.pageNumber;

  return (
    <div>
      <div className="flex items-center gap-5">
        <div>Rows per page:</div>
        <div class="p-1 ">
          <div class="dropdown  inline-block relative">
            <button class="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">{props.chooseData || "10"}</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </button>
            <ul class="dropdown-menu w-full absolute z-50 hidden text-gray-700 pt-1">
              {numbers?.map((data, i) => (
                <li
                  key={i}
                  onClick={() => props.setChooseData(data)}
                  class="z-50"
                >
                  <a
                    class="rounded-t bg-gray-100 hover:bg-gray-400 py-1 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    {data}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {props.totalPage && (
          <>
            <div className="pl-2 text-gray-600">
              {` ${lowerLimit}  - ${
                props.totalPage > upperLimit ? upperLimit : props.totalPage
              } 0f ${props.totalPage}`}
            </div>
            <div
              onClick={props.prevPage}
              className="text-lg font-semibold cursor-pointer"
            >
              <img src="/left.svg" className="h-3 w-3" />
            </div>
            <div
              onClick={props.nextPage}
              className="text-lg font-semibold cursor-pointer"
            >
              <img src="/right.svg" className="h-3 w-3" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
