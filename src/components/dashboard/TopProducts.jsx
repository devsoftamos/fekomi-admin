import axios from "axios";
import React,{useState,useEffect} from "react";




export default function TopProducts() {
  const [loading,setLoading] = useState()
  const [productStat,setProductStat] = useState()
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
 setProductStat(response.data.data?.data)
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
    getProductStats()
     
  }, [])
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
        { productStat?.top_selling_products?.map((data,i)=>(
          <div key={i}>
            <div className="flex justify-between pt-3">
              <div className="font-medium">{data?.name}</div>
              <div className="text-[#FFB200] pr-3">{data?.number_sold}</div>
            </div>
            <div>
              <progress
                className="progress progress-warning w-full"
                value={+data?.number_sold/100 * +productStat?.total_products}
                max="100"
              ></progress>
            </div>
          </div>
        ))
 }

          
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
    </div>
  );
}
