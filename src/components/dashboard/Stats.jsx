import React from "react";

export default function Stats() {
  return (
    <div>
      <div className="bg-white rounded-lg h-[160px]">
        <div className="font-semibold text-lg pl-28 py-6">Statistics</div>
        <div className="flex justify-evenly">
          <div>
            <div className="inline-flex">
              <div>
                <img src="/customer-icon.svg" />
              </div>
              <div className="font-medium pl-2">
                220k
                <div className="font-normal pt-1">Customers</div>
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex">
              <div>
                <img src="/revenue-icon.svg" />
              </div>
              <div className="font-medium pl-2">
                220k
                <div className="font-normal pt-1">Revenue</div>
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex">
              <div>
                <img src="/transaction-icon.svg" />
              </div>
              <div className="font-medium pl-2">
                220k
                <div className="font-normal">Transaction</div>
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex">
              <div>
                <img src="/customer-icon.svg" />
              </div>
              <div className="font-medium pl-2">
                220k
                <div className="font-normal">Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
