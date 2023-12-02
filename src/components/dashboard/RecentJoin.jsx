import axios from "axios";
import React,{useState,useEffect} from "react";

export default function RecentJoin() {
  const [joinData, setJoinData] = useState()
const [loading,setLoading] = useState()


  const getRecentJoin = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomiAuthToken");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN}/auth/list-recently-joined?limit=3`,
        {
          headers: headers,
        }
      );
      setJoinData(response?.data?.data)
 console.log(response.data,"Total");
  
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
    getRecentJoin()

  },[])
  return (
    <div>
      <div className="bg-white rounded-lg h-[160px]">
        <div className="font-semibold text-lg pl-28 py-6">Recently Joined</div>
         <div  className="flex justify-evenly">
        {joinData?.map((data,i)=>(
         <>
           <div>
            <div className="inline-flex">
              <div>
                <img src="/avatar.png"  className="h-8 w-8 rounded-full"/>
              </div>
              <div className="font-medium pl-2">
                {data?.name}
                <div className="font-normal pt-1"> {new Date(data?.created_at).toLocaleDateString().replaceAll("/",".")}</div>
              </div>
            </div>
          </div>
         <div className="border-r border-gray-400"></div>
         </>
        
      
         
        
       
        ))}  
        </div>
      </div>
    </div>
  );
}
