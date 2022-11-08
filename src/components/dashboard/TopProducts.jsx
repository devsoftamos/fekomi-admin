import React from "react";

export default function TopProducts() {
  return (
    <div>
      <div className="bg-white rounded-lg h-auto px-2">
        <div className="font-semibold text-lg  pt-3">
          Top 3 Products Purchased
        </div>
        <div className="font-light text-sm">
          Top selling products in the market
        </div>
        <div className="pt-5 pb-3">
          <div>
            <div className="flex justify-between pt-3">
              <div className="font-medium">Fekomi Herbal Tea</div>
              <div className="text-[#FFB200] pr-3">65,376</div>
            </div>
            <div>
              <progress
                className="progress progress-warning w-full"
                value="10"
                max="100"
              ></progress>
            </div>
          </div>
          <div>
            <div className="flex justify-between pt-3">
              <div className="font-medium">Fekomi Herbal Tea</div>
              <div className="text-[#FFB200] pr-3">65,376</div>
            </div>
            <div>
              <progress
                className="progress progress-primary w-full"
                value="10"
                max="100"
              ></progress>
            </div>
          </div>
          <div>
            <div className="flex justify-between pt-3">
              <div className="font-medium">Fekomi Herbal Tea</div>
              <div className="text-[#FFB200] pr-3">65,376</div>
            </div>
            <div>
              <progress
                className="progress progress-accent w-full"
                value="10"
                max="100"
              ></progress>
            </div>
          </div>
          <div>
            <div className="flex justify-between pt-3">
              <div className="font-medium">Fekomi Herbal Tea</div>
              <div className="text-[#FFB200] pr-3">65,376</div>
            </div>
            <div>
              <progress
                className="progress progress-accent w-full"
                value="10"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
