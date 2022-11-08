import React from "react";

export default function RecentJoin() {
  return (
    <div>
      <div className="bg-white rounded-lg h-[160px]">
        <div className="font-semibold text-lg pl-28 py-6">Recently Joined</div>
        <div className="flex justify-evenly">
          <div>
            <div className="inline-flex">
              <div>
                <img src="/boy.svg" />
              </div>
              <div className="font-medium pl-2">
                Dakota Milk
                <div className="font-normal pt-1">20.02.22</div>
              </div>
            </div>
          </div>
          <div className="border-r border-gray-400"></div>
          <div>
            <div className="inline-flex">
              <div>
                <img src="/girl.svg" />
              </div>
              <div className="font-medium pl-2">
                Dakota Milk
                <div className="font-normal">20.02.22</div>
              </div>
            </div>
          </div>
          <div className="border-r border-gray-400"></div>
          <div>
            <div className="inline-flex">
              <div>
                <img src="/boy.svg" />
              </div>
              <div className="font-medium pl-2">
                Dakota Milk
                <div className="font-normal">20.02.22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
