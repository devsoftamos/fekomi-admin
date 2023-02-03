import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";

export default function DatingModal({ modalOpen, setModalOpen, datingData }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [singleData, setsingleData] = useState();
  const getSingleDating = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const covertedToken = JSON.parse(token);
    const tokenParsed = {
      firstName: covertedToken.firstname,
      lastName: covertedToken.lastname,
      userId: covertedToken.id,
      role: {
        admin: true,
        superAdmin: true,
      },
      permission: {
        dating: true,
      },
    };
    const headers = {
      "content-type": "application/json",
      Authorization: `${JSON.stringify(tokenParsed)}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATING}/admin/profiles/${datingData?._id}`,
        {
          headers: headers,
        }
      );
      //console.log(response?.data?.data);
      setsingleData(response?.data?.data);

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
    getSingleDating();
  }, [modalOpen]);
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">User Profile</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <div className="px-14 pt-5">
            <div className="bg-white shadow-md pt-7">
              <div className="flex px-5 py-4">
                <div>
                  <img
                    src={singleData?.photoUrl}
                    className="rounded-full h-28 w-28"
                  />
                </div>
                <div className="pl-5">
                  <div className="font-black pb-2 text-lg">
                    {singleData?.firstName} {singleData?.lastName}
                  </div>
                  <div className="pb-2">
                    Contact:{" "}
                    <span className="font-medium">
                      {singleData?.email || "john@gmail.com"} |{" "}
                      {singleData?.phone}
                    </span>
                  </div>
                  <div className="pb-2">
                    Location:{" "}
                    <span className="font-medium">{singleData?.city}</span>
                  </div>
                  <div className="pb-2">
                    Gender:{" "}
                    <span className="font-medium">{singleData?.gender}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {singleData?.interests?.length > 0 && (
            <div className="px-14 pt-5">
              <div className="bg-white shadow-md pt-7">
                <div className="font-bold text-lg px-6">Interest</div>
                {singleData?.interests?.map((data, i) => (
                  <div className="flex flex-wrap" key={i}>
                    <div className="px-6 py-5">
                      <button className="px-4 py-2 rounded-2xl border border-gray-400">
                        {data?.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
