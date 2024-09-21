import axios from "axios";
import React, { useState, useEffect } from "react";

export default function TopProducts() {
  const [loading, setLoading] = useState();
  const [productStat, setProductStat] = useState();
  const getProductStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/products/statistics`,
        {
          headers: headers,
        }
      );
      console.log(response.data.data?.data);
      setProductStat(response.data.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  useEffect(() => {
    getProductStats();
  }, []);
  return (
    <div className="p-5 grid gap-4 bg-white rounded-lg h-auto shadow-md">
      <div className="">
        <h2 className="font-semibold text-lg">Top 3 Products Purchased</h2>
        <span className="font-light text-sm">
          Top selling products in the market
        </span>
      </div>
      <div className="">
        {productStat?.top_selling_products?.map((data, i) => (
          <div key={i}>
            <div className="flex justify-between">
              <div className="font-medium">{data?.name}</div>
              <div className="text-[#FFB200]">{data?.number_sold}</div>
            </div>
            <div>
              <progress
                className="progress progress-warning w-full"
                value={
                  (+data?.number_sold / 100) * +productStat?.total_products
                }
                max="100"
              ></progress>
            </div>
          </div>
        ))}

        {/* <div>
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
          </div> */}
      </div>
    </div>
  );
}
