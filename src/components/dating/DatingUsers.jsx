import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DatingUsers() {
  const [activeUsers, setActiveUsers] = useState();
  const [inactiveUsers, setInActiveUsers] = useState();
  const [loading, setLoading] = useState();
  const getDatingActiveUsers = async () => {
    console.log(process.env.REACT_APP_DATING);
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATING}/admin/profiles/groups/topUsers?type=active&limit=3`,
        {
          headers: headers,
        }
      );
      console.log(response?.data?.data);
      setActiveUsers(response?.data?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const getDatinginActiveUsers = async () => {
    console.log(process.env.REACT_APP_DATING);
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATING}/admin/profiles/groups/topUsers?type=inactive&limit=3`,
        {
          headers: headers,
        }
      );
      console.log(response?.data?.data);
      setInActiveUsers(response?.data?.data);

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
    getDatingActiveUsers();
    getDatinginActiveUsers();
  }, []);
  return (
    <div>
      <div className="bg-white  rounded-md px-14">
        <div className="py-3 font-bold">Top Active Users</div>
        {activeUsers?.map((data, i) => (
          <div
            key={i}
            className="flex items-center border-b border-b-gray-200 py-2 -px-3 "
          >
            <img src={data?.photoUrl} className="rounded-full h-12 w-12" />
            <div className="pl-2 px-2">
              <div className="font-medium">
                {data?.firstName} {data?.lastName}
              </div>
              <div className="text-gray-500">
                {new Date(data?.lastConnected)
                  .toLocaleDateString()
                  .replaceAll("/", ".")}
              </div>
            </div>
          </div>
        ))}
        <div className="py-3 font-bold">Top Inactive Users</div>
        {inactiveUsers?.map((data, i) => (
          <div
            key={i}
            className="flex items-center border-b border-b-gray-200 py-2 -px-3 "
          >
            <img src={data?.photoUrl} className="rounded-full h-12 w-12" />
            <div className="pl-2 px-2">
              <div className="font-medium">
                {data?.firstName} {data?.lastName}
              </div>
              <div className="text-gray-500">
                {new Date(data?.lastConnected)
                  .toLocaleDateString()
                  .replaceAll("/", ".")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
