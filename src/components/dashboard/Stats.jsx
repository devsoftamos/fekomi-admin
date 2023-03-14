import axios from "axios";
import React,{useState,useEffect} from "react";

export default function Stats() {
  const [loading,setLoading] = useState()
  const [productStat,setProductStat] = useState()
  const [revenueStats,setRevenueStats] = useState()
  const [transactionStats,setTransactionStats] = useState()
  const [totalCustomer,setTotalCustomer] = useState()
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
  const getCustomerStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomiAuthToken");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN}auth/total-members`,
        {
          headers: headers,
        }
      );
 console.log(response.data,"Total");
  setTotalCustomer(response?.data?.data)
      setLoading(false);
       
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const getRevenueStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WALLET_URL}/wallet/revenue/total?currency=NGN`,
        {
          headers: headers,
        }
      );
  
 setRevenueStats(response.data.data.total_revenue)
      setLoading(false);
       
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const getTransactionsStats = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WALLET_URL}/wallet/transactions/total`,
        {
          headers: headers,
        }
      ); 
 setTransactionStats(response.data.data?.total_number_of_transaction)
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
    getRevenueStats()
    getTransactionsStats()
    getCustomerStats()
     
  }, [])
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const numberReplace = (data)=>{
    
if(data.length >=4){
  
return data.split(",")[0]+"K"
}else{
  return data
}
  }
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
               {numberReplace(numberWithCommas(totalCustomer||0)) }
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
                {numberReplace(numberWithCommas(revenueStats||0).split(".")[0])}
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
                {numberReplace(numberWithCommas(transactionStats||0))}
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
                {productStat?.total_products}
                <div className="font-normal">Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
