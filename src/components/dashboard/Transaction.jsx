import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

export default function Transaction() {
const [loading,setLoading] = useState()
const [latestData, setLatestData] =useState()


  const getTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WALLET_URL}/wallet/transactions/latest`,
        {
          headers: headers,
        }
      ); 
      console.log(response.data,"TUO")
      setLatestData(response.data?.data?.transactions)
      setLoading(false);
       
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  useEffect(()=>{
    getTransactions()
  },[])

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <div className="bg-white rounded-lg h-auto">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg pl-28 py-6">
            Recently Joined
          </div>
          <Link to="/transaction">
           <div className="pr-28">View All</div>
          </Link>
         
        </div>

      { latestData?.map((data,i)=>(
         <div>

        <div className="flex p-2 justify-evenly">
          {/* <div>
            <img src="/transaction.svg" />
          </div>
          <div>Fekomi Tablet</div> */}
          <div>{new Date(data?.created_at).toDateString()}</div>
          <div>{data?.user?.name}</div>
          <div>{data?.user?.phone_no}</div>
          <div className="pb-3">-{data?.debit}</div>
        </div>
        <div className=" text-center flex justify-center">
          <hr className="border border-gray-200 px-10 w-[85%]" />
        </div>
      </div>
      ))
     
      
      
        }
         
      </div>
    </div>
  );
}
