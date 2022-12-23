import React from "react";
import { Link } from "react-router-dom";

export default function NewsDraft() {
  return (
    <div>
      <div className="flex flex-wrap items-center">
        <Link to="/newsdraft">
          <div className="pt-2">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <div className="card-body">
                <p>Why herbal tea is good for you</p>
                <div className="text-sm text-gray-400">
                  Created: Aug 26, 2022
                </div>
                {/* <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div> */}
              </div>
              <div className="w-full flex justify-center pt-5 h-16 bg-[#FFEFDF]">
                <div className="text-[#E4750D]">Unpublished</div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/newsdraft">
          <div className="pl-2 pt-2">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <div className="card-body">
                <p>Why herbal tea is good for you</p>
                <div className="text-sm text-gray-400">
                  Created: Aug 26, 2022
                </div>
                {/* <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div> */}
              </div>
              <div className="w-full flex justify-center pt-5 h-16 bg-[#EBFFF3]">
                <div className="text-[#61BB84]">Unpublished</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
